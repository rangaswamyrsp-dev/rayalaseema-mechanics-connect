create extension if not exists pgcrypto with schema extensions;
create type public.app_role as enum ('super_admin','district_admin','mandal_admin','member','welfare_officer','finance_officer');
create type public.membership_app_status as enum ('draft','submitted','under_review','more_info_required','approved','rejected','suspended','inactive');
create type public.welfare_app_status as enum ('draft','submitted','under_review','additional_info_required','approved','rejected','disbursement_pending','disbursed','closed');
create type public.payment_status as enum ('created','pending','success','failed','refunded','cancelled');

create table public.districts (id uuid primary key default gen_random_uuid(), name text not null unique, code text unique, created_at timestamptz not null default now());
create table public.mandals (id uuid primary key default gen_random_uuid(), district_id uuid not null references public.districts(id) on delete cascade, name text not null, created_at timestamptz not null default now(), unique(district_id, name));
create index on public.mandals(district_id);
create table public.villages (id uuid primary key default gen_random_uuid(), mandal_id uuid not null references public.mandals(id) on delete cascade, name text not null, created_at timestamptz not null default now(), unique(mandal_id, name));
create index on public.villages(mandal_id);

create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text, email text, phone text, avatar_url text, preferred_language text not null default 'en', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.roles (role public.app_role primary key, label text not null, description text);
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, role public.app_role not null, created_at timestamptz not null default now(), unique(user_id, role));
create index on public.user_roles(user_id);
create table public.admin_assignments (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, role public.app_role not null, district_id uuid references public.districts(id) on delete cascade, mandal_id uuid references public.mandals(id) on delete cascade, created_at timestamptz not null default now(),
  check ((role = 'district_admin' and district_id is not null) or (role = 'mandal_admin' and mandal_id is not null)));
create index on public.admin_assignments(user_id);

create table public.membership_plans (id uuid primary key default gen_random_uuid(), name text not null, description text, amount_paise integer not null check (amount_paise >= 0), duration_months integer not null default 12, is_active boolean not null default true, created_at timestamptz not null default now());
create table public.members (id uuid primary key default gen_random_uuid(), user_id uuid unique references public.profiles(id) on delete set null, membership_number text unique, full_name text not null, email text, mobile text, district_id uuid references public.districts(id), mandal_id uuid references public.mandals(id), village_id uuid references public.villages(id), status public.membership_app_status not null default 'draft', photo_path text, workshop_name text, specialization text, experience_years int, approved_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create index on public.members(district_id); create index on public.members(mandal_id);
create table public.membership_applications (id uuid primary key default gen_random_uuid(), reference_no text not null unique, user_id uuid references public.profiles(id) on delete set null, member_id uuid references public.members(id) on delete set null, plan_id uuid references public.membership_plans(id),
  full_name text not null, email text, mobile text not null, address text, district_id uuid references public.districts(id), mandal_id uuid references public.mandals(id), village_id uuid references public.villages(id),
  workshop_name text, workshop_address text, experience_years int check (experience_years between 0 and 80), specialization text, emergency_contact_name text, emergency_contact_phone text, nominee_name text, nominee_phone text,
  photo_path text, document_path text, status public.membership_app_status not null default 'submitted', review_notes text, reviewed_by uuid references public.profiles(id), reviewed_at timestamptz, consent boolean not null default false check (consent),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create index on public.membership_applications(status); create index on public.membership_applications(district_id); create index on public.membership_applications(user_id);
create unique index membership_applications_one_open_per_mobile on public.membership_applications(mobile) where status not in ('rejected','inactive');
create table public.membership_cards (id uuid primary key default gen_random_uuid(), member_id uuid not null references public.members(id) on delete cascade, qr_token text not null unique, issued_at timestamptz not null default now(), revoked boolean not null default false, revoked_at timestamptz, created_at timestamptz not null default now());
create index on public.membership_cards(member_id);

create table public.payment_transactions (id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete set null, member_id uuid references public.members(id), plan_id uuid references public.membership_plans(id), purpose text not null default 'membership', amount_paise integer not null check (amount_paise >= 0), currency text not null default 'INR', gateway text not null default 'razorpay', mode text not null default 'online', gateway_order_id text unique, gateway_payment_id text unique, status public.payment_status not null default 'created', verified_by uuid references public.profiles(id), notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create index on public.payment_transactions(user_id); create index on public.payment_transactions(status);
create table public.payment_receipts (id uuid primary key default gen_random_uuid(), transaction_id uuid not null unique references public.payment_transactions(id) on delete cascade, receipt_no text not null unique, created_at timestamptz not null default now());
create table public.refunds (id uuid primary key default gen_random_uuid(), transaction_id uuid not null references public.payment_transactions(id) on delete cascade, amount_paise integer not null check (amount_paise >= 0), reason text, status public.payment_status not null default 'pending', processed_by uuid references public.profiles(id), created_at timestamptz not null default now());

create table public.welfare_schemes (id uuid primary key default gen_random_uuid(), name text not null, description text, eligibility text, max_amount_paise integer, is_active boolean not null default true, created_at timestamptz not null default now());
create table public.welfare_applications (id uuid primary key default gen_random_uuid(), reference_no text not null unique default ('WF-' || upper(substr(md5(random()::text),1,8))), member_id uuid not null references public.members(id) on delete cascade, scheme_id uuid not null references public.welfare_schemes(id), requested_amount_paise integer, reason text, status public.welfare_app_status not null default 'submitted', assigned_officer uuid references public.profiles(id), decision_notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create index on public.welfare_applications(member_id); create index on public.welfare_applications(assigned_officer);
create table public.welfare_documents (id uuid primary key default gen_random_uuid(), application_id uuid not null references public.welfare_applications(id) on delete cascade, file_path text not null, doc_type text, uploaded_at timestamptz not null default now());
create table public.welfare_disbursements (id uuid primary key default gen_random_uuid(), application_id uuid not null references public.welfare_applications(id) on delete cascade, amount_paise integer not null, disbursed_by uuid references public.profiles(id), disbursed_at timestamptz, utr_reference text, created_at timestamptz not null default now());

create table public.emergency_requests (id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete set null, member_id uuid references public.members(id) on delete set null, district_id uuid references public.districts(id), requester_name text not null, requester_mobile text not null, location text, consent_location boolean not null default false, description text, status text not null default 'open', assigned_coordinator uuid references public.profiles(id), created_at timestamptz not null default now());
create table public.blood_donors (id uuid primary key default gen_random_uuid(), member_id uuid unique references public.members(id) on delete cascade, blood_group text not null, district_id uuid references public.districts(id), mandal_id uuid references public.mandals(id), approx_location text, contact_preference text default 'via_association', available boolean not null default true, consent boolean not null default false, created_at timestamptz not null default now());
create index on public.blood_donors(blood_group, district_id);
create table public.workshops (id uuid primary key default gen_random_uuid(), owner_member_id uuid references public.members(id) on delete set null, shop_name text not null, mechanic_name text, district_id uuid references public.districts(id), mandal_id uuid references public.mandals(id), village_id uuid references public.villages(id), address text, services text, working_hours text, contact_phone text, listing_consent boolean not null default false, status text not null default 'pending', approved_by uuid references public.profiles(id), created_at timestamptz not null default now());
create index on public.workshops(district_id, status);

create table public.notices (id uuid primary key default gen_random_uuid(), title text not null, body text, category text not null default 'general', district_id uuid references public.districts(id), published boolean not null default false, published_at timestamptz, expires_at timestamptz, created_by uuid references public.profiles(id), created_at timestamptz not null default now());
create table public.events (id uuid primary key default gen_random_uuid(), title text not null, description text, location text, district_id uuid references public.districts(id), starts_at timestamptz, ends_at timestamptz, photo_path text, published boolean not null default false, created_by uuid references public.profiles(id), created_at timestamptz not null default now());
create table public.event_registrations (id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id) on delete cascade, member_id uuid not null references public.members(id) on delete cascade, attended boolean not null default false, created_at timestamptz not null default now(), unique(event_id, member_id));
create table public.training_courses (id uuid primary key default gen_random_uuid(), title text not null, description text, duration_text text, published boolean not null default true, created_at timestamptz not null default now());
create table public.training_enrollments (id uuid primary key default gen_random_uuid(), course_id uuid not null references public.training_courses(id) on delete cascade, member_id uuid not null references public.members(id) on delete cascade, status text not null default 'enrolled', score int, certificate_no text unique, created_at timestamptz not null default now(), unique(course_id, member_id));
create table public.partners (id uuid primary key default gen_random_uuid(), name text not null, category text, description text, logo_path text, created_at timestamptz not null default now());
create table public.offers (id uuid primary key default gen_random_uuid(), partner_id uuid references public.partners(id) on delete cascade, title text not null, description text, eligibility text, contact text, redemption text, valid_from date, valid_until date, verified boolean not null default false, created_at timestamptz not null default now());

create table public.notifications (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, title text not null, body text, read boolean not null default false, created_at timestamptz not null default now());
create index on public.notifications(user_id, read);
create table public.notification_preferences (user_id uuid primary key references public.profiles(id) on delete cascade, email_enabled boolean not null default true, sms_enabled boolean not null default false, whatsapp_enabled boolean not null default false, updated_at timestamptz not null default now());
create table public.audit_logs (id uuid primary key default gen_random_uuid(), actor_id uuid, action text not null, entity_type text not null, entity_id uuid, metadata jsonb, created_at timestamptz not null default now());
create index on public.audit_logs(created_at desc);
create table public.association_settings (id uuid primary key default gen_random_uuid(), name text not null, full_name text, tagline text, contact_email text, contact_phone text, address text, logo_url text, updated_at timestamptz not null default now());

create function public.has_role(_user_id uuid, _role public.app_role) returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;
create function public.is_super_admin(_uid uuid) returns boolean language sql stable security definer set search_path = public as
$$ select public.has_role(_uid, 'super_admin') $$;
create function public.is_staff(_uid uuid) returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.user_roles where user_id = _uid and role <> 'member') $$;
create function public.can_manage_district(_uid uuid, _district uuid) returns boolean language sql stable security definer set search_path = public as
$$ select public.is_super_admin(_uid) or exists (select 1 from public.admin_assignments where user_id = _uid and role = 'district_admin' and district_id = _district) $$;
create function public.can_manage_area(_uid uuid, _district uuid, _mandal uuid) returns boolean language sql stable security definer set search_path = public as
$$ select public.can_manage_district(_uid, _district) or (_mandal is not null and exists (select 1 from public.admin_assignments where user_id = _uid and role = 'mandal_admin' and mandal_id = _mandal)) $$;
create function public.my_member_id() returns uuid language sql stable security definer set search_path = public as
$$ select id from public.members where user_id = auth.uid() $$;

create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), new.email) on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'member') on conflict do nothing;
  insert into public.notification_preferences (user_id) values (new.id) on conflict do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

grant usage on schema public to anon, authenticated;
grant select on public.districts, public.mandals, public.villages, public.membership_plans, public.welfare_schemes, public.notices, public.events, public.training_courses, public.partners, public.offers, public.workshops, public.association_settings, public.roles to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

do $$ declare t text; begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

create policy "public read" on public.districts for select using (true);
create policy "public read" on public.mandals for select using (true);
create policy "public read" on public.villages for select using (true);
create policy "public read" on public.roles for select using (true);
create policy "public read" on public.association_settings for select using (true);
create policy "public read active" on public.membership_plans for select using (is_active or public.is_staff(auth.uid()));
create policy "public read active" on public.welfare_schemes for select using (is_active or public.is_staff(auth.uid()));
create policy "public read" on public.training_courses for select using (published or public.is_staff(auth.uid()));
create policy "public read" on public.partners for select using (true);
create policy "public read published" on public.notices for select using ((published and (expires_at is null or expires_at > now())) or public.is_staff(auth.uid()));
create policy "public read published" on public.events for select using (published or public.is_staff(auth.uid()));
create policy "public read verified" on public.offers for select using ((verified and (valid_until is null or valid_until >= current_date) and (valid_from is null or valid_from <= current_date)) or public.is_super_admin(auth.uid()));
create policy "public read approved" on public.workshops for select using ((status = 'approved' and listing_consent) or owner_member_id = public.my_member_id() or public.can_manage_area(auth.uid(), district_id, mandal_id));

create policy "super admin write" on public.districts for all to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));
create policy "admin write" on public.mandals for all to authenticated using (public.can_manage_district(auth.uid(), district_id)) with check (public.can_manage_district(auth.uid(), district_id));
create policy "super admin write" on public.villages for all to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));
create policy "super admin write" on public.association_settings for all to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));
create policy "finance write" on public.membership_plans for all to authenticated using (public.is_super_admin(auth.uid()) or public.has_role(auth.uid(),'finance_officer')) with check (public.is_super_admin(auth.uid()) or public.has_role(auth.uid(),'finance_officer'));
create policy "super admin write" on public.welfare_schemes for all to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));
create policy "admin write" on public.notices for all to authenticated using (public.is_super_admin(auth.uid()) or (district_id is not null and public.can_manage_district(auth.uid(), district_id))) with check (public.is_super_admin(auth.uid()) or (district_id is not null and public.can_manage_district(auth.uid(), district_id)));
create policy "admin write" on public.events for all to authenticated using (public.is_super_admin(auth.uid()) or (district_id is not null and public.can_manage_district(auth.uid(), district_id))) with check (public.is_super_admin(auth.uid()) or (district_id is not null and public.can_manage_district(auth.uid(), district_id)));
create policy "super admin write" on public.training_courses for all to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));
create policy "super admin write" on public.partners for all to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));
create policy "super admin write" on public.offers for all to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));

create policy "own profile read" on public.profiles for select to authenticated using (id = auth.uid() or public.is_staff(auth.uid()));
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "own roles read" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.is_super_admin(auth.uid()));
create policy "assignments read" on public.admin_assignments for select to authenticated using (user_id = auth.uid() or public.is_super_admin(auth.uid()));

create policy "member read" on public.members for select to authenticated using (user_id = auth.uid() or public.can_manage_area(auth.uid(), district_id, mandal_id) or public.has_role(auth.uid(),'finance_officer') or public.has_role(auth.uid(),'welfare_officer'));
create policy "app read" on public.membership_applications for select to authenticated using (user_id = auth.uid() or public.can_manage_area(auth.uid(), district_id, mandal_id));
create policy "app insert own" on public.membership_applications for insert to authenticated with check (user_id = auth.uid() and status in ('draft','submitted') and reviewed_by is null);
create policy "app update own draft" on public.membership_applications for update to authenticated using (user_id = auth.uid() and status in ('draft','more_info_required')) with check (user_id = auth.uid() and status in ('draft','submitted'));
create policy "card read" on public.membership_cards for select to authenticated using (member_id = public.my_member_id() or exists (select 1 from public.members m where m.id = member_id and public.can_manage_area(auth.uid(), m.district_id, m.mandal_id)));

create policy "tx read" on public.payment_transactions for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'finance_officer') or public.is_super_admin(auth.uid()));
create policy "receipt read" on public.payment_receipts for select to authenticated using (exists (select 1 from public.payment_transactions t where t.id = transaction_id and (t.user_id = auth.uid() or public.has_role(auth.uid(),'finance_officer') or public.is_super_admin(auth.uid()))));
create policy "refund read" on public.refunds for select to authenticated using (public.has_role(auth.uid(),'finance_officer') or public.is_super_admin(auth.uid()));

create policy "welfare read" on public.welfare_applications for select to authenticated using (member_id = public.my_member_id() or assigned_officer = auth.uid() or public.is_super_admin(auth.uid()) or public.has_role(auth.uid(),'finance_officer'));
create policy "welfare insert own" on public.welfare_applications for insert to authenticated with check (member_id = public.my_member_id() and status in ('draft','submitted') and assigned_officer is null);
create policy "wdoc read" on public.welfare_documents for select to authenticated using (exists (select 1 from public.welfare_applications a where a.id = application_id and (a.member_id = public.my_member_id() or a.assigned_officer = auth.uid() or public.is_super_admin(auth.uid()))));
create policy "wdoc insert own" on public.welfare_documents for insert to authenticated with check (exists (select 1 from public.welfare_applications a where a.id = application_id and a.member_id = public.my_member_id()) and split_part(file_path, '/', 1) = auth.uid()::text);
create policy "wdisb read" on public.welfare_disbursements for select to authenticated using (exists (select 1 from public.welfare_applications a where a.id = application_id and (a.member_id = public.my_member_id() or public.has_role(auth.uid(),'finance_officer') or public.is_super_admin(auth.uid()))));

create policy "em read" on public.emergency_requests for select to authenticated using (user_id = auth.uid() or assigned_coordinator = auth.uid() or public.can_manage_district(auth.uid(), district_id));
create policy "em insert own" on public.emergency_requests for insert to authenticated with check (user_id = auth.uid() and status = 'open' and assigned_coordinator is null);
create policy "em staff update" on public.emergency_requests for update to authenticated using (assigned_coordinator = auth.uid() or public.can_manage_district(auth.uid(), district_id)) with check (assigned_coordinator = auth.uid() or public.can_manage_district(auth.uid(), district_id));
create policy "donor read" on public.blood_donors for select to authenticated using ((consent and available) or member_id = public.my_member_id() or public.is_staff(auth.uid()));
create policy "donor own" on public.blood_donors for all to authenticated using (member_id = public.my_member_id()) with check (member_id = public.my_member_id());
create policy "workshop own insert" on public.workshops for insert to authenticated with check (owner_member_id = public.my_member_id() and status = 'pending');
create policy "workshop own update" on public.workshops for update to authenticated using (owner_member_id = public.my_member_id()) with check (owner_member_id = public.my_member_id() and status = 'pending');
create policy "workshop admin" on public.workshops for update to authenticated using (public.can_manage_area(auth.uid(), district_id, mandal_id)) with check (public.can_manage_area(auth.uid(), district_id, mandal_id));

create policy "evreg read" on public.event_registrations for select to authenticated using (member_id = public.my_member_id() or public.is_staff(auth.uid()));
create policy "evreg own" on public.event_registrations for insert to authenticated with check (member_id = public.my_member_id() and not attended);
create policy "evreg own del" on public.event_registrations for delete to authenticated using (member_id = public.my_member_id());
create policy "evreg admin" on public.event_registrations for update to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));
create policy "tenr read" on public.training_enrollments for select to authenticated using (member_id = public.my_member_id() or public.is_staff(auth.uid()));
create policy "tenr own" on public.training_enrollments for insert to authenticated with check (member_id = public.my_member_id() and status = 'enrolled' and certificate_no is null);
create policy "tenr admin" on public.training_enrollments for update to authenticated using (public.is_super_admin(auth.uid())) with check (public.is_super_admin(auth.uid()));

create policy "notif own" on public.notifications for select to authenticated using (user_id = auth.uid());
create policy "notif own update" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "notif staff insert" on public.notifications for insert to authenticated with check (public.is_staff(auth.uid()));
create policy "prefs own" on public.notification_preferences for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "audit super read" on public.audit_logs for select to authenticated using (public.is_super_admin(auth.uid()));

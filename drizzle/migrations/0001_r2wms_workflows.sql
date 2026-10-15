create sequence public.membership_number_seq start 1001;
create sequence public.receipt_number_seq start 1;

create function public.log_action(_action text, _entity text, _id uuid, _meta jsonb default null) returns void language sql security definer set search_path = public as
$$ insert into public.audit_logs (actor_id, action, entity_type, entity_id, metadata) values (auth.uid(), _action, _entity, _id, _meta) $$;

create function public.review_membership_application(_app_id uuid, _decision text, _notes text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare a public.membership_applications; m_id uuid; num text;
begin
  select * into a from public.membership_applications where id = _app_id for update;
  if a.id is null then raise exception 'Application not found'; end if;
  if not public.can_manage_area(auth.uid(), a.district_id, a.mandal_id) then raise exception 'Not authorised for this area'; end if;
  if a.user_id = auth.uid() then raise exception 'You cannot review your own application'; end if;
  if _decision not in ('approved','rejected','more_info_required','under_review') then raise exception 'Invalid decision'; end if;
  if a.status in ('approved','rejected') then raise exception 'Application already decided'; end if;
  update public.membership_applications set status = _decision::public.membership_app_status, review_notes = _notes, reviewed_by = auth.uid(), reviewed_at = now(), updated_at = now() where id = _app_id;
  if _decision = 'approved' then
    num := 'R2WMS-' || to_char(now(),'YY') || '-' || lpad(nextval('public.membership_number_seq')::text, 6, '0');
    insert into public.members (user_id, membership_number, full_name, email, mobile, district_id, mandal_id, village_id, status, photo_path, workshop_name, specialization, experience_years, approved_at)
    values (a.user_id, num, a.full_name, a.email, a.mobile, a.district_id, a.mandal_id, a.village_id, 'approved', a.photo_path, a.workshop_name, a.specialization, a.experience_years, now())
    returning id into m_id;
    update public.membership_applications set member_id = m_id where id = _app_id;
    insert into public.membership_cards (member_id, qr_token) values (m_id, encode(extensions.gen_random_bytes(24), 'hex'));
  end if;
  if a.user_id is not null then
    insert into public.notifications (user_id, title, body) values (a.user_id, 'Application ' || replace(_decision,'_',' '), coalesce(_notes, 'Reference ' || a.reference_no));
  end if;
  perform public.log_action('membership_' || _decision, 'membership_application', _app_id, jsonb_build_object('notes', _notes, 'membership_number', num));
  return jsonb_build_object('status', _decision, 'membership_number', num);
end $$;

create function public.set_member_status(_member_id uuid, _status public.membership_app_status) returns void language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  select * into m from public.members where id = _member_id;
  if m.id is null or not public.can_manage_area(auth.uid(), m.district_id, m.mandal_id) then raise exception 'Not authorised'; end if;
  update public.members set status = _status, updated_at = now() where id = _member_id;
  if _status <> 'approved' then update public.membership_cards set revoked = true, revoked_at = now() where member_id = _member_id and not revoked; end if;
  perform public.log_action('member_status_' || _status, 'member', _member_id, null);
end $$;

create function public.reissue_card(_member_id uuid) returns void language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  select * into m from public.members where id = _member_id;
  if m.id is null or not public.can_manage_area(auth.uid(), m.district_id, m.mandal_id) then raise exception 'Not authorised'; end if;
  if m.status <> 'approved' then raise exception 'Membership is not active'; end if;
  update public.membership_cards set revoked = true, revoked_at = now() where member_id = _member_id and not revoked;
  insert into public.membership_cards (member_id, qr_token) values (_member_id, encode(extensions.gen_random_bytes(24),'hex'));
  perform public.log_action('card_reissued', 'member', _member_id, null);
end $$;

create function public.verify_card(_token text)
returns table (full_name text, membership_number text, district text, mandal text, status text, issued_at timestamptz, valid boolean)
language sql stable security definer set search_path = public as $$
  select m.full_name, m.membership_number, d.name, md.name, m.status::text, c.issued_at, (not c.revoked and m.status = 'approved')
  from public.membership_cards c join public.members m on m.id = c.member_id
  left join public.districts d on d.id = m.district_id left join public.mandals md on md.id = m.mandal_id
  where c.qr_token = _token and length(_token) = 48
$$;

create function public.application_status(_ref text)
returns table (reference_no text, status text, updated_at timestamptz, review_notes text)
language sql stable security definer set search_path = public as $$
  select reference_no, status::text, updated_at, review_notes from public.membership_applications
  where reference_no = upper(trim(_ref)) and (user_id = auth.uid() or public.can_manage_area(auth.uid(), district_id, mandal_id))
$$;

create function public.grant_role(_user uuid, _role public.app_role, _district uuid default null, _mandal uuid default null) returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_super_admin(auth.uid()) then raise exception 'Only the Super Admin can change roles'; end if;
  insert into public.user_roles (user_id, role) values (_user, _role) on conflict do nothing;
  if _role in ('district_admin','mandal_admin') then insert into public.admin_assignments (user_id, role, district_id, mandal_id) values (_user, _role, _district, _mandal); end if;
  perform public.log_action('role_granted', 'user', _user, jsonb_build_object('role', _role, 'district', _district, 'mandal', _mandal));
end $$;

create function public.revoke_role(_user uuid, _role public.app_role) returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_super_admin(auth.uid()) then raise exception 'Only the Super Admin can change roles'; end if;
  if _user = auth.uid() and _role = 'super_admin' then raise exception 'You cannot remove your own Super Admin role'; end if;
  delete from public.user_roles where user_id = _user and role = _role;
  delete from public.admin_assignments where user_id = _user and role = _role;
  perform public.log_action('role_revoked', 'user', _user, jsonb_build_object('role', _role));
end $$;

create function public.claim_first_super_admin() returns boolean language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'super_admin') then return false; end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'super_admin');
  perform public.log_action('super_admin_claimed', 'user', auth.uid(), null);
  return true;
end $$;

create function public.record_manual_payment(_member_id uuid, _plan_id uuid, _amount_paise int, _mode text, _notes text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare tx uuid; rno text; m public.members;
begin
  if not (public.has_role(auth.uid(),'finance_officer') or public.is_super_admin(auth.uid())) then raise exception 'Not authorised'; end if;
  if _amount_paise <= 0 then raise exception 'Amount must be positive'; end if;
  select * into m from public.members where id = _member_id;
  if m.id is null then raise exception 'Member not found'; end if;
  insert into public.payment_transactions (user_id, member_id, plan_id, amount_paise, gateway, mode, status, verified_by, notes)
  values (m.user_id, _member_id, _plan_id, _amount_paise, 'manual', _mode, 'success', auth.uid(), _notes) returning id into tx;
  rno := 'RCPT-' || to_char(now(),'YYYYMM') || '-' || lpad(nextval('public.receipt_number_seq')::text, 6, '0');
  insert into public.payment_receipts (transaction_id, receipt_no) values (tx, rno);
  perform public.log_action('manual_payment_recorded', 'payment', tx, jsonb_build_object('amount_paise', _amount_paise, 'mode', _mode));
  return jsonb_build_object('transaction_id', tx, 'receipt_no', rno);
end $$;

create function public.review_welfare_application(_app_id uuid, _status public.welfare_app_status, _notes text default null) returns void language plpgsql security definer set search_path = public as $$
declare a public.welfare_applications; uid uuid;
begin
  select * into a from public.welfare_applications where id = _app_id for update;
  if a.id is null then raise exception 'Not found'; end if;
  if not (public.is_super_admin(auth.uid()) or a.assigned_officer = auth.uid()) then raise exception 'Not authorised'; end if;
  if _status in ('disbursed') then raise exception 'Use record disbursement'; end if;
  if a.member_id = public.my_member_id() then raise exception 'You cannot review your own application'; end if;
  update public.welfare_applications set status = _status, decision_notes = _notes, updated_at = now() where id = _app_id;
  select user_id into uid from public.members where id = a.member_id;
  if uid is not null then insert into public.notifications (user_id, title, body) values (uid, 'Welfare application ' || replace(_status::text,'_',' '), coalesce(_notes, a.reference_no)); end if;
  perform public.log_action('welfare_' || _status, 'welfare_application', _app_id, jsonb_build_object('notes', _notes));
end $$;

create function public.assign_welfare_officer(_app_id uuid, _officer uuid) returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_super_admin(auth.uid()) then raise exception 'Not authorised'; end if;
  if not public.has_role(_officer, 'welfare_officer') then raise exception 'User is not a welfare officer'; end if;
  update public.welfare_applications set assigned_officer = _officer, status = 'under_review', updated_at = now() where id = _app_id;
  perform public.log_action('welfare_assigned', 'welfare_application', _app_id, jsonb_build_object('officer', _officer));
end $$;

create function public.record_welfare_disbursement(_app_id uuid, _amount_paise int, _utr text) returns void language plpgsql security definer set search_path = public as $$
declare a public.welfare_applications;
begin
  if not (public.has_role(auth.uid(),'finance_officer') or public.is_super_admin(auth.uid())) then raise exception 'Not authorised'; end if;
  select * into a from public.welfare_applications where id = _app_id for update;
  if a.status not in ('approved','disbursement_pending') then raise exception 'Application must be approved first'; end if;
  insert into public.welfare_disbursements (application_id, amount_paise, disbursed_by, disbursed_at, utr_reference) values (_app_id, _amount_paise, auth.uid(), now(), _utr);
  update public.welfare_applications set status = 'disbursed', updated_at = now() where id = _app_id;
  perform public.log_action('welfare_disbursed', 'welfare_application', _app_id, jsonb_build_object('amount_paise', _amount_paise, 'utr', _utr));
end $$;

create function public.issue_certificate(_enrollment_id uuid, _score int) returns text language plpgsql security definer set search_path = public as $$
declare c text;
begin
  if not public.is_super_admin(auth.uid()) then raise exception 'Not authorised'; end if;
  c := 'CERT-' || upper(substr(md5(random()::text),1,10));
  update public.training_enrollments set status = 'completed', score = _score, certificate_no = c where id = _enrollment_id and status in ('enrolled','attended');
  if not found then raise exception 'Enrollment not eligible'; end if;
  perform public.log_action('certificate_issued', 'training_enrollment', _enrollment_id, jsonb_build_object('score', _score));
  return c;
end $$;

create function public.admin_stats() returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_staff(auth.uid()) then raise exception 'Not authorised'; end if;
  return jsonb_build_object(
    'total_members', (select count(*) from public.members m where public.can_manage_area(auth.uid(), m.district_id, m.mandal_id) or public.has_role(auth.uid(),'finance_officer')),
    'active_members', (select count(*) from public.members m where m.status = 'approved' and (public.can_manage_area(auth.uid(), m.district_id, m.mandal_id) or public.has_role(auth.uid(),'finance_officer'))),
    'pending_registrations', (select count(*) from public.membership_applications a where a.status in ('submitted','under_review') and public.can_manage_area(auth.uid(), a.district_id, a.mandal_id)),
    'inactive_members', (select count(*) from public.members m where m.status in ('inactive','suspended') and public.can_manage_area(auth.uid(), m.district_id, m.mandal_id)),
    'collections_paise', case when public.has_role(auth.uid(),'finance_officer') or public.is_super_admin(auth.uid()) then (select coalesce(sum(amount_paise),0) from public.payment_transactions where status = 'success') else null end,
    'pending_payments', (select count(*) from public.payment_transactions where status in ('created','pending')),
    'welfare_applications', (select count(*) from public.welfare_applications),
    'welfare_approved', (select count(*) from public.welfare_applications where status in ('approved','disbursement_pending','disbursed')),
    'pending_emergencies', (select count(*) from public.emergency_requests e where e.status = 'open' and public.can_manage_district(auth.uid(), e.district_id)),
    'upcoming_events', (select count(*) from public.events where starts_at > now()),
    'by_district', (select coalesce(jsonb_agg(jsonb_build_object('name', d.name, 'count', (select count(*) from public.members m where m.district_id = d.id))), '[]') from public.districts d where public.can_manage_district(auth.uid(), d.id)),
    'monthly_registrations', (select coalesce(jsonb_agg(x), '[]') from (select to_char(date_trunc('month', created_at),'Mon YY') as month, count(*) as count from public.membership_applications where created_at > now() - interval '12 months' and public.can_manage_area(auth.uid(), district_id, mandal_id) group by date_trunc('month', created_at) order by date_trunc('month', created_at)) x),
    'welfare_by_status', (select coalesce(jsonb_agg(x), '[]') from (select status::text as status, count(*) as count from public.welfare_applications group by status) x)
  );
end $$;

revoke execute on all functions in schema public from anon, public;
grant execute on all functions in schema public to authenticated;
grant execute on function public.verify_card(text), public.has_role(uuid, public.app_role), public.is_staff(uuid), public.is_super_admin(uuid), public.can_manage_area(uuid,uuid,uuid), public.can_manage_district(uuid,uuid), public.my_member_id() to anon;

create policy "own private upload" on storage.objects for insert to authenticated with check (bucket_id in ('member-photos','member-documents','welfare-documents') and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own or staff private read" on storage.objects for select to authenticated using (bucket_id in ('member-photos','member-documents','welfare-documents') and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff(auth.uid())));
create policy "public media read" on storage.objects for select using (bucket_id = 'public-media');
create policy "staff public media write" on storage.objects for insert to authenticated with check (bucket_id = 'public-media' and public.is_staff(auth.uid()));

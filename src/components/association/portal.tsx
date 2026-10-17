import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowRight, Bell, Wrench, House, BadgeCheck, HandHeart, Megaphone, UserRound, CreditCard, ShieldCheck, ChevronDown, LogOut, PanelLeftClose, PanelLeftOpen, LifeBuoy, Download, UsersRound, Search, Plus, Check, Globe, HeartHandshake, Phone, X, CalendarDays, GraduationCap, Tag, Droplets, Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDemo, demoMember, labels, translate, type Member } from './demo-store';
import { LoginEntry } from './login-entry';
import mechanics from '@/assets/mechanics.jpg';

const navigation = [
  { key: 'home', path: '/dashboard', icon: House },
  { key: 'membership', path: '/membership', icon: BadgeCheck },
  { key: 'welfare', path: '/welfare', icon: HandHeart },
  { key: 'payments', path: '/payments', icon: CreditCard },
  { key: 'events', path: '/events', icon: CalendarDays },
  { key: 'training', path: '/training', icon: GraduationCap },
  { key: 'offers', path: '/offers', icon: Tag },
  { key: 'donors', path: '/blood-donors', icon: Droplets },
  { key: 'emergency', path: '/emergency', icon: Siren },
  { key: 'notices', path: '/notices', icon: Megaphone },
  { key: 'profile', path: '/profile', icon: UserRound },
] as const;

const mobileNav = ['home', 'membership', 'welfare', 'notices', 'profile'] as const;

export function AssociationApp() {
  const { data, ready } = useDemo();
  if (!ready) return <div className="loading-state" role="status">Loading your portal…</div>;
  if (!data.currentId && !data.admin) return <LoginEntry />;
  return <Portal />;
}

function Logo() {
  return <div className="brand"><span className="brand-mark"><Wrench aria-hidden="true" /></span><div><strong>R2WMS<span className="brand-dot">.</span></strong><span className="brand-subtitle">MECHANICS WELFARE SEVA</span></div></div>;
}

function Portal() {
  const { data, update, ready } = useDemo();
  const navigate = useNavigate();
  const path = useRouterState({ select: s => s.location.pathname });
  const t = labels[data.language];
  const tr = (text: string) => translate(text, data.language);
  const member = data.currentId === 'demo-member' ? demoMember : data.members.find(m => m.id === data.currentId);
  const [collapsed, setCollapsed] = useState(false);
  const [modal, setModal] = useState<'help' | 'notice' | null>(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const page = navigation.find(n => n.path === path);
  const title = path === '/admin' ? t.admin : page ? t[page.key] : t.home;

  function notify(text: string) { setMessage(tr(text)); }
  function signout() { update(d => ({ ...d, currentId: null, admin: false })); navigate({ to: '/', replace: true }); }

  const myRequests = data.requests.filter(r => r.memberId === member?.id);

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="desktop-sidebar">
        <Link to="/dashboard" aria-label="R2WMS home"><Logo /></Link>
        <div className="association-name">Rayalaseema Two-Wheeler<br />Mechanics Welfare Seva</div>
        <div className="sidebar-rule" />
        <p className="nav-caption">MEMBER PORTAL</p>
        <nav aria-label="Main navigation">
          {navigation.map(n => <Link key={n.key} to={n.path} className={`nav-item ${path === n.path ? 'active' : ''}`} title={t[n.key]}><n.icon /><span>{t[n.key]}</span>{path === n.path && <span className="active-dot" />}</Link>)}
          {data.admin && <Link to="/admin" className={`nav-item ${path === '/admin' ? 'active' : ''}`}><ShieldCheck /><span>{t.admin}</span></Link>}
        </nav>
        <div className="sidebar-bottom">
          <div className="seva-message"><HeartHandshake /><strong>Stronger, together.</strong><p>One community. A shared journey.</p></div>
          <Button variant="ghost" onClick={() => setModal('help')}><LifeBuoy /> Help & support <ArrowUpRight /></Button>
          <div className="sidebar-user">
            <span className="avatar">{member ? member.name.slice(0, 2).toUpperCase() : data.admin ? 'AD' : 'RS'}</span>
            <div><strong>{member?.name ?? (data.admin ? 'Demo Administrator' : 'Welcome, mechanic')}</strong><small>{data.admin ? 'Demo workspace' : member ? 'Member portal' : 'Your community awaits'}</small></div>
            <Button variant="ghost" size="icon" aria-label={member || data.admin ? 'Leave demo access' : 'Sign in'} onClick={() => signout()}>{member || data.admin ? <LogOut /> : <ArrowRight />}</Button>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="top-header">
          <div className="desktop-header-title">
            <Button variant="ghost" size="icon" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</Button>
            <span>Member portal</span><span className="breadcrumb-slash">/</span><strong>{title}</strong>
          </div>
          <div className="mobile-brand"><Link to="/dashboard"><Logo /></Link></div>
          <div className="header-controls">
            <label className="language-picker"><Globe /><select aria-label={t.language} value={data.language} onChange={e => update(d => ({ ...d, language: e.target.value === 'te' ? 'te' : 'en' }))}><option value="en">English</option><option value="te">తెలుగు</option></select><ChevronDown /></label>
            <span className="header-divider" />
            <Button asChild variant="ghost" size="icon" aria-label="Notifications" title="Notifications"><Link to="/notices"><Bell />{data.notices.length > 0 && <span className="notification-dot" />}</Link></Button>
            <Button asChild variant="ghost" size="icon" className="header-avatar" aria-label="Profile access"><Link to="/profile"><UserRound /></Link></Button>
          </div>
        </header>

        <div className="page-content" lang={data.language === 'te' ? 'te' : 'en'}>
          <div className="page-heading">
            <div>
              <p className="eyebrow"><span /> RAYALASEEMA • OUR COMMUNITY</p>
              <h1>{path === '/dashboard' ? (member ? `${data.language === 'te' ? 'స్వాగతం' : 'Welcome'}, ${member.name.split(' ')[0]}` : t.welcome) : title}</h1>
              <p>{path === '/dashboard' ? t.subtitle : path === '/membership' ? 'Your identity. Your connection to the community.' : path === '/welfare' ? 'Support when it matters most.' : path === '/admin' ? 'Manage this browser’s demo member records.' : 'Stay connected with your association.'}</p>
            </div>
          </div>

          <div className="demo-ribbon"><ShieldCheck /><span>Browser-only demo</span><span className="demo-ribbon-detail">No live payments, verification or association services.</span></div>
          {message && <div className="feedback" role="status"><Check /><span>{message}</span><Button size="icon" variant="ghost" aria-label="Dismiss message" onClick={() => setMessage('')}><X /></Button></div>}

          {!ready ? <div className="loading-state" role="status">Loading your portal…</div>
            : path === '/dashboard' ? <>
              <section className="community-banner">
                <img src={mechanics} alt="Two mechanics working together in a two-wheeler workshop" width={1536} height={1024} />
                <div className="banner-overlay" />
                <div className="banner-copy"><span className="banner-eyebrow">BUILT ON TRUST. UNITED BY SERVICE.</span><h2>A community that<br />stands beside you.</h2><p>For every mechanic. For every family.<br />For a stronger Rayalaseema.</p><Button variant="banner" asChild><Link to="/welfare">Explore welfare <ArrowRight /></Link></Button></div>
                <span className="banner-tag"><HeartHandshake /> Together for a better tomorrow</span>
              </section>
              <div className="summary-grid">
                {[
                  { label: 'Membership status', value: member?.status ?? 'Not registered', icon: BadgeCheck, note: member ? 'Your browser-local profile' : 'Join the R2WMS community', color: 'blue' },
                  { label: 'My welfare requests', value: String(myRequests.length), icon: HandHeart, note: 'Applications you have submitted', color: 'orange' },
                  { label: 'Association notices', value: String(data.notices.length), icon: Megaphone, note: 'Updates from your association', color: 'green' },
                  { label: 'Payment records', value: '0', icon: CreditCard, note: 'No payments recorded', color: 'blue' },
                ].map(s => <div className="summary-card" key={s.label}><div className="summary-label">{tr(s.label)}<span className={`icon-tile ${s.color}`}><s.icon /></span></div><strong className={s.label === 'Membership status' ? 'status-value' : ''}>{tr(s.value)}</strong><small>{s.note}</small></div>)}
              </div>
              <section className="quick-section">
                <div className="section-heading"><h2>{t.actions}</h2><span>QUICK ACCESS</span></div>
                <div className="quick-grid">
                  {[
                    { label: 'Membership card', te: 'సభ్యత్వ కార్డు', icon: BadgeCheck, path: '/membership', color: 'blue' },
                    { label: 'Welfare support', te: 'సంక్షేమ సహాయం', icon: HandHeart, path: '/welfare', color: 'orange' },
                    { label: 'Events', te: 'కార్యక్రమాలు', icon: CalendarDays, path: '/events', color: 'green' },
                    { label: 'Training', te: 'శిక్షణ', icon: GraduationCap, path: '/training', color: 'blue' },
                    { label: 'Member offers', te: 'సభ్యుల ఆఫర్లు', icon: Tag, path: '/offers', color: 'orange' },
                    { label: 'Blood donors', te: 'రక్తదాతలు', icon: Droplets, path: '/blood-donors', color: 'green' },
                    { label: 'Emergency', te: 'అత్యవసరం', icon: Siren, path: '/emergency', color: 'orange' },
                    { label: 'Association notices', te: 'సంఘం ప్రకటనలు', icon: Megaphone, path: '/notices', color: 'blue' },
                  ].map(q => <Button variant="quick" asChild key={q.label}><Link to={q.path}><span className={`icon-tile ${q.color}`}><q.icon /></span><span className="quick-text"><strong>{q.label}</strong><small lang="te">{q.te}</small></span><ArrowUpRight /></Link></Button>)}
                </div>
              </section>
              <div className="home-lower">
                <section className="membership-preview"><div className="section-heading"><h2>{t.card}</h2><Link to="/membership">{t.view}<ArrowRight /></Link></div><MemberCard member={member} language={data.language} /></section>
                <section className="notice-preview"><div className="section-heading"><h2>{t.updates}</h2><Link to="/notices">{t.all}<ArrowRight /></Link></div>{data.notices.length ? data.notices.slice(0, 2).map(n => <div className="notice-row" key={n.id}><span className="icon-tile blue"><Megaphone /></span><div><h3>{n.title}</h3><p>{n.detail}</p><small>{n.date}</small></div></div>) : <div className="quiet-empty"><Megaphone /><h3>{tr('You’re all caught up')}</h3><p>Association updates will appear here<br />when a notice is published.</p></div>}<div className="notice-footer"><ShieldCheck /> Official association updates, in one place</div></section>
              </div>
              <section className="help-strip"><span className="help-strip-icon"><LifeBuoy /></span><div><h2>{t.help}</h2><p>When you need a helping hand, your community is close.</p></div><Button variant="outline" onClick={() => setModal('help')}><Phone />{t.support}<ArrowUpRight /></Button></section>
            </>
            : path === '/membership' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('Your digital membership')}</h2>{member?.status === 'Active' && <Button variant="outline" onClick={() => window.print()}><Download /> Print demo card</Button>}</div>
              <div className="full-member-card"><MemberCard member={member} language={data.language} /></div>
              <div className="membership-details"><h2>{tr('Membership details')}</h2>{member ? <dl><dt>{tr('Name')}</dt><dd>{member.name}</dd><dt>{tr('Workshop')}</dt><dd>{member.workshop}</dd><dt>District</dt><dd>{member.district}</dd><dt>{tr('Status')}</dt><dd><span className="status-badge">{tr(member.status)}</span></dd></dl> : <Empty icon={BadgeCheck} title={tr('Your membership starts here')} text="Sign in or create a member profile to view your membership status." action={<Button asChild><Link to="/">Sign in or register <ArrowRight /></Link></Button>} />}<p className="small-note">Demo cards are not valid association IDs. Secure QR verification is not connected.</p></div>
            </section>
            : path === '/welfare' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('My applications')}</h2><span className="status-badge">{myRequests.length} requests</span></div>
              {member ? <>
                <form className="standard-form welfare-form" onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); update(d => ({ ...d, requests: [...d.requests, { id: crypto.randomUUID(), memberId: member.id, name: member.name, subject: String(f.get('subject')), detail: String(f.get('detail')), status: 'Submitted', date: new Date().toLocaleDateString('en-IN') }] })); e.currentTarget.reset(); notify('Demo request saved. This does not submit to the association.'); }}>
                  <h3>{tr('New demo request')}</h3>
                  <label>{tr('Subject')}<input name="subject" required minLength={3} maxLength={100} placeholder="What support do you need?" /></label>
                  <label>{tr('Details')}<textarea name="detail" required minLength={10} maxLength={1000} placeholder="Describe your request without sensitive personal details." /></label>
                  <Button type="submit"><Plus /> Save demo request</Button>
                </form>
                {myRequests.map(r => <article className="request-row" key={r.id}><div><h3>{r.subject}</h3><p>{r.detail}</p><small>{r.date}</small></div><span className="status-badge">{tr(r.status)}</span></article>)}
              </> : <Empty icon={HandHeart} title={tr('A helping hand, when you need it')} text="Sign in to create and track a welfare request." action={<Button asChild><Link to="/">Sign in or register <ArrowRight /></Link></Button>} />}
              <p className="small-note">No welfare schemes or benefits have been confirmed. Demo requests are saved only on this browser.</p>
            </section>
            : path === '/notices' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('Latest notices')}</h2>{data.admin && <Button onClick={() => setModal('notice')}><Plus /> Publish demo notice</Button>}</div>
              {data.notices.length ? data.notices.map(n => <article className="notice-row" key={n.id}><span className="icon-tile blue"><Megaphone /></span><div><small>ASSOCIATION NOTICE · {n.date}</small><h3>{n.title}</h3><p>{n.detail}</p></div></article>) : <Empty icon={Megaphone} title={tr('No notices published yet')} text="There are no association announcements in this demo workspace." />}
            </section>
            : path === '/payments' ? <section className="detail-section"><h2>{tr('Fees & receipts')}</h2><Empty icon={CreditCard} title={tr('No payment records')} text="Online payments and official receipts are not connected. No membership fees have been configured." /></section>
            : path === '/events' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('Upcoming events')}</h2><span className="status-badge">{data.events.length} events</span></div>
              {data.events.map(ev => <article className="notice-row" key={ev.id}><span className="icon-tile green"><CalendarDays /></span><div><small>{ev.date} · {ev.place}</small><h3>{ev.title}</h3><p>{ev.detail}</p></div></article>)}
              <p className="small-note">Demo event schedule. Official event registration is not connected.</p>
            </section>
            : path === '/training' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('Training programs')}</h2><span className="status-badge">{data.trainings.length} programs</span></div>
              {data.trainings.map(trn => {
                const enrolled = member && data.enrollments.includes(`${member.id}:${trn.id}`);
                return <article className="request-row" key={trn.id}><div><h3>{trn.title}</h3><p>{trn.detail}</p><small>{trn.date}</small></div>{member ? <Button variant={enrolled ? 'ghost' : 'outline'} disabled={!!enrolled} onClick={() => { update(d => ({ ...d, enrollments: [...d.enrollments, `${member.id}:${trn.id}`] })); notify('Demo enrollment saved on this browser.'); }}>{enrolled ? <><Check /> {tr('Enrolled')}</> : tr('Enroll')}</Button> : <Button asChild variant="outline"><Link to="/">{tr('Sign in')}</Link></Button>}</article>;
              })}
              <p className="small-note">Demo enrollments only. Certificates and official training records are not connected.</p>
            </section>
            : path === '/offers' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('Member offers')}</h2><span className="status-badge">{data.offers.length} offers</span></div>
              {data.offers.map(o => <article className="notice-row" key={o.id}><span className="icon-tile orange"><Tag /></span><div><small>{o.partner} · {o.validity}</small><h3>{o.title}</h3><p>{o.detail}</p></div></article>)}
              <p className="small-note">Demo offers. Partner discounts are not yet officially confirmed.</p>
            </section>
            : path === '/blood-donors' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('Blood donors')}</h2><span className="status-badge">{data.donors.length} donors</span></div>
              {member && !data.donors.some(dn => dn.memberId === member.id) && (
                <form className="standard-form welfare-form" onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); update(d => ({ ...d, donors: [...d.donors, { id: crypto.randomUUID(), memberId: member.id, name: member.name, bloodGroup: String(f.get('bloodGroup')), district: member.district, phone: String(f.get('phone')) }] })); notify('Demo donor registration saved on this browser.'); }}>
                  <h3>{tr('Register as donor')}</h3>
                  <label>Blood group<select aria-label="Blood group" name="bloodGroup" required>{['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−'].map(g => <option key={g}>{g}</option>)}</select></label>
                  <label>Phone<input name="phone" type="tel" required minLength={10} maxLength={15} placeholder="Contact number" /></label>
                  <Button type="submit"><Droplets /> {tr('Register as donor')}</Button>
                </form>
              )}
              {data.donors.map(dn => <article className="notice-row" key={dn.id}><span className="icon-tile orange"><Droplets /></span><div><small>{dn.district}</small><h3>{dn.name} · {dn.bloodGroup}</h3><p><a href={`tel:${dn.phone}`}>{dn.phone}</a></p></div></article>)}
              {!data.donors.length && <Empty icon={Droplets} title="No donors registered yet" text={member ? 'Be the first to register as a blood donor in this demo.' : 'Sign in to register as a blood donor.'} />}
              <p className="small-note">Demo donor list, visible only on this browser.</p>
            </section>
            : path === '/emergency' ? <section className="detail-section">
              <div className="section-heading"><h2>{tr('Emergency contacts')}</h2></div>
              {[
                { name: 'National Emergency Number', number: '112', note: 'Police, fire and medical emergencies across India.' },
                { name: 'Ambulance', number: '108', note: 'Free emergency ambulance service.' },
                { name: 'Police', number: '100', note: 'Police control room.' },
                { name: 'Roadside accident help', number: '1073', note: 'National highways accident helpline.' },
              ].map(c => <article className="request-row" key={c.number}><div><h3>{c.name}</h3><p>{c.note}</p></div><Button asChild><a href={`tel:${c.number}`}><Phone /> {c.number}</a></Button></article>)}
              <p className="small-note">These are national emergency services, not R2WMS helplines. An association helpline has not been configured.</p>
            </section>
            : path === '/admin' ? <section className="detail-section">
              {data.admin ? <>
                <div className="section-heading"><h2>Member management</h2><span className="status-badge">{data.members.length} local profiles</span></div>
                <label className="search-field"><Search /><input aria-label="Search members" placeholder="Search name, workshop or district" value={search} onChange={e => setSearch(e.target.value)} /></label>
                <div className="table-scroll"><table><thead><tr><th>Member</th><th>Workshop / District</th><th>{tr('Status')}</th><th>Action</th></tr></thead><tbody>{data.members.filter(m => `${m.name} ${m.workshop} ${m.district}`.toLowerCase().includes(search.toLowerCase())).map(m => <tr key={m.id}><td>{m.name}</td><td>{m.workshop}<small>{m.district}</small></td><td><span className="status-badge">{m.status}</span></td><td><Button variant="outline" disabled={m.status === 'Active'} onClick={() => { update(d => ({ ...d, members: d.members.map(x => x.id === m.id ? { ...x, status: 'Active' } : x) })); notify('Demo membership marked active. Not an official approval.'); }}><Check />{m.status === 'Active' ? 'Active' : 'Approve demo'}</Button></td></tr>)}</tbody></table></div>
                {!data.members.length && <Empty icon={UsersRound} title="No demo members yet" text="Member profiles created on this browser will appear here." />}
                <div className="section-heading admin-welfare"><h2>Welfare requests</h2></div>
                {data.requests.map(r => <article className="request-row" key={r.id}><div><h3>{r.subject}</h3><p>{r.name} · {r.detail}</p><span className="status-badge">{tr(r.status)}</span></div><div className="request-actions"><Button variant="outline" disabled={r.status !== 'Submitted'} onClick={() => update(d => ({ ...d, requests: d.requests.map(x => x.id === r.id ? { ...x, status: 'Approved' } : x) }))}>Approve demo</Button><Button variant="ghost" disabled={r.status !== 'Submitted'} onClick={() => update(d => ({ ...d, requests: d.requests.map(x => x.id === r.id ? { ...x, status: 'Rejected' } : x) }))}>Reject demo</Button></div></article>)}
                {!data.requests.length && <p className="small-note">No welfare requests submitted.</p>}
                <Button variant="outline" onClick={() => setModal('notice')}><Plus /> Publish demo notice</Button>
              </> : <Empty icon={ShieldCheck} title="Demo administrator workspace" text="This is an open demo, not a protected administration system." action={<Button asChild><Link to="/">Sign in</Link></Button>} />}
            </section>
            : <section className="detail-section">
              <h2>{tr('My profile')}</h2>
              {member ? <form key={member.id} className="standard-form" onSubmit={e => { e.preventDefault(); if (member.id === 'demo-member') { notify('Create your own profile to save personal details.'); return; } const f = new FormData(e.currentTarget); update(d => ({ ...d, members: d.members.map(m => m.id === member.id ? { ...m, name: String(f.get('name')), workshop: String(f.get('workshop')), district: String(f.get('district')) } : m) })); notify('Your profile has been updated.'); }}>
                <label>{tr('Full name')}<input name="name" required defaultValue={member.name} /></label>
                <label>{tr('Workshop name')}<input name="workshop" required defaultValue={member.workshop} /></label>
                <label>{tr('District')}<select aria-label={tr('District')} name="district" defaultValue={member.district}>{[member.district, ...['Anantapur', 'Sri Sathya Sai', 'Kurnool', 'Nandyal', 'YSR Kadapa', 'Annamayya', 'Chittoor', 'Tirupati'].filter(d => d !== member.district)].map(d => <option key={d}>{d}</option>)}</select></label>
                <Button type="submit">{tr('Save profile')}</Button>
                <Button type="button" variant="outline" onClick={signout}><LogOut /> Leave demo access</Button>
              </form> : <Empty icon={UserRound} title={tr('Make yourself at home')} text="Sign in or create a browser-local member profile." action={<Button asChild><Link to="/">Sign in or register <ArrowRight /></Link></Button>} />}
            </section>}

          <footer className="page-footer"><span>© 2026 R2WMS. Together in service.</span><span><ShieldCheck /> A community built on trust</span></footer>
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Bottom navigation">
        {navigation.filter(n => (mobileNav as readonly string[]).includes(n.key)).map(n => <Link key={n.key} to={n.path} className={path === n.path ? 'active' : ''}><n.icon /><span>{t[n.key]}</span></Link>)}
      </nav>

      <Dialog open={modal !== null} onOpenChange={open => { if (!open) { setModal(null); setMessage(''); } }}>
        <DialogContent className="association-dialog">
          <DialogHeader>
            <DialogTitle>{tr(modal === 'help' ? 'Help & support' : 'Publish a demo notice')}</DialogTitle>
            <DialogDescription>{modal === 'help' ? 'Official support contacts have not been configured.' : 'This notice will be visible only in this browser’s demo.'}</DialogDescription>
          </DialogHeader>
          {modal === 'notice' ? (
            <form className="standard-form" onSubmit={e => { e.preventDefault(); if (!data.admin) return; const f = new FormData(e.currentTarget); update(d => ({ ...d, notices: [{ id: crypto.randomUUID(), title: String(f.get('title')), detail: String(f.get('detail')), date: new Date().toLocaleDateString('en-IN') }, ...d.notices] })); setModal(null); notify('Demo notice published on this browser.'); }}>
              <label>Title<input required name="title" maxLength={120} /></label>
              <label>Notice<textarea required name="detail" maxLength={2000} /></label>
              <Button type="submit">Publish demo notice</Button>
            </form>
          ) : (
            <div className="support-message"><LifeBuoy /><h3>Your safety comes first</h3><p>For immediate danger or a medical emergency in India, call the national emergency number.</p><Button asChild><a href="tel:112"><Phone /> Call 112</a></Button><p className="small-note">112 is a national emergency service, not an R2WMS helpline.</p></div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MemberCard({ member, language }: { member: Member | undefined; language: 'en' | 'te' }) {
  return <div className="digital-card"><div className="card-brand"><Wrench /><div><strong>R2WMS</strong><small>Rayalaseema Two-Wheeler Mechanics Welfare Seva</small></div><ShieldCheck /></div><div className="card-member"><span className="card-avatar"><UserRound /></span><div><h3>{member?.name ?? 'Your place in our community'}</h3><p>{member ? member.district : 'Rayalaseema, Andhra Pradesh'}</p><span className={`card-status ${member?.status === 'Active' ? 'is-active' : ''}`}><span />{member ? translate(member.status, language) : translate('Not registered', language)}</span></div></div><div className="card-bottom"><span>{member ? 'BROWSER-LOCAL DEMO CARD' : 'MEMBERSHIP • WELFARE • COMMUNITY'}</span><HeartHandshake /></div></div>;
}

function Empty({ icon: Icon, title, text, action }: { icon: typeof House; title: string; text: string; action?: React.ReactNode }) {
  return <div className="empty-state"><span className="icon-tile blue"><Icon /></span><h3>{title}</h3><p>{text}</p>{action}</div>;
}

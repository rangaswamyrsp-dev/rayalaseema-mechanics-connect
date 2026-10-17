import { Link, useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Globe, ShieldCheck, UserRound, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { demoMember, useDemo, translate } from './demo-store';

export function LoginEntry({ register = false }: { register?: boolean }) {
  const { data, update, ready } = useDemo();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const tr = (text: string) => translate(text, data.language);

  function open(memberId: string | null, admin = false) {
    update(d => ({ ...d, currentId: memberId, admin }));
    navigate({ to: admin ? '/admin' : '/dashboard' });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email')).trim().toLowerCase();
    const saved = data.members.find(m => m.email.toLowerCase() === email);
    setError('');
    if (!register) {
      if (!saved) { setError(tr('No saved demo profile found on this browser. Create a profile first.')); return; }
      open(saved.id);
      return;
    }
    if (saved) { setError(tr('This email already has a demo profile. Use demo access to reopen it.')); return; }
    const id = crypto.randomUUID();
    update(d => ({ ...d, admin: false, currentId: id, members: [...d.members, {
      id, email, name: String(form.get('name')).trim(), workshop: String(form.get('workshop')).trim(), district: String(form.get('district')), status: 'Pending review',
    }] }));
    navigate({ to: '/dashboard' });
  }

  return <div className="entry-page" lang={data.language}>
    <header className="entry-header">
      <Link to="/" className="brand" aria-label="R2WMS sign in"><span className="brand-mark"><Wrench /></span><div><strong>R2WMS<span className="brand-dot">.</span></strong><span className="brand-subtitle">MECHANICS WELFARE SEVA</span></div></Link>
      <label className="language-picker"><Globe /><select aria-label="Language" value={data.language} onChange={e => update(d => ({ ...d, language: e.target.value === 'te' ? 'te' : 'en' }))}><option value="en">English</option><option value="te">తెలుగు</option></select></label>
    </header>
    <main className="entry-main">
      <span className="entry-symbol"><UserRound /></span>
      <h1>{tr(register ? 'Join the R2WMS community' : 'Welcome to R2WMS')}</h1>
      <p className="entry-name">Rayalaseema Two-Wheeler Mechanics Welfare Seva</p>
      <p className="entry-tagline">United Mechanics • Stronger Welfare • Better Future</p>
      <nav className="entry-tabs" aria-label="Account access"><Button asChild variant={register ? 'ghost' : 'secondary'}><Link to="/">{tr('Sign in')}</Link></Button><Button asChild variant={register ? 'secondary' : 'ghost'}><Link to="/register">{tr('Register')}</Link></Button></nav>
      <div className="entry-demo-note"><ShieldCheck /><div><strong>{tr('Browser-only demo')}</strong><p>No password needed. Profiles stay in this browser; this is not a secure live account.</p></div></div>
      <form key={register ? 'register' : 'signin'} className="standard-form entry-form" onSubmit={submit}>
        {register && <label>{tr('Full name')}<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>}
        <label>{tr('Email address')}<input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
        {register && <><label>{tr('Workshop name')}<input name="workshop" required minLength={2} maxLength={120} /></label><label>{tr('District')}<select aria-label={tr('District')} name="district" required defaultValue=""><option value="" disabled>{tr('Select your district')}</option>{['Anantapur', 'Sri Sathya Sai', 'Kurnool', 'Nandyal', 'YSR Kadapa', 'Annamayya', 'Chittoor', 'Tirupati'].map(d => <option key={d}>{d}</option>)}</select></label><label className="entry-consent"><input type="checkbox" required />I understand this creates a browser-local demo profile, not an official membership application.</label></>}
        {error && <p role="alert" className="form-message">{error}</p>}
        <Button type="submit" disabled={!ready}>{tr(register ? 'Create demo profile' : 'Open my demo profile')}<ArrowRight /></Button>
      </form>
      {!register && <div className="entry-demo-actions"><span>Or explore a demo</span><div><Button variant="outline" disabled={!ready} onClick={() => open(demoMember.id)}><UserRound />{tr('Try member demo')}</Button><Button variant="outline" disabled={!ready} onClick={() => open(null, true)}><ShieldCheck />{tr('Try admin demo')}</Button></div></div>}
    </main>
    <footer className="entry-footer">© 2026 R2WMS · Together in service</footer>
  </div>;
}
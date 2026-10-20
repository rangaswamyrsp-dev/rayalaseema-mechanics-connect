import { HeartHandshake, UserRound, Wrench } from 'lucide-react';
import { translate, type Member } from './demo-store';

export function MemberCard({ member, language }: { member: Member | undefined; language: 'en' | 'te' }) {
  const tr = (text: string) => translate(text, language);
  const fields = member ? [
    ['Member reference', `DEMO-${member.id.slice(0, 8).toUpperCase()}`],
    ['Workshop', member.workshop],
    ['Occupation / Specialization', member.occupation],
    ['Phone number', member.phone],
    ['District', member.district],
    ['Mandal / Town', member.mandal],
    ['Address', member.address],
    ...(member.bloodGroup ? [['Blood group (optional)', member.bloodGroup]] : []),
  ] : [];
  return <article className="digital-card identity-card" aria-label={tr('Membership card')}>
    <div className="card-brand"><Wrench /><div><strong>R2WMS</strong><small>Rayalaseema Two-Wheeler<br />Mechanics Welfare Seva</small></div><span className="id-card-label">{tr('Membership card')}</span></div>
    <div className="card-member"><span className="card-avatar">{member?.photo ? <img src={member.photo} alt={member.name} /> : <UserRound aria-label={tr('Member photo')} />}</span><div><h3>{member?.name ?? tr('Your membership starts here')}</h3><span className={`card-status ${member?.status === 'Active' ? 'is-active' : ''}`}><span />{tr(member?.status ?? 'Not registered')}</span><p>{tr('Pending official membership number')}</p></div></div>
    <dl className="id-card-fields">{fields.map(([label, value]) => <div key={label} className={label === 'Address' ? 'id-card-address' : ''}><dt>{tr(label ?? '')}</dt><dd>{value || tr('Not provided')}</dd></div>)}</dl>
    <div className="card-bottom"><span>{language === 'te' ? 'బ్రౌజర్ డెమో • అధికారిక గుర్తింపు కాదు' : 'BROWSER-LOCAL DEMO • NOT AN OFFICIAL ID'}</span><HeartHandshake /></div>
  </article>;
}
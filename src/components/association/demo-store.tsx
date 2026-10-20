import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Member = { id: string; name: string; email: string; workshop: string; district: string; status: 'Pending review' | 'Active'; photo?: string; address?: string; phone?: string; mandal?: string; occupation?: string; bloodGroup?: string };
export type Request = { id: string; memberId: string; name: string; subject: string; detail: string; status: 'Submitted' | 'Approved' | 'Rejected'; date: string };
export type Notice = { id: string; title: string; detail: string; date: string };
export type AssociationEvent = { id: string; title: string; date: string; place: string; detail: string };
export type Training = { id: string; title: string; date: string; detail: string };
export type Offer = { id: string; title: string; partner: string; detail: string; validity: string };
export type Donor = { id: string; memberId: string; name: string; bloodGroup: string; district: string; phone: string };

type Data = {
  members: Member[];
  requests: Request[];
  notices: Notice[];
  events: AssociationEvent[];
  trainings: Training[];
  offers: Offer[];
  donors: Donor[];
  enrollments: string[];
  currentId: string | null;
  admin: boolean;
  language: 'en' | 'te';
};

const empty: Data = {
  members: [],
  requests: [],
  notices: [],
  events: [
    { id: 'ev-agm', title: 'Annual General Meeting 2026', date: '15 Nov 2026', place: 'Kurnool', detail: 'Annual meeting to discuss the society roadmap, welfare fund and new district committees.' },
    { id: 'ev-health', title: 'Free Health Check-up Camp', date: '29 Nov 2026', place: 'Anantapur', detail: 'Free health screening for members and their families.' },
  ],
  trainings: [
    { id: 'tr-ev', title: 'EV Motor & Battery Basics', date: '2 Nov 2026', detail: 'Hands-on introduction to electric two-wheeler motors, controllers and battery safety.' },
    { id: 'tr-diag', title: 'Modern Diagnostics Workshop', date: '20 Nov 2026', detail: 'Using diagnostic scanners for fuel-injection and ABS systems.' },
  ],
  offers: [
    { id: 'of-tools', title: '10% off tool kits', partner: 'Rayalaseema Tools Co.', detail: 'Show your membership card at any branch for a member discount on tool kits.', validity: 'Till 31 Dec 2026' },
    { id: 'of-oil', title: 'Engine oil combo deal', partner: 'Seva Lubricants', detail: 'Discounted engine oil combos for member workshops.', validity: 'Till 30 Nov 2026' },
  ],
  donors: [],
  enrollments: [],
  currentId: null,
  admin: false,
  language: 'en',
};

const Context = createContext<{ data: Data; update: (fn: (d: Data) => Data) => void; ready: boolean }>({ data: empty, update: () => {}, ready: false });

export function DemoProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('r2wms-demo-v1');
      if (saved) setData({ ...empty, ...JSON.parse(saved) });
    } catch {
      localStorage.removeItem('r2wms-demo-v1');
    }
    setReady(true);
  }, []);
  function update(fn: (d: Data) => Data) {
    setData(d => {
      const next = fn(d);
      localStorage.setItem('r2wms-demo-v1', JSON.stringify(next));
      return next;
    });
  }
  return <Context.Provider value={{ data, update, ready }}>{children}</Context.Provider>;
}

export const useDemo = () => useContext(Context);

export const demoMember: Member = { id: 'demo-member', name: 'Demo Member', email: '', workshop: 'Demo Workshop', district: 'Rayalaseema', status: 'Active' };

export const labels = {
  en: { home: 'Home', membership: 'Membership', welfare: 'Welfare', notices: 'Notices', profile: 'Profile', payments: 'Payments', admin: 'Administration', events: 'Events', training: 'Training', offers: 'Offers', donors: 'Blood donors', emergency: 'Emergency', welcome: 'Welcome to your community', subtitle: 'Together, we keep Rayalaseema moving.', create: 'Become a member', actions: 'Your association, at your fingertips', card: 'My membership', view: 'View membership', updates: 'Association notices', all: 'View all', help: 'Here for you. Always.', support: 'Emergency help', language: 'Language', signin: 'Demo access', overview: 'Overview' },
  te: { home: 'హోమ్', membership: 'సభ్యత్వం', welfare: 'సంక్షేమం', notices: 'ప్రకటనలు', profile: 'ప్రొఫైల్', payments: 'చెల్లింపులు', admin: 'నిర్వహణ', events: 'కార్యక్రమాలు', training: 'శిక్షణ', offers: 'ఆఫర్లు', donors: 'రక్తదాతలు', emergency: 'అత్యవసరం', welcome: 'మీ సంఘానికి స్వాగతం', subtitle: 'కలిసి రాయలసీమను ముందుకు నడిపిద్దాం.', create: 'సభ్యునిగా చేరండి', actions: 'మీ సంఘం, మీ చేతుల్లో', card: 'నా సభ్యత్వం', view: 'సభ్యత్వం చూడండి', updates: 'సంఘం ప్రకటనలు', all: 'అన్నీ చూడండి', help: 'ఎల్లప్పుడూ మీకు తోడుగా.', support: 'అత్యవసర సహాయం', language: 'భాష', signin: 'డెమో ప్రవేశం', overview: 'సారాంశం' },
};

const telugu: Record<string, string> = {
  'Member reference': 'సభ్యుని రిఫరెన్స్', 'Address': 'చిరునామా', 'Phone number': 'ఫోన్ నంబర్', 'Mandal / Town': 'మండలం / పట్టణం', 'Occupation / Specialization': 'వృత్తి / ప్రత్యేకత', 'Blood group (optional)': 'రక్త వర్గం (ఐచ్ఛికం)', 'Member photo': 'సభ్యుని ఫోటో', 'Choose photo': 'ఫోటో ఎంచుకోండి', 'Remove photo': 'ఫోటో తొలగించండి', 'Edit card details': 'కార్డు వివరాలు మార్చండి', 'Print demo card': 'డెమో కార్డు ముద్రించండి', 'Not provided': 'అందించలేదు', 'Demo reference': 'డెమో రిఫరెన్స్', 'Membership card': 'సభ్యత్వ కార్డు', 'Photo saved only on this browser.': 'ఫోటో ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ చేయబడుతుంది.', 'Choose a JPEG, PNG or WebP photo.': 'JPEG, PNG లేదా WebP ఫోటో ఎంచుకోండి.', 'Unable to read this photo. Please choose another.': 'ఈ ఫోటో చదవలేకపోయాము. మరో ఫోటో ఎంచుకోండి.', 'Create your own profile to save personal details.': 'వ్యక్తిగత వివరాలు సేవ్ చేయడానికి మీ స్వంత ప్రొఫైల్ సృష్టించండి.', 'Pending official membership number': 'అధికారిక సభ్యత్వ సంఖ్య కోసం వేచి ఉంది',
  'Full name': 'పూర్తి పేరు', 'Email address': 'ఇమెయిల్ చిరునామా', 'Workshop name': 'వర్క్‌షాప్ పేరు', 'District': 'జిల్లా', 'Select your district': 'మీ జిల్లాను ఎంచుకోండి', 'Subject': 'విషయం', 'Details': 'వివరాలు', 'Save profile': 'ప్రొఫైల్ సేవ్ చేయండి', 'Create demo profile': 'డెమో ప్రొఫైల్ సృష్టించండి', 'Open my demo profile': 'నా డెమో ప్రొఫైల్ తెరవండి', 'Leave demo access': 'డెమో నుండి నిష్క్రమించండి', 'Try member demo': 'సభ్యుని డెమో', 'Try admin demo': 'నిర్వాహకుని డెమో', 'Save demo request': 'డెమో అభ్యర్థన సేవ్ చేయండి', 'New demo request': 'కొత్త డెమో అభ్యర్థన', 'My applications': 'నా దరఖాస్తులు', 'Your digital membership': 'మీ డిజిటల్ సభ్యత్వం', 'Membership details': 'సభ్యత్వ వివరాలు', 'Name': 'పేరు', 'Workshop': 'వర్క్‌షాప్', 'Status': 'స్థితి', 'Latest notices': 'తాజా ప్రకటనలు', 'Fees & receipts': 'రుసుములు & రసీదులు', 'My profile': 'నా ప్రొఫైల్', 'Pending review': 'పరిశీలనలో ఉంది', 'Active': 'క్రియాశీలం', 'Submitted': 'సమర్పించబడింది', 'Approved': 'ఆమోదించబడింది', 'Rejected': 'తిరస్కరించబడింది', 'Not registered': 'నమోదు కాలేదు', 'Membership status': 'సభ్యత్వ స్థితి', 'My welfare requests': 'నా సంక్షేమ అభ్యర్థనలు', 'Association notices': 'సంఘం ప్రకటనలు', 'Payment records': 'చెల్లింపు వివరాలు', 'You’re all caught up': 'కొత్త ప్రకటనలు లేవు', 'No notices published yet': 'ఇంకా ప్రకటనలు లేవు', 'No payment records': 'చెల్లింపు వివరాలు లేవు', 'Your membership starts here': 'మీ సభ్యత్వం ఇక్కడ ప్రారంభమవుతుంది', 'Make yourself at home': 'మీ ప్రొఫైల్ సృష్టించండి', 'A helping hand, when you need it': 'అవసరమైనప్పుడు మీకు తోడుగా', 'Browser-only demo': 'ఈ బ్రౌజర్‌లో మాత్రమే డెమో', 'Welcome to R2WMS': 'R2WMSకు స్వాగతం', 'Join the R2WMS community': 'R2WMS సంఘంలో చేరండి', 'Help & support': 'సహాయం & మద్దతు', 'New here? Create a member profile': 'కొత్త సభ్యులా? ప్రొఫైల్ సృష్టించండి', 'Open demo access': 'డెమో ప్రవేశం', 'Create member profile': 'సభ్యుని ప్రొఫైల్ సృష్టించండి', 'Manage account': 'ఖాతా నిర్వహణ', 'Explore welfare': 'సంక్షేమం చూడండి', 'Notifications': 'నోటిఫికేషన్లు', 'Profile access': 'ప్రొఫైల్ ప్రవేశం', 'Your profile has been updated.': 'మీ ప్రొఫైల్ నవీకరించబడింది.', 'Your demo profile has been saved. Membership is pending review.': 'మీ డెమో ప్రొఫైల్ సేవ్ చేయబడింది. సభ్యత్వం పరిశీలనలో ఉంది.', 'No saved demo profile found on this browser. Create a profile first.': 'ఈ బ్రౌజర్‌లో ప్రొఫైల్ కనుగొనబడలేదు. ముందుగా ప్రొఫైల్ సృష్టించండి.', 'This email already has a demo profile. Use demo access to reopen it.': 'ఈ ఇమెయిల్‌తో ప్రొఫైల్ ఉంది. డెమో ప్రవేశం ద్వారా తెరవండి.', 'Demo request saved. This does not submit to the association.': 'డెమో అభ్యర్థన సేవ్ చేయబడింది. ఇది సంఘానికి పంపబడదు.', 'You have left demo access.': 'మీరు డెమో నుండి నిష్క్రమించారు.', 'Upcoming events': 'రాబోయే కార్యక్రమాలు', 'Training programs': 'శిక్షణా కార్యక్రమాలు', 'Member offers': 'సభ్యుల ఆఫర్లు', 'Blood donors': 'రక్తదాతలు', 'Emergency contacts': 'అత్యవసర సంప్రదింపులు', 'Register as donor': 'రక్తదాతగా నమోదు చేసుకోండి', 'Enroll': 'చేరండి', 'Enrolled': 'చేరారు', 'Sign in': 'సైన్ ఇన్', 'Register': 'నమోదు',
};

export function translate(text: string, language: 'en' | 'te') {
  return language === 'te' ? telugu[text] ?? text : text;
}

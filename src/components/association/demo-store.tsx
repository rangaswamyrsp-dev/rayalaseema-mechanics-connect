import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type Member = { id: string; name: string; email: string; workshop: string; district: string; status: 'Pending review' | 'Active' };
export type Request = { id: string; memberId: string; name: string; subject: string; detail: string; status: 'Submitted' | 'Approved' | 'Rejected'; date: string };
export type Notice = { id: string; title: string; detail: string; date: string };
type Data = { members: Member[]; requests: Request[]; notices: Notice[]; currentId: string | null; admin: boolean; language: 'en' | 'te' };
const empty: Data = { members: [], requests: [], notices: [], currentId: null, admin: false, language: 'en' };
const Context = createContext<{data: Data; update: (fn: (d: Data) => Data) => void; ready: boolean}>({data: empty, update: () => {}, ready: false});
export function DemoProvider({children}: {children: ReactNode}) {
 const [data, setData] = useState<Data>(empty); const [ready, setReady] = useState(false);
 useEffect(() => { try { const saved = localStorage.getItem('r2wms-demo-v1'); if(saved) setData({...empty, ...JSON.parse(saved)}); } catch { localStorage.removeItem('r2wms-demo-v1'); } setReady(true); }, []);
 function update(fn: (d: Data) => Data) { setData(d => { const next = fn(d); localStorage.setItem('r2wms-demo-v1', JSON.stringify(next)); return next; }); }
 return <Context.Provider value={{data, update, ready}}>{children}</Context.Provider>;
}
export const useDemo = () => useContext(Context);
export const demoMember: Member = {id: 'demo-member', name: 'Demo Member', email: '', workshop: 'Demo Workshop', district: 'Rayalaseema', status: 'Active'};
export const labels = {en: {home:'Home',membership:'Membership',welfare:'Welfare',notices:'Notices',profile:'Profile',payments:'Payments',admin:'Administration',welcome:'Welcome to your community',subtitle:'Together, we keep Rayalaseema moving.',create:'Become a member',actions:'Your association, at your fingertips',card:'My membership',view:'View membership',updates:'Association notices',all:'View all',help:'Here for you. Always.',support:'Emergency help',language:'Language',signin:'Demo access',overview:'Overview'},te: {home:'హోమ్',membership:'సభ్యత్వం',welfare:'సంక్షేమం',notices:'ప్రకటనలు',profile:'ప్రొఫైల్',payments:'చెల్లింపులు',admin:'నిర్వహణ',welcome:'మీ సంఘానికి స్వాగతం',subtitle:'కలిసి రాయలసీమను ముందుకు నడిపిద్దాం.',create:'సభ్యునిగా చేరండి',actions:'మీ సంఘం, మీ చేతుల్లో',card:'నా సభ్యత్వం',view:'సభ్యత్వం చూడండి',updates:'సంఘం ప్రకటనలు',all:'అన్నీ చూడండి',help:'ఎల్లప్పుడూ మీకు తోడుగా.',support:'అత్యవసర సహాయం',language:'భాష',signin:'డెమో ప్రవేశం',overview:'సారాంశం'}};

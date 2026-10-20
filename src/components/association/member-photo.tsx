import { useRef, useState } from 'react';
import { ImagePlus, UserRound, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translate } from './demo-store';

// A local demo image is resized before saving; no file is uploaded to a server.
export function MemberPhoto({ value, onChange, language }: { value?: string; onChange: (value: string) => void; language: 'en' | 'te' }) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const tr = (text: string) => translate(text, language);
  async function choose(file?: File) {
    if (!file) return;
    setError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setError(tr('Choose a JPEG, PNG or WebP photo.')); return; }
    setBusy(true);
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = 240; canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');
      const ratio = Math.max(240 / image.width, 300 / image.height);
      ctx.drawImage(image, (240 - image.width * ratio) / 2, (300 - image.height * ratio) / 2, image.width * ratio, image.height * ratio);
      onChange(canvas.toDataURL('image/jpeg', 0.82));
    } catch { setError(tr('Unable to read this photo. Please choose another.')); }
    finally { URL.revokeObjectURL(url); setBusy(false); if (input.current) input.current.value = ''; }
  }
  return <div className="member-photo-editor"><span className="profile-photo">{value ? <img src={value} alt={tr('Member photo')} /> : <UserRound />}</span><div><strong>{tr('Member photo')}</strong><div className="photo-actions"><Button type="button" variant="outline" disabled={busy} onClick={() => input.current?.click()}><ImagePlus />{tr('Choose photo')}</Button>{value && <Button type="button" variant="ghost" size="icon" aria-label={tr('Remove photo')} title={tr('Remove photo')} onClick={() => onChange('')}><X /></Button>}</div><p>{tr('Photo saved only on this browser.')}</p>{error && <p role="alert" className="photo-error">{error}</p>}</div><input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label={tr('Member photo')} hidden onChange={e => { void choose(e.target.files?.[0]); }} /></div>;
}
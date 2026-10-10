import { useState, useEffect } from 'react';
import { translations, type Language } from './translations';

const STORAGE_KEY = 'r2wms-language';

export function useI18n() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language;
    if (saved && (saved === 'en' || saved === 'te')) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[lang];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return { lang, changeLanguage, t };
}

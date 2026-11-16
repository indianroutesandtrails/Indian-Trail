'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { t } from '@/data/translations';

const STORAGE_KEY = 'ir_lang';
const SUPPORTED   = ['en', 'es'];

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: () => '' });

export function LanguageProvider({ children }) {
  // Always start with 'en' on the server so SSR and initial client render match.
  const [lang, setLangState] = useState('en');

  // After mount, read localStorage and correct the language if needed.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) setLangState(stored);
    } catch {
      // localStorage unavailable (private browsing quirks, etc.)
    }
  }, []);

  const setLang = (l) => {
    if (!SUPPORTED.includes(l)) return;
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  };

  const translate = (key) => t(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

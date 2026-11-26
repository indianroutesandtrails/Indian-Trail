'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { t as tFn } from '@/data/translations';

const STORAGE_KEY = 'ir_lang';
const SUPPORTED   = ['en', 'es'];

const LanguageContext = createContext({
  lang:        'en',
  setLang:     () => {},
  toggleLocale: () => {},
  t:           () => '',
  localized:   (v) => v,
});

export function LanguageProvider({ children }) {
  // Always start with 'en' on server so SSR + first client render match (no hydration mismatch)
  const [lang, setLangState] = useState('en');

  // After mount, read localStorage and correct if needed
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) setLangState(stored);
    } catch { /* localStorage unavailable */ }
  }, []);

  // Update <html lang> attribute reactively
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l) => {
    if (!SUPPORTED.includes(l)) return;
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const toggleLocale = useCallback(() => {
    setLang(lang === 'en' ? 'es' : 'en');
  }, [lang, setLang]);

  /**
   * t(key) — translate a dot-notation UI key
   * e.g. t('common.days') → 'Días' (es) / 'Days' (en)
   */
  const translate = useCallback((key) => tFn(lang, key), [lang]);

  /**
   * localized(value) — pick the right language from a {en, es} object,
   * or return value as-is if it's a plain string.
   * e.g. localized({ en: 'Holi', es: 'Holi' }) → 'Holi'
   *      localized('Holi') → 'Holi'
   */
  const localized = useCallback((value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object' && !Array.isArray(value)) {
      return value[lang] ?? value['en'] ?? '';
    }
    return value;
  }, [lang]);

  const ctx = useMemo(
    () => ({ lang, setLang, toggleLocale, t: translate, localized }),
    [lang, setLang, toggleLocale, translate, localized],
  );

  return (
    <LanguageContext.Provider value={ctx}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

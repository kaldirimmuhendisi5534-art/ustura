import React, { createContext, useContext, useState } from 'react';
import { T, LANGUAGES } from '../constants/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr');
  const t = (key) => T[lang]?.[key] ?? T.tr[key] ?? key;
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

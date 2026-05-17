import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './locales/he.json';
import en from './locales/en.json';
import type { Locale } from '../routing';

const resources = {
  he: { translation: he },
  en: { translation: en },
};

export function initI18n(locale: Locale) {
  if (i18n.isInitialized) {
    void i18n.changeLanguage(locale);
    return i18n;
  }

  void i18n.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'he',
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export { i18n };

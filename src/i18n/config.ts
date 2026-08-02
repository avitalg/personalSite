import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
};

export function initI18n() {
  if (i18n.isInitialized) {
    return i18n;
  }

  void i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export { i18n };

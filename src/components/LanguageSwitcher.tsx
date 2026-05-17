import { useTranslation } from 'react-i18next';
import type { Locale } from '../routing';

type LanguageSwitcherProps = {
  locale: Locale;
  onSwitch: (locale: Locale) => void;
};

export function LanguageSwitcher({ locale, onSwitch }: LanguageSwitcherProps) {
  const { t } = useTranslation();

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-switcher__btn ${locale === 'he' ? 'lang-switcher__btn--active' : ''}`}
        onClick={() => onSwitch('he')}
        aria-pressed={locale === 'he'}
        aria-label={t('nav.switchToHe')}
      >
        {t('nav.langHe')}
      </button>
      <button
        type="button"
        className={`lang-switcher__btn ${locale === 'en' ? 'lang-switcher__btn--active' : ''}`}
        onClick={() => onSwitch('en')}
        aria-pressed={locale === 'en'}
        aria-label={t('nav.switchToEn')}
      >
        {t('nav.langEn')}
      </button>
    </div>
  );
}

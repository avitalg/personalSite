import { useTranslation } from 'react-i18next';
import { ContactFormWrapper } from './contact-form-wrapper';
import { ClientOnly } from './components/ClientOnly';
import { pagePath } from './routing';

type PhotographyPageProps = {
  onGoHome: () => void;
};

const serviceKeys = ['catalog', 'brand', 'lifestyle', 'studio', 'ecommerce', 'retouch'] as const;
const serviceIcons: Record<(typeof serviceKeys)[number], string> = {
  catalog: '📸',
  brand: '🏢',
  lifestyle: '🌿',
  studio: '🎞️',
  ecommerce: '🛒',
  retouch: '✨',
};

const stepKeys = ['brief', 'plan', 'shoot', 'delivery'] as const;
const stepIcons: Record<(typeof stepKeys)[number], string> = {
  brief: '1️⃣',
  plan: '2️⃣',
  shoot: '3️⃣',
  delivery: '4️⃣',
};

const packageKeys = ['compact', 'signature', 'premium'] as const;
const packageIcons: Record<(typeof packageKeys)[number], string> = {
  compact: '🟦',
  signature: '🟣',
  premium: '🟩',
};

const mobileTags = [
  { key: 'mobileEvents' as const, icon: '📦' },
  { key: 'mobileCouples' as const, icon: '📋' },
  { key: 'mobileKids' as const, icon: '✨' },
  { key: 'mobileBusiness' as const, icon: '🛒' },
];

export function PhotographyPage({ onGoHome }: PhotographyPageProps) {
  const { t } = useTranslation();

  return (
    <div className="photography-page">
      <header className="photo-topbar">
        <a
          className="photo-topbar__brand"
          href={pagePath('home')}
          onClick={
            onGoHome
              ? (e) => {
                  e.preventDefault();
                  onGoHome();
                }
              : undefined
          }
        >
          <span className="logo-text">Avital</span>
          <span className="logo-accent">Glazer</span>
        </a>
      </header>

      <section className="hero photography-hero" aria-label={t('hero.ariaLabel')}>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="photography-hero-title">{t('photo.heroTitle')}</span>
            </h1>
            <h2 className="hero-secondary-title">{t('photo.heroSubtitle')}</h2>
            <p className="hero-subtitle">{t('photo.heroText')}</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary btn-large">
                {t('photo.ctaBook')}
              </a>
              <a href="#photography-services" className="btn-secondary btn-large">
                {t('photo.ctaServices')}
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="floating-card card-1">
              <div className="card-content">📷</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-content">💞</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-content">✨</div>
            </div>
          </div>

          <div className="hero-mobile-content fade-in-up">
            <div className="tech-stack-mobile">
              {mobileTags.map(({ key, icon }) => (
                <div key={key} className="tech-item-mobile">
                  <span className="tech-icon">{icon}</span>
                  <span className="tech-name">{t(`photo.${key}`)}</span>
                </div>
              ))}
            </div>
            <div className="hero-stats-mobile">
              <div className="stat-mobile">
                <div className="stat-number-mobile">24h</div>
                <div className="stat-label-mobile">{t('photo.statResponse')}</div>
              </div>
              <div className="stat-mobile">
                <div className="stat-number-mobile">Pro</div>
                <div className="stat-label-mobile">{t('photo.statPro')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="photography-services" className="services" aria-labelledby="photo-services-heading">
        <div className="container">
          <h2 id="photo-services-heading" className="section-title">
            {t('photo.servicesTitle')}
          </h2>
          <p className="section-subtitle">{t('photo.servicesSubtitle')}</p>

          <div className="services-grid" role="list">
            {serviceKeys.map((key, index) => (
              <article
                key={key}
                className="service-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="service-icon" aria-hidden="true">
                  {serviceIcons[key]}
                </div>
                <h3 className="service-title">{t(`photo.serviceItems.${key}.title`)}</h3>
                <p className="service-description">{t(`photo.serviceItems.${key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about photography-about" id="photo-process" aria-labelledby="photo-process-heading">
        <div className="container">
          <h2 id="photo-process-heading" className="section-title">
            {t('photo.processTitle')}
          </h2>
          <p className="section-subtitle">{t('photo.processSubtitle')}</p>

          <div className="services-grid" role="list">
            {stepKeys.map((key, index) => (
              <article
                key={key}
                className="service-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="service-icon" aria-hidden="true">
                  {stepIcons[key]}
                </div>
                <h3 className="service-title">{t(`photo.steps.${key}.title`)}</h3>
                <p className="service-description">{t(`photo.steps.${key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services" aria-labelledby="photo-packages-heading">
        <div className="container">
          <h2 id="photo-packages-heading" className="section-title">
            {t('photo.packagesTitle')}
          </h2>
          <p className="section-subtitle">{t('photo.packagesSubtitle')}</p>

          <div className="services-grid" role="list">
            {packageKeys.map((key, index) => (
              <article
                key={key}
                className="service-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="service-icon" aria-hidden="true">
                  {packageIcons[key]}
                </div>
                <h3 className="service-title">{t(`photo.packages.${key}.title`)}</h3>
                <p className="service-description">{t(`photo.packages.${key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact" aria-labelledby="photography-contact-heading">
        <div className="container">
          <h2 id="photography-contact-heading" className="section-title">
            {t('photo.contactTitle')}
          </h2>
          <p className="section-subtitle">{t('photo.contactSubtitle')}</p>

          <div className="contact-form-container fade-in-up">
            <ClientOnly
              fallback={
                <p className="contact-ssr-fallback">
                  <a href="mailto:avitalglazer@gmail.com">avitalglazer@gmail.com</a>
                </p>
              }
            >
              <ContactFormWrapper />
            </ClientOnly>

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  💬
                </div>
                <div>
                  <h4>{t('contact.connect')}</h4>
                  <p>{t('photo.contactAvailable')}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  📷
                </div>
                <div>
                  <h4>{t('about.instagram')}</h4>
                  <p>
                    <a
                      href="https://www.instagram.com/avitalg_photography/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                      aria-label={t('about.instagramAria')}
                    >
                      @avitalg_photography
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactFormWrapper } from './contact-form-wrapper';
import { PhotographyPage } from './photography-page';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SeoHead } from './components/SeoHead';
import { useRoute } from './hooks/useRoute';
import { localePath } from './routing';
import './App.css';

const homeSectionIds = ['home', 'about', 'services', 'contact'] as const;

const serviceKeys = ['web', 'perf', 'uiux', 'api', 'ai', 'testing'] as const;
const serviceIcons: Record<(typeof serviceKeys)[number], string> = {
  web: '💻',
  perf: '⚡',
  uiux: '🎨',
  api: '🔧',
  ai: '🤖',
  testing: '✅',
};

const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'Figma', 'UI/UX', 'AI Integration', 'Git', 'CI/CD'];

function App() {
  const { t } = useTranslation();
  const { route, isHome, isPhotography, navigate, switchLocale, goHomeSection, scrollToSection } = useRoute();
  const { locale } = route;

  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = (entry.target as HTMLElement).id;
            if (!targetId) return;
            setIsVisible((prev) => ({ ...prev, [targetId]: true }));
            setActiveSection(targetId);
          }
        });
      },
      { threshold: 0.1 }
    );

    homeSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.replace('#', '');
    if (!hash || !homeSectionIds.includes(hash as (typeof homeSectionIds)[number])) return;
    setTimeout(() => {
      scrollToSection(hash);
      setIsMobileMenuOpen(false);
    }, 0);
  }, [isHome, scrollToSection]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNav = (sectionId: string) => {
    goHomeSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const homeBase = localePath(locale, 'home');

  return (
    <div className="app">
      <SeoHead locale={locale} page={route.page} />

      {!isPhotography && (
        <header>
          <nav className="navbar" aria-label={t('nav.mainNav')}>
            <div className="nav-container">
              <div
                className="logo"
                onClick={() => handleNav('home')}
                role="button"
                aria-label={t('nav.goHome')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNav('home');
                }}
              >
                <span className="logo-text">Avital</span>
                <span className="logo-accent">Glazer</span>
              </div>
              <button
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <li>
                  <a
                    href={`${homeBase}#home`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('home');
                    }}
                    className={isHome && activeSection === 'home' ? 'active' : ''}
                  >
                    {t('nav.home')}
                  </a>
                </li>
                <li>
                  <a
                    href={`${homeBase}#about`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('about');
                    }}
                    className={isHome && activeSection === 'about' ? 'active' : ''}
                  >
                    {t('nav.about')}
                  </a>
                </li>
                <li>
                  <a
                    href={`${homeBase}#services`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('services');
                    }}
                    className={isHome && activeSection === 'services' ? 'active' : ''}
                  >
                    {t('nav.services')}
                  </a>
                </li>
                <li>
                  <a
                    href={isPhotography ? '#contact' : `${homeBase}#contact`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('contact');
                    }}
                    className={isHome && activeSection === 'contact' ? 'active' : ''}
                  >
                    {t('nav.contact')}
                  </a>
                </li>
                <li>
                  <a
                    href={localePath(locale, 'photography')}
                    className={isPhotography ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(locale, 'photography');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t('nav.photography')}
                  </a>
                </li>
                <li className="nav-lang">
                  <LanguageSwitcher locale={locale} onSwitch={switchLocale} />
                </li>
              </ul>
            </div>
          </nav>
        </header>
      )}

      <main>
        {isHome ? (
          <>
            <section id="home" className="hero" aria-label={t('hero.ariaLabel')}>
              <div className="hero-content">
                <div className={`hero-text ${isVisible['home'] ? 'fade-in-up' : ''}`}>
                  <h1 className="hero-title">
                    {t('hero.titleLine1')}
                    <br />
                    <span className="hero-title-accent">{t('hero.titleLine2')}</span>
                  </h1>
                  <p className="hero-subtitle">{t('hero.subtitle')}</p>
                  <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => handleNav('contact')}>
                      {t('hero.ctaPrimary')}
                    </button>
                    <button className="btn-secondary" onClick={() => handleNav('about')}>
                      {t('hero.ctaSecondary')}
                    </button>
                  </div>
                </div>
                <div className={`hero-visual ${isVisible['home'] ? 'fade-in-right' : ''}`} aria-hidden="true">
                  <div className="floating-card card-1">
                    <div className="card-content">⚡</div>
                  </div>
                  <div className="floating-card card-2">
                    <div className="card-content">💻</div>
                  </div>
                  <div className="floating-card card-3">
                    <div className="card-content">🚀</div>
                  </div>
                </div>
                <div className={`hero-mobile-content ${isVisible['home'] ? 'fade-in-up' : ''}`}>
                  <div className="tech-stack-mobile">
                    <div className="tech-item-mobile">
                      <span className="tech-icon">⚛️</span>
                      <span className="tech-name">React</span>
                    </div>
                    <div className="tech-item-mobile">
                      <span className="tech-icon">📘</span>
                      <span className="tech-name">TypeScript</span>
                    </div>
                    <div className="tech-item-mobile">
                      <span className="tech-icon">🤖</span>
                      <span className="tech-name">AI</span>
                    </div>
                    <div className="tech-item-mobile">
                      <span className="tech-icon">⚡</span>
                      <span className="tech-name">Node.js</span>
                    </div>
                  </div>
                  <div className="hero-stats-mobile">
                    <div className="stat-mobile">
                      <div className="stat-number-mobile">8+</div>
                      <div className="stat-label-mobile">{t('hero.years')}</div>
                    </div>
                    <div className="stat-mobile">
                      <div className="stat-number-mobile">100+</div>
                      <div className="stat-label-mobile">{t('hero.projects')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scroll-indicator" aria-hidden="true">
                <div className="mouse"></div>
              </div>
            </section>

            <section id="about" className="about" aria-labelledby="about-heading">
              <div className="container">
                <header className={`about-header ${isVisible['about'] ? 'fade-in-up' : ''}`}>
                  <h2 id="about-heading" className="section-title">
                    {t('about.title')}
                  </h2>
                  <p className="section-subtitle about-subtitle">{t('about.subtitle')}</p>
                </header>

                <article className={`about-panel ${isVisible['about'] ? 'fade-in-up' : ''}`}>
                  <div className="about-block">
                    <p className="about-lead">{t('about.lead')}</p>
                    <p className="about-detail">{t('about.detail')}</p>
                  </div>

                  <div className="about-block">
                    <h3 className="about-block-label">{t('about.skillsLabel')}</h3>
                    <ul className="about-skills" aria-label={t('about.skillsAria')}>
                      {skills.map((skill) => (
                        <li key={skill}>
                          <span className="skill-tag">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="about-block about-block--photography">
                    <div className="about-photography-copy">
                      <h3 className="about-photography-title">{t('about.photoTitle')}</h3>
                      <p className="about-photography-text">{t('about.photoText')}</p>
                    </div>
                    <div className="about-photography-actions">
                      <button
                        type="button"
                        className="about-btn about-btn--primary"
                        onClick={() => navigate(locale, 'photography')}
                      >
                        {t('about.viewPortfolio')}
                      </button>
                      <a
                        href="https://www.instagram.com/avitalg_photography/"
                        className="about-btn about-btn--outline"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('about.instagramAria')}
                      >
                        {t('about.instagram')}
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section id="services" className="services" aria-labelledby="services-heading">
              <div className="container">
                <h2 id="services-heading" className={`section-title ${isVisible['services'] ? 'fade-in-up' : ''}`}>
                  {t('services.title')}
                </h2>
                <p className={`section-subtitle ${isVisible['services'] ? 'fade-in-up' : ''}`}>
                  {t('services.subtitle')}
                </p>
                <div className="services-grid" role="list">
                  {serviceKeys.map((key, index) => (
                    <article
                      key={key}
                      className={`service-card ${isVisible['services'] ? 'fade-in-up' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      role="listitem"
                    >
                      <div className="service-icon" aria-hidden="true">
                        {serviceIcons[key]}
                      </div>
                      <h3 className="service-title">{t(`services.items.${key}.title`)}</h3>
                      <p className="service-description">{t(`services.items.${key}.description`)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="contact" className="contact" aria-labelledby="contact-heading">
              <div className="container">
                <h2 id="contact-heading" className={`section-title ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  {t('contact.title')}
                </h2>
                <p className={`section-subtitle ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  {t('contact.subtitle')}
                </p>
                <div className={`contact-form-container ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  <ContactFormWrapper />
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="contact-icon">💬</div>
                      <div>
                        <h4>{t('contact.connect')}</h4>
                        <p>{t('contact.available')}</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">🔗</div>
                      <div>
                        <h4>{t('contact.linkedin')}</h4>
                        <p>
                          <a
                            href="https://www.linkedin.com/in/avital-glazer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                          >
                            {t('contact.linkedinCta')}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <PhotographyPage
            locale={locale}
            onSwitchLocale={switchLocale}
            onGoHome={() => navigate(locale, 'home')}
          />
        )}
      </main>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}

export { App };

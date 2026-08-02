import { useState, useEffect, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactFormWrapper } from './contact-form-wrapper';
import { PhotographyPage } from './photography-page';
import { PortfolioCasePage } from './portfolio-case-page';
import { ClientOnly } from './components/ClientOnly';
import { getPortfolioCase, listPortfolioCases } from './portfolio/cases';
import { pagePath, type PageKind } from './routing';

const homeSectionIds = ['home', 'about', 'services', 'portfolio', 'contact'] as const;

const serviceKeys = [
  'productAnalytics',
  'dashboards',
  'experiments',
  'sqlPython',
  'tracking',
  'dataQuality',
  'mixpanel',
  'consulting',
  'mentoring',
] as const;
const serviceIcons: Record<(typeof serviceKeys)[number], string> = {
  productAnalytics: '📊',
  dashboards: '📈',
  experiments: '🧪',
  sqlPython: '🧮',
  tracking: '📡',
  dataQuality: '🧱',
  mixpanel: '🧭',
  consulting: '💡',
  mentoring: '🎓',
};

const heroTechKeys = ['sql', 'python', 'dashboards', 'experiments', 'aiTools'] as const;
const heroTechIcons: Record<(typeof heroTechKeys)[number], string> = {
  sql: '🧮',
  python: '🐍',
  dashboards: '📈',
  experiments: '🧪',
  aiTools: '✨',
};

export type SiteAppProps = {
  page: PageKind;
  slug?: string;
  onNavigate?: (page: PageKind, hashOrSlug?: string) => void;
  onGoHomeSection?: (sectionId: string) => void;
};

export function SiteApp({ page, slug, onNavigate, onGoHomeSection }: SiteAppProps) {
  const { t } = useTranslation();
  const isHome = page === 'home';
  const isPhotography = page === 'photography';
  const isPortfolioCase = page === 'portfolioCase';
  const caseStudy = isPortfolioCase ? getPortfolioCase(slug) : undefined;
  const cases = listPortfolioCases();
  const skills = t('about.skillTags', { returnObjects: true }) as string[];
  const aboutHighlights = t('about.detail')
    .split('·')
    .map((item) => item.trim())
    .filter(Boolean);

  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const homeBase = pagePath('home');

  const handleNav = (sectionId: string) => {
    if (onGoHomeSection) {
      onGoHomeSection(sectionId);
    } else {
      window.location.href = `${homeBase}#${sectionId}`;
    }
    setIsMobileMenuOpen(false);
  };

  const handlePhotographyNav = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('photography');
      setIsMobileMenuOpen(false);
    }
  };

  const openCase = (caseSlug: string, e?: React.MouseEvent) => {
    if (onNavigate) {
      e?.preventDefault();
      onNavigate('portfolioCase', caseSlug);
      setIsMobileMenuOpen(false);
    }
  };

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
    if (!isHome || !onGoHomeSection) return;
    const hash = window.location.hash.replace('#', '');
    if (!hash || !homeSectionIds.includes(hash as (typeof homeSectionIds)[number])) return;
    setTimeout(() => {
      onGoHomeSection(hash);
      setIsMobileMenuOpen(false);
    }, 0);
  }, [isHome, onGoHomeSection]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const contactFallback = (
    <p className="contact-ssr-fallback">
      <a href="mailto:avitalglazer@gmail.com">avitalglazer@gmail.com</a>
    </p>
  );

  const showMainNav = isHome;

  return (
    <div className="app">
      {showMainNav && (
        <header>
          <nav className="navbar" aria-label={t('nav.mainNav')}>
            <div className="nav-container">
              <a className="logo" href={homeBase} aria-label={t('nav.goHome')}>
                <span className="logo-text">Avital</span>
                <span className="logo-accent">Glazer</span>
              </a>
              <button
                type="button"
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
                {(
                  [
                    ['home', t('nav.home')],
                    ['about', t('nav.about')],
                    ['services', t('nav.services')],
                    ['portfolio', t('nav.portfolio')],
                    ['contact', t('nav.contact')],
                  ] as const
                ).map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`${homeBase}#${id}`}
                      onClick={(e) => {
                        if (onGoHomeSection) {
                          e.preventDefault();
                          handleNav(id);
                        }
                      }}
                      className={isHome && activeSection === id ? 'active' : ''}
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={pagePath('photography')}
                    onClick={onNavigate ? handlePhotographyNav : undefined}
                    className={isPhotography ? 'active' : ''}
                  >
                    {t('nav.photography')}
                  </a>
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
                    <a className="btn-primary" href={`${homeBase}#contact`}>
                      {t('hero.ctaPrimary')}
                    </a>
                    <a className="btn-secondary" href={`${homeBase}#about`}>
                      {t('hero.ctaSecondary')}
                    </a>
                  </div>
                </div>
                <div className={`hero-mobile-content ${isVisible['home'] ? 'fade-in-up' : ''}`}>
                  <ul className="tech-stack-mobile" aria-label={t('hero.techAria')}>
                    {heroTechKeys.map((key, index) => (
                      <li
                        key={key}
                        className="tech-item-mobile"
                        style={{ '--tech-i': index } as CSSProperties}
                      >
                        <span className="tech-icon" aria-hidden="true">
                          {heroTechIcons[key]}
                        </span>
                        <span className="tech-name">{t(`hero.tech.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                  <div className="about-grid">
                    <div className="about-main">
                      <p className="about-lead">{t('about.lead')}</p>
                      <ul className="about-highlights" aria-label={t('about.highlightsAria')}>
                        {aboutHighlights.map((item) => (
                          <li key={item} className="about-highlight">
                            <span className="about-highlight__dot" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <aside className="about-aside">
                      <div className="about-experience-card" aria-label={t('hero.years')}>
                        <span className="about-experience-card__value">8+</span>
                        <span className="about-experience-card__label">{t('hero.years')}</span>
                      </div>

                      <div className="about-skills-card">
                        <h3 className="about-block-label">{t('about.skillsLabel')}</h3>
                        <ul className="about-skills" aria-label={t('about.skillsAria')}>
                          {skills.map((skill) => (
                            <li key={skill}>
                              <span className="skill-tag">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>
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

            <section id="portfolio" className="projects portfolio" aria-labelledby="portfolio-heading">
              <div className="container">
                <h2 id="portfolio-heading" className={`section-title ${isVisible['portfolio'] ? 'fade-in-up' : ''}`}>
                  {t('portfolio.title')}
                </h2>
                <div className="projects-grid" role="list">
                  {cases.map((item, index) => (
                    <article
                      key={item.slug}
                      className={`project-card ${isVisible['portfolio'] ? 'fade-in-up' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      role="listitem"
                    >
                      <div className="project-header">
                        <h3 className="project-title">{item.title}</h3>
                        <p className="project-tech">{item.tech.join(' · ')}</p>
                      </div>
                      <p className="project-description">{item.summary}</p>
                      <div className="project-links">
                        <a
                          className="project-link"
                          href={pagePath('portfolioCase', item.slug)}
                          onClick={(e) => openCase(item.slug, e)}
                        >
                          {t('portfolio.readCase')}
                        </a>
                      </div>
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
                <div className={`contact-intro ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  {(t('contact.intro', { returnObjects: true }) as string[]).map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
                <div className={`contact-form-container ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  <ClientOnly fallback={contactFallback}>
                    <ContactFormWrapper />
                  </ClientOnly>
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
        ) : isPhotography ? (
          <PhotographyPage
            onGoHome={() => {
              if (onNavigate) onNavigate('home');
              else window.location.href = homeBase;
            }}
          />
        ) : caseStudy ? (
          <PortfolioCasePage
            caseStudy={caseStudy}
            onGoHome={() => {
              if (onNavigate) onNavigate('home');
              else window.location.href = homeBase;
            }}
            onGoPortfolio={() => {
              if (onGoHomeSection) onGoHomeSection('portfolio');
              else if (onNavigate) onNavigate('home', 'portfolio');
              else window.location.href = `${homeBase}#portfolio`;
            }}
          />
        ) : (
          <div className="container case-not-found">
            <h1>Case study not found</h1>
            <p>
              <a href={homeBase}>Back to home</a>
            </p>
          </div>
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

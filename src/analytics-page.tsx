import type { CSSProperties, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactFormWrapper } from './contact-form-wrapper';
import { ClientOnly } from './components/ClientOnly';
import { listFeaturedPortfolioCases } from './portfolio/cases';
import { pagePath } from './routing';

type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  about: string;
  points: string[];
};

type AnalyticsPageProps = {
  onGoHome: () => void;
  onOpenCase?: (slug: string, event: MouseEvent<HTMLAnchorElement>) => void;
};

const chipKeys = ['sql', 'python', 'tableau', 'pandas', 'etl'] as const;
const chipIcons: Record<(typeof chipKeys)[number], string> = {
  sql: '🗄️',
  python: '🐍',
  tableau: '📊',
  pandas: '🐼',
  etl: '🔄',
};

export function AnalyticsPage({ onGoHome, onOpenCase }: AnalyticsPageProps) {
  const { t } = useTranslation();
  const cases = listFeaturedPortfolioCases();
  const skills = t('analytics.skillTags', { returnObjects: true }) as string[];
  const education = t('about.education', { returnObjects: true }) as string[];
  const experience = t('experience.items', { returnObjects: true }) as ExperienceItem[];
  const contactIntro = t('analytics.contactIntro', { returnObjects: true }) as string[];

  return (
    <div className="analytics-page">
      <header className="case-topbar">
        <a
          className="case-topbar__brand"
          href={pagePath('home')}
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }}
        >
          <span className="logo-text">Avital</span>
          <span className="logo-accent">Glazer</span>
        </a>
        <nav className="case-topbar__nav analytics-topbar__nav" aria-label={t('nav.mainNav')}>
          <a href="#portfolio">{t('nav.portfolio')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
      </header>

      <section className="hero" aria-label={t('analytics.heroAria')}>
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <h1 className="hero-title">
              {t('analytics.heroTitleLine1')}
              <br />
              <span className="hero-title-accent">{t('analytics.heroTitleLine2')}</span>
            </h1>
            <p className="hero-subtitle">{t('analytics.heroSubtitle')}</p>
            <div className="hero-buttons">
              <a className="btn-primary" href="#contact">
                {t('analytics.ctaContact')}
              </a>
              <a className="btn-secondary" href="#portfolio">
                {t('analytics.ctaPortfolio')}
              </a>
            </div>
          </div>
          <div className="hero-mobile-content fade-in-up">
            <ul className="tech-stack-mobile" aria-label={t('analytics.chipsAria')}>
              {chipKeys.map((key, index) => (
                <li key={key} className="tech-item-mobile" style={{ '--tech-i': index } as CSSProperties}>
                  <span className="tech-icon" aria-hidden="true">
                    {chipIcons[key]}
                  </span>
                  <span className="tech-name">{t(`analytics.chips.${key}`)}</span>
                </li>
              ))}
            </ul>
            <div className="hero-stats-mobile">
              <div className="stat-mobile">
                <div className="stat-number-mobile">{t('analytics.statDegree')}</div>
                <div className="stat-label-mobile">{t('analytics.statDegreeLabel')}</div>
              </div>
              <div className="stat-mobile">
                <div className="stat-number-mobile">8</div>
                <div className="stat-label-mobile">{t('hero.years')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about" aria-labelledby="analytics-about-heading">
        <div className="container">
          <header className="about-header fade-in-up">
            <h2 id="analytics-about-heading" className="section-title">
              {t('analytics.aboutTitle')}
            </h2>
            <p className="section-subtitle about-subtitle">{t('analytics.aboutSubtitle')}</p>
          </header>
          <div className="about-body fade-in-up">
            <div className="about-copy">
              <p className="about-lead">{t('analytics.aboutLead')}</p>
              <div className="about-meta">
                <div className="about-meta__group">
                  <h3 className="about-meta__label">{t('about.educationLabel')}</h3>
                  <ul className="about-meta__list">
                    {education.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <aside className="about-aside">
              <div className="about-skills-block">
                <h3 className="about-meta__label">{t('about.skillsLabel')}</h3>
                <ul className="about-skills" aria-label={t('analytics.skillsAria')}>
                  {skills.map((skill) => (
                    <li key={skill}>
                      <span className="skill-tag">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="experience" className="experience" aria-labelledby="analytics-experience-heading">
        <div className="container">
          <header className="about-header fade-in-up">
            <h2 id="analytics-experience-heading" className="section-title">
              {t('experience.title')}
            </h2>
            <p className="section-subtitle about-subtitle">{t('experience.subtitle')}</p>
          </header>
          <div className="experience-timeline">
            {experience.map((job) => (
              <article key={job.company} className="experience-item fade-in-up">
                <div className="experience-content">
                  <div className="experience-header">
                    <div>
                      <h3 className="experience-role">{job.role}</h3>
                      <p className="experience-company">{job.company}</p>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-period">{job.period}</span>
                    </div>
                  </div>
                  <p className="experience-description">{job.about}</p>
                  <ul className="experience-points">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="experience-connector" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="projects portfolio" aria-labelledby="analytics-portfolio-heading">
        <div className="container">
          <h2 id="analytics-portfolio-heading" className="section-title fade-in-up">
            {t('portfolio.title')}
          </h2>
          <p className="section-subtitle fade-in-up">{t('analytics.portfolioSubtitle')}</p>
          <div className="projects-grid" role="list">
            {cases.map((item, index) => (
              <article
                key={item.slug}
                className="project-card fade-in-up"
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
                    onClick={(e) => onOpenCase?.(item.slug, e)}
                  >
                    {t('portfolio.readCase')}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact" aria-labelledby="analytics-contact-heading">
        <div className="container">
          <h2 id="analytics-contact-heading" className="section-title fade-in-up">
            {t('analytics.contactTitle')}
          </h2>
          <div className="contact-intro fade-in-up">
            {contactIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
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
                  <p>{t('analytics.contactAvailable')}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  🔗
                </div>
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
    </div>
  );
}

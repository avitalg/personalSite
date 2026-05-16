import { useState, useEffect } from 'react';
import { ContactFormWrapper } from './contact-form-wrapper';
import { PhotographyPage } from './photography-page';
import './App.css';

const homeSectionIds = ['home', 'about', 'services', 'contact'] as const;

function App() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);

  const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const isHomeRoute = normalizedPathname === '/';
  const isPhotographyRoute = normalizedPathname === '/photography';

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!isHomeRoute) return;

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

    const sections = homeSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomeRoute]);

  useEffect(() => {
    if (!isHomeRoute) return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    if (!homeSectionIds.includes(hash as (typeof homeSectionIds)[number])) return;

    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }, 0);
  }, [isHomeRoute]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }

  const navigateToSection = (id: string) => {
    if (id === 'contact' && isPhotographyRoute) {
      scrollToSection(id);
      return;
    }

    if (isHomeRoute) {
      scrollToSection(id);
      return;
    }

    window.location.href = `/#${id}`;
  };

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Modern, responsive websites built with React, TypeScript, and cutting-edge technologies.',
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Speed up your applications with advanced optimization techniques and best practices.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love to interact with.',
    },
    {
      icon: '🔧',
      title: 'API Development',
      description: 'Robust backend services and RESTful APIs built for scale and reliability.',
    },
    {
      icon: '🤖',
      title: 'AI Integration',
      description:
        'AI implemented in code. Integrating AI APIs and frameworks directly into applications to add intelligent features and capabilities.',
    },
    {
      icon: '✅',
      title: 'Testing',
      description:
        'Comprehensive testing strategies including unit tests, integration tests, and end-to-end testing. Ensuring code quality, reliability, and cross-browser compatibility.',
    },
  ];

  const skills = [
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'JavaScript',
    'Figma',
    'UI/UX',
    'AI Integration',
    'Git',
    'CI/CD',
  ];

  const navigateToPhotography = () => {
    setIsMobileMenuOpen(false);
    window.history.pushState({}, '', '/photography');
    setPathname('/photography');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {!isPhotographyRoute && (
        <header>
          <nav className="navbar" aria-label="Main navigation">
            <div className="nav-container">
              <div
                className="logo"
                onClick={() => navigateToSection('home')}
                role="button"
                aria-label="Go to home"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigateToSection('home');
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
                    href={isHomeRoute ? '#home' : '/#home'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection('home');
                    }}
                    className={isHomeRoute && activeSection === 'home' ? 'active' : ''}
                    aria-label="Navigate to Home section"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href={isHomeRoute ? '#about' : '/#about'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection('about');
                    }}
                    className={isHomeRoute && activeSection === 'about' ? 'active' : ''}
                    aria-label="Navigate to About section"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href={isHomeRoute ? '#services' : '/#services'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection('services');
                    }}
                    className={isHomeRoute && activeSection === 'services' ? 'active' : ''}
                    aria-label="Navigate to Services section"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href={isPhotographyRoute ? '#contact' : isHomeRoute ? '#contact' : '/#contact'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection('contact');
                    }}
                    className={isHomeRoute && activeSection === 'contact' ? 'active' : ''}
                    aria-label="Navigate to Contact section"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/photography"
                    className={isPhotographyRoute ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPhotography();
                    }}
                    aria-label="Navigate to Photography page"
                  >
                    Photography
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      )}

      <main>
        {isHomeRoute ? (
          <>
            <section id="home" className="hero" aria-label="Hero section">
              <div className="hero-content">
                <div className={`hero-text ${isVisible['home'] ? 'fade-in-up' : ''}`}>
                  <h1 className="hero-title">
                    Building Digital
                    <br />
                    <span className="hero-title-accent">Experiences</span>
                  </h1>
                  <p className="hero-subtitle">
                    Full-stack developer specializing in modern web applications, React, TypeScript, and AI
                    integration. Turning ideas into scalable, high-performance solutions. Based in Israel, available
                    for projects worldwide.
                  </p>
                  <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                      Get Started
                    </button>
                    <button className="btn-secondary" onClick={() => scrollToSection('about')}>
                      About Me
                    </button>
                  </div>
                </div>
                <div className={`hero-visual ${isVisible['home'] ? 'fade-in-right' : ''}`}>
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
                      <div className="stat-label-mobile">Years Experience</div>
                    </div>
                    <div className="stat-mobile">
                      <div className="stat-number-mobile">100+</div>
                      <div className="stat-label-mobile">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scroll-indicator">
                <div className="mouse"></div>
              </div>
            </section>

            <section id="about" className="about" aria-labelledby="about-heading">
              <div className="container">
                <header className={`about-header ${isVisible['about'] ? 'fade-in-up' : ''}`}>
                  <h2 id="about-heading" className="section-title">
                    About Me
                  </h2>
                  <p className="section-subtitle about-subtitle">
                    Full-stack developer with a strong understanding of UI/UX, and professional photographer — based in
                    Israel
                  </p>
                </header>

                <article className={`about-panel ${isVisible['about'] ? 'fade-in-up' : ''}`}>
                  <div className="about-block">
                    <p className="about-lead">
                      I build modern web products with React and TypeScript — pairing solid engineering with an
                      understanding of how people actually use interfaces.
                    </p>
                    <p className="about-detail">
                      B.Sc. Software Engineering (Shenkar) · M.B.A. Data Science (Hebrew University) · 8+ years at
                      Outbrain, Promo.com, and BitTech
                    </p>
                  </div>

                  <div className="about-block">
                    <h3 className="about-block-label">Skills</h3>
                    <ul className="about-skills" aria-label="Technical skills">
                      {skills.map((skill) => (
                        <li key={skill}>
                          <span className="skill-tag">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="about-block about-block--photography">
                    <div className="about-photography-copy">
                      <h3 className="about-photography-title">Professional Photography</h3>
                      <p className="about-photography-text">
                        Product and catalog photography for brands and e-commerce — clean lighting, accurate color, and
                        images ready for websites, lookbooks, and marketing campaigns.
                      </p>
                    </div>
                    <div className="about-photography-actions">
                      <button type="button" className="about-btn about-btn--primary" onClick={navigateToPhotography}>
                        View portfolio
                      </button>
                      <a
                        href="https://www.instagram.com/avitalg_photography/"
                        className="about-btn about-btn--outline"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Photography on Instagram @avitalg_photography"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section id="services" className="services" aria-labelledby="services-heading">
              <div className="container">
                <h2 id="services-heading" className={`section-title ${isVisible['services'] ? 'fade-in-up' : ''}`}>
                  Services
                </h2>
                <p className={`section-subtitle ${isVisible['services'] ? 'fade-in-up' : ''}`}>
                  Comprehensive development solutions tailored to your needs. Specializing in React, TypeScript, AI
                  integration, and modern web technologies.
                </p>
                <div className="services-grid" role="list">
                  {services.map((service, index) => (
                    <article
                      key={index}
                      className={`service-card ${isVisible['services'] ? 'fade-in-up' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      role="listitem"
                    >
                      <div className="service-icon" aria-hidden="true">
                        {service.icon}
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="contact" className="contact" aria-labelledby="contact-heading">
              <div className="container">
                <h2 id="contact-heading" className={`section-title ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  Let's Work Together
                </h2>
                <p className={`section-subtitle ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  Ready to bring your ideas to life? Get in touch and let's discuss your project. Available for
                  freelance and contract work worldwide.
                </p>
                <div className={`contact-form-container ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
                  <ContactFormWrapper />
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="contact-icon">💬</div>
                      <div>
                        <h4>Let's Connect</h4>
                        <p>Available for new projects</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">🔗</div>
                      <div>
                        <h4>LinkedIn</h4>
                        <p>
                          <a
                            href="https://www.linkedin.com/in/avital-glazer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                          >
                            Connect with me on LinkedIn
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
          <PhotographyPage />
        )}
      </main>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <p>&copy; 2025 Avital Glazer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export { App };

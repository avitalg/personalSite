import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Modern, responsive websites built with React, TypeScript, and cutting-edge technologies.'
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Speed up your applications with advanced optimization techniques and best practices.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love to interact with.'
    },
    {
      icon: '🔧',
      title: 'API Development',
      description: 'Robust backend services and RESTful APIs built for scale and reliability.'
    },
    {
      icon: '🤖',
      title: 'AI Integration',
      description: 'AI implemented in code. Integrating AI APIs and frameworks directly into applications to add intelligent features and capabilities.'
    },
    {
      icon: '✅',
      title: 'Testing',
      description: 'Comprehensive testing strategies including unit tests, integration tests, and end-to-end testing. Ensuring code quality, reliability, and cross-browser compatibility.'
    },
  ];

  const experience = [
    {
      company: 'Outbrain',
      role: 'Full Stack Developer',
      period: '2021 - 2025',
      location: 'Israel',
      description: 'creating new UI experiences, suggesting improvements and innovative solutions, optimizing performance, writing tests and ensuring cross-browser compatibility.',
      technologies: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Java']
    },
    {
      company: 'Promo.com',
      role: 'Full Stack Developer',
      period: '2019 - 2021',
      location: 'Israel',
      description: 'Implemented and improved the video editor and video tools. Created pixel perfect UI while working with Storybook.',
      technologies: ['React', 'Next.js', 'JavaScript', 'PHP', 'mongoDB', 'Golang']
    },
    {
      company: 'BitTech',
      role: 'Web Developer',
      period: '2016 - 2019',
      location: 'Israel',
      description: 'Built responsive multi language websites using pixel perfect design and PSDs.',
      technologies: ['Javascript', 'Vue.js', 'Wordpress', 'HTML', 'CSS']
    }
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <span className="logo-text">Avital</span>
            <span className="logo-accent">Glazer</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience') }} className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }} className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className={`hero-text ${isVisible['home'] ? 'fade-in-up' : ''}`}>
            <h1 className="hero-title">
              <span className="gradient-text">Building Digital</span>
              <br />
              <span className="gradient-text">Experiences</span>
            </h1>
            <p className="hero-subtitle">
              Full-stack developer specializing in modern web applications.
              Turning ideas into scalable, high-performance solutions.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                Get Started
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('experience')}>
                View Experience
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
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2 className={`section-title ${isVisible['about'] ? 'fade-in-up' : ''}`}>
            About Me
          </h2>
          <div className="about-content">
            <div className={`about-text ${isVisible['about'] ? 'fade-in-left' : ''}`}>
              <p>I'm a Software Engineer with a B.Sc. in Software Engineering from Shenkar
                 and an M.B.A. with a specialization in Data Science from the Hebrew University. 
                 Experienced in building high-quality, scalable frontend applications with React, 
                 with a strong focus on performance, clean architecture, and user experience. 
                 Combines solid engineering fundamentals with data-driven thinking and business 
                 understanding to deliver practical, impactful solutions.</p>
              <div className="skills">
                <span className="skill-tag">React</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="container">
          <h2 className={`section-title ${isVisible['experience'] ? 'fade-in-up' : ''}`}>
            Experience
          </h2>
          <p className={`section-subtitle ${isVisible['experience'] ? 'fade-in-up' : ''}`}>
            My professional journey in software development
          </p>
          <div className="experience-timeline">
            {experience.map((exp, index) => (
              <div
                key={index}
                className={`experience-item ${isVisible['experience'] ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="experience-content">
                  <div className="experience-header">
                    <div>
                      <h3 className="experience-role">{exp.role}</h3>
                      <h4 className="experience-company">{exp.company}</h4>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-period">{exp.period}</span>
                      <span className="experience-location">📍 {exp.location}</span>
                    </div>
                  </div>
                  <p className="experience-description">{exp.description}</p>
                  <div className="experience-tech">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                {index < experience.length - 1 && <div className="experience-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <h2 className={`section-title ${isVisible['services'] ? 'fade-in-up' : ''}`}>
            Services
          </h2>
          <p className={`section-subtitle ${isVisible['services'] ? 'fade-in-up' : ''}`}>
            Comprehensive development solutions tailored to your needs
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card ${isVisible['services'] ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className={`section-title ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
            Let's Work Together
          </h2>
          <p className={`section-subtitle ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
            Ready to bring your ideas to life? Get in touch and let's discuss your project.
          </p>
          <div className={`contact-info-container ${isVisible['contact'] ? 'fade-in-up' : ''}`}>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:test@gmail.com" className="contact-link">
                      test@gmail.com
                    </a>
                  </p>
                </div>
              </div>
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

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Avital Glazer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export { App };

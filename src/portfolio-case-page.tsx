import { useEffect, useMemo, useRef, useState } from 'react';
import { ClientOnly } from './components/ClientOnly';
import { TableauEmbed, TableauStaticFallback } from './components/TableauEmbed';
import { pagePath } from './routing';
import type { PortfolioCase, PortfolioSection } from './portfolio/cases';

type PortfolioCasePageProps = {
  caseStudy: PortfolioCase;
  onGoHome: () => void;
  onGoPortfolio?: () => void;
};

type TocItem = {
  id: string;
  label: string;
};

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function shortLabel(heading: string): string {
  return heading.replace(/^\d+\.\s*/, '');
}

function buildToc(caseStudy: PortfolioCase): TocItem[] {
  const items: TocItem[] = caseStudy.sections.map((section) => ({
    id: sectionId(section.heading),
    label: shortLabel(section.heading),
  }));

  const dashboardItem: TocItem = { id: 'interactive-dashboard', label: 'Interactive dashboard' };
  const afterHeading = caseStudy.dashboardAfterHeading;

  if (!afterHeading) {
    return [...items, dashboardItem];
  }

  const insertAfter = items.findIndex((item) => item.id === sectionId(afterHeading));
  if (insertAfter < 0) {
    return [...items, dashboardItem];
  }

  return [...items.slice(0, insertAfter + 1), dashboardItem, ...items.slice(insertAfter + 1)];
}

/** Render plain text with optional `[label](url)` links. */
function renderInlineLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (!match) return <span key={index}>{part}</span>;
    return (
      <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer">
        {match[1]}
      </a>
    );
  });
}

function CaseSectionBlock({ section }: { section: PortfolioSection }) {
  const id = sectionId(section.heading);

  return (
    <section id={id} className="case-section">
      <h2>{section.heading}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      {section.image && (
        <figure className="case-figure">
          <img
            src={section.image.src}
            alt={section.image.alt}
            className="case-figure__img"
            loading="lazy"
          />
          {section.image.caption && (
            <figcaption className="case-figure__caption">{section.image.caption}</figcaption>
          )}
        </figure>
      )}
      {section.bullets && section.bullets.length > 0 && (
        <ul>
          {section.bullets.map((item) => (
            <li key={item.slice(0, 48)}>{renderInlineLinks(item)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DashboardBlock({ caseStudy }: { caseStudy: PortfolioCase }) {
  return (
    <section id="interactive-dashboard" className="case-dashboard" aria-labelledby="dashboard-heading">
      <div className="case-dashboard__inner">
        <div className="case-dashboard__header">
          <h2 id="dashboard-heading">Interactive dashboard</h2>
          <a
            className="case-dashboard__external"
            href={`https://public.tableau.com/views/${caseStudy.tableau.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open full size
          </a>
        </div>
        <ClientOnly fallback={<TableauStaticFallback config={caseStudy.tableau} />}>
          <TableauEmbed config={caseStudy.tableau} />
        </ClientOnly>
        <p className="case-dashboard__hint case-dashboard__hint--desktop-only">
          Scroll sideways inside the dashboard if charts look cramped, or open full size.
        </p>
      </div>
    </section>
  );
}

function CaseSidebar({
  items,
  activeId,
  onSelect,
}: {
  items: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('.case-sidebar__link--active');
    active?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeId]);

  return (
    <nav className="case-sidebar" aria-label="On this page">
      <p className="case-sidebar__label">On this page</p>
      <ul ref={listRef} className="case-sidebar__list">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`case-sidebar__link${isActive ? ' case-sidebar__link--active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item.id);
                  const el = document.getElementById(item.id);
                  if (el) {
                    const page = document.querySelector('.case-page');
                    const styles = page ? getComputedStyle(page) : null;
                    const topbar = parseFloat(styles?.getPropertyValue('--case-topbar-height') || '54') || 54;
                    const toc = parseFloat(styles?.getPropertyValue('--case-toc-bar-height') || '0') || 0;
                    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
                    const offset = (topbar + toc) * rem + 12;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                  window.history.replaceState(null, '', `#${item.id}`);
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function PortfolioCasePage({ caseStudy, onGoHome, onGoPortfolio }: PortfolioCasePageProps) {
  const toc = useMemo(() => buildToc(caseStudy), [caseStudy]);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? '');

  const splitAt = caseStudy.dashboardAfterHeading
    ? caseStudy.sections.findIndex((s) => s.heading === caseStudy.dashboardAfterHeading)
    : -1;
  const sectionsBefore =
    splitAt >= 0 ? caseStudy.sections.slice(0, splitAt + 1) : caseStudy.sections;
  const sectionsAfter = splitAt >= 0 ? caseStudy.sections.slice(splitAt + 1) : [];
  const showDashboardMid = splitAt >= 0;

  useEffect(() => {
    const nodes = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const updateActive = () => {
      const marker = window.scrollY + Math.min(160, window.innerHeight * 0.28);
      let current = nodes[0]?.id ?? '';

      for (const node of nodes) {
        const top = node.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = node.id;
        else break;
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [toc]);

  return (
    <div className="case-page">
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
        <nav className="case-topbar__nav" aria-label="Case study navigation">
          <a
            href={`${pagePath('home')}#portfolio`}
            onClick={(e) => {
              e.preventDefault();
              if (onGoPortfolio) onGoPortfolio();
              else onGoHome();
            }}
          >
            Portfolio
          </a>
        </nav>
      </header>

      <div className="case-shell">
        <aside className="case-shell__sidebar" aria-hidden={false}>
          <CaseSidebar items={toc} activeId={activeId} onSelect={setActiveId} />
        </aside>

        <div className="case-shell__main">
          <article className="case-article">
            <div className="case-container">
              <p className="case-eyebrow">Case study</p>
              <h1 className="case-title">{caseStudy.title}</h1>

              <aside className="case-disclaimer" role="note">
                <strong>Disclaimer</strong>
                <p>{caseStudy.disclaimer}</p>
              </aside>

              {caseStudy.links && caseStudy.links.length > 0 && (
                <ul className="case-source-links" aria-label="References">
                  {caseStudy.links.map((link) => (
                    <li key={link.href}>
                      {link.note ? <span className="case-source-links__note">{link.note}: </span> : null}
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <div className="case-tech-block">
                <p className="case-tech-label">Tools &amp; stack</p>
                <ul className="case-tech" aria-label="Technologies used">
                  {caseStudy.tech.map((tag) => (
                    <li key={tag}>
                      <span className="case-tech__tag">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {sectionsBefore.map((section) => (
                <CaseSectionBlock key={section.heading} section={section} />
              ))}
            </div>

            {showDashboardMid && <DashboardBlock caseStudy={caseStudy} />}

            {sectionsAfter.length > 0 && (
              <div className="case-container case-container--continued">
                {sectionsAfter.map((section) => (
                  <CaseSectionBlock key={section.heading} section={section} />
                ))}
              </div>
            )}

            {!showDashboardMid && <DashboardBlock caseStudy={caseStudy} />}
          </article>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { ClientOnly } from './components/ClientOnly';
import { TableauEmbed, TableauStaticFallback } from './components/TableauEmbed';
import { pagePath } from './routing';
import type {
  PortfolioCase,
  PortfolioFigure,
  PortfolioSection,
  PortfolioTable,
  TableauEmbedConfig,
} from './portfolio/cases';

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

  if (!caseStudy.tableau) {
    return items;
  }

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

/** Render plain text with optional `[label](url)` links, **bold**, and *italic*. */
function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (!part) return null;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={index}>{bold[1]}</strong>;
    const italic = /^\*([^*]+)\*$/.exec(part);
    if (italic) return <em key={index}>{italic[1]}</em>;
    return <span key={index}>{part}</span>;
  });
}

function CaseTable({ table }: { table: PortfolioTable }) {
  return (
    <div className="case-table-wrap">
      <table className="case-table">
        {table.caption && <caption>{table.caption}</caption>}
        <thead>
          <tr>
            {table.columns.map((col) => (
              <th
                key={col.header}
                scope="col"
                className={col.align === 'right' ? 'case-table__num' : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) => (
                <td
                  key={`${table.columns[index]?.header ?? index}-${cell}`}
                  className={table.columns[index]?.align === 'right' ? 'case-table__num' : undefined}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseFigure({ image }: { image: PortfolioFigure }) {
  return (
    <figure className="case-figure">
      <img src={image.src} alt={image.alt} className="case-figure__img" loading="lazy" />
      {image.caption && <figcaption className="case-figure__caption">{image.caption}</figcaption>}
    </figure>
  );
}

function sectionFigures(section: PortfolioSection): PortfolioFigure[] {
  if (section.images && section.images.length > 0) return section.images;
  return section.image ? [section.image] : [];
}

function CaseSectionBlock({ section }: { section: PortfolioSection }) {
  const id = sectionId(section.heading);
  const figures = sectionFigures(section);

  return (
    <section id={id} className="case-section">
      <h2>{section.heading}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p.slice(0, 40)}>{renderInline(p)}</p>
      ))}
      {figures.map((image) => (
        <CaseFigure key={image.src} image={image} />
      ))}
      {section.code && (
        <pre className="case-code">
          <code>{section.code}</code>
        </pre>
      )}
      {section.tables?.map((table) => (
        <CaseTable key={table.caption ?? table.columns.map((c) => c.header).join('-')} table={table} />
      ))}
      {section.subheading && <h3 className="case-section__subheading">{section.subheading}</h3>}
      {section.bullets && section.bullets.length > 0 && (
        section.ordered ? (
          <ol>
            {section.bullets.map((item) => (
              <li key={item.slice(0, 48)}>{renderInline(item)}</li>
            ))}
          </ol>
        ) : (
          <ul>
            {section.bullets.map((item) => (
              <li key={item.slice(0, 48)}>{renderInline(item)}</li>
            ))}
          </ul>
        )
      )}
      {section.closingParagraphs?.map((p) => (
        <p key={p.slice(0, 40)}>{renderInline(p)}</p>
      ))}
    </section>
  );
}

function DashboardBlock({ config }: { config: TableauEmbedConfig }) {
  return (
    <section id="interactive-dashboard" className="case-dashboard" aria-labelledby="dashboard-heading">
      <div className="case-dashboard__inner">
        <div className="case-dashboard__header">
          <h2 id="dashboard-heading">Interactive dashboard</h2>
          <a
            className="case-dashboard__external"
            href={`https://public.tableau.com/views/${config.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open full size
          </a>
        </div>
        <ClientOnly fallback={<TableauStaticFallback config={config} />}>
          <TableauEmbed config={config} />
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

  const splitAt =
    caseStudy.tableau && caseStudy.dashboardAfterHeading
      ? caseStudy.sections.findIndex((s) => s.heading === caseStudy.dashboardAfterHeading)
      : -1;
  const sectionsBefore =
    splitAt >= 0 ? caseStudy.sections.slice(0, splitAt + 1) : caseStudy.sections;
  const sectionsAfter = splitAt >= 0 ? caseStudy.sections.slice(splitAt + 1) : [];
  const showDashboardMid = splitAt >= 0 && Boolean(caseStudy.tableau);

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

            {showDashboardMid && caseStudy.tableau && (
              <DashboardBlock config={caseStudy.tableau} />
            )}

            {sectionsAfter.length > 0 && (
              <div className="case-container case-container--continued">
                {sectionsAfter.map((section) => (
                  <CaseSectionBlock key={section.heading} section={section} />
                ))}
              </div>
            )}

            {!showDashboardMid && caseStudy.tableau && (
              <DashboardBlock config={caseStudy.tableau} />
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

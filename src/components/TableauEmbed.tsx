import { useEffect, useId, useRef, useState } from 'react';
import type { TableauEmbedConfig } from '../portfolio/cases';

type TableauEmbedProps = {
  config: TableauEmbedConfig;
};

/** Prefer enough width for a multi-pane Tableau dashboard; scroll horizontally if needed. */
const TARGET_WIDTH = 1360;
const TARGET_HEIGHT = 980;
const MOBILE_MQ = '(max-width: 960px)';

function tableauPublicUrl(name: string): string {
  return `https://public.tableau.com/views/${name}`;
}

function tableauEmbedUrl(name: string): string {
  const params = new URLSearchParams({
    ':embed': 'y',
    ':showVizHome': 'n',
    ':tabs': 'n',
    ':toolbar': 'yes',
    ':device': 'desktop',
  });
  return `https://public.tableau.com/views/${name}?${params.toString()}`;
}

export function TableauStaticFallback({
  config,
  hint = 'Open the interactive dashboard on Tableau Public.',
}: TableauEmbedProps & { hint?: string }) {
  const publicUrl = tableauPublicUrl(config.name);

  return (
    <div className="tableau-embed tableau-embed--static">
      <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="tableau-embed__static-link">
        <img src={config.staticImageUrl} alt={config.alt} className="tableau-embed__image" />
      </a>
      <p className="tableau-embed__hint">
        {hint}{' '}
        <a href={publicUrl} target="_blank" rel="noopener noreferrer">
          Open on Tableau Public
        </a>
      </p>
    </div>
  );
}

/**
 * Desktop: interactive iframe. Mobile: static preview image linking out to Tableau Public.
 * SSR/prerender should use TableauStaticFallback.
 */
export function TableauEmbed({ config }: TableauEmbedProps) {
  const reactId = useId().replace(/:/g, '');
  const frameId = `tableau-frame-${reactId}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MQ).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const syncHeight = () => {
      const frame = wrap.querySelector('iframe');
      if (!frame) return;
      const width = Math.max(wrap.clientWidth, TARGET_WIDTH);
      const height = Math.round((width / TARGET_WIDTH) * TARGET_HEIGHT);
      frame.style.width = `${width}px`;
      frame.style.height = `${Math.max(height, TARGET_HEIGHT)}px`;
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(wrap);
    window.addEventListener('resize', syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, [config.name, isMobile]);

  if (isMobile) {
    return (
      <TableauStaticFallback
        config={config}
        hint="Best viewed on desktop. Tap the preview to open the interactive dashboard."
      />
    );
  }

  return (
    <div className="tableau-embed">
      <div ref={wrapRef} className="tableau-embed__scroll">
        <iframe
          id={frameId}
          title={config.alt}
          src={tableauEmbedUrl(config.name)}
          className="tableau-embed__frame"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export const GA_MEASUREMENT_ID = 'G-532F5ZLRBK';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Path GA4 should record. Hash stays off the path; section jumps are not page views. */
export function gtagPath(): string {
  return `${window.location.pathname}${window.location.search}`;
}

/**
 * Record a pageview for SPA navigations.
 * The snippet in index.html already counts the first load.
 * Safe no-op until gtag.js has defined window.gtag.
 */
export function trackPageview(path = gtagPath()): void {
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: document.title,
  });
}

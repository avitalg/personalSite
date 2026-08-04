type GoatCounterCountVars = {
  path?: string;
  title?: string;
  referrer?: string;
  event?: boolean;
};

type GoatCounterApi = {
  count: (vars?: GoatCounterCountVars) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounterApi;
  }
}

/** Path GoatCounter should record (includes query for UTM campaigns). */
export function goatcounterPath(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

/**
 * Record a pageview for SPA navigations.
 * Safe no-op until the GoatCounter script has loaded.
 */
export function trackPageview(path = goatcounterPath()): void {
  window.goatcounter?.count({ path });
}

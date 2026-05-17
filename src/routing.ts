export type Locale = 'he' | 'en';

export const defaultLocale: Locale = 'he';
export const locales: Locale[] = ['he', 'en'];
export const siteUrl = 'https://avitalglazer.com';

export type PageKind = 'home' | 'photography';

export type ParsedRoute = {
  locale: Locale;
  page: PageKind;
  pathname: string;
};

function isLocale(value: string): value is Locale {
  return value === 'he' || value === 'en';
}

export function parsePath(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);

  let locale: Locale = defaultLocale;
  let rest = segments;

  if (segments[0] && isLocale(segments[0])) {
    locale = segments[0];
    rest = segments.slice(1);
  }

  const page: PageKind = rest[0] === 'photography' ? 'photography' : 'home';

  return { locale, page, pathname: clean };
}

export function localePath(locale: Locale, page: PageKind = 'home', hash?: string): string {
  const base = page === 'photography' ? `/${locale}/photography` : `/${locale}`;
  return hash ? `${base}#${hash}` : base;
}

export function canonicalUrl(locale: Locale, page: PageKind = 'home'): string {
  return `${siteUrl}${localePath(locale, page)}`;
}

/** Redirect legacy URLs (/photography, /#about) to localized paths */
export function resolveLegacyRedirect(pathname: string, hash: string): string | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);

  if (segments.length === 0) {
    return localePath(defaultLocale, 'home', hash || undefined);
  }

  if (segments[0] === 'photography' && !isLocale(segments[0])) {
    return localePath(defaultLocale, 'photography', hash || undefined);
  }

  if (segments.length === 1 && isLocale(segments[0])) {
    return null;
  }

  if (!isLocale(segments[0]) && segments[0] !== 'photography') {
    return localePath(defaultLocale, 'home', hash || undefined);
  }

  return null;
}

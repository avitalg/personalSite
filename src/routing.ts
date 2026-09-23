export type PageKind = 'home' | 'photography' | 'analytics' | 'portfolioCase';

export const siteUrl = 'https://avitalglazer.com';

export type ParsedRoute = {
  page: PageKind;
  pathname: string;
  slug?: string;
};

export function parsePath(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);

  // Legacy locale prefixes (/he, /en) are stripped; page is what follows
  const rest =
    segments[0] === 'he' || segments[0] === 'en' ? segments.slice(1) : segments;

  if (rest[0] === 'photography') {
    return { page: 'photography', pathname: clean };
  }

  if (rest[0] === 'analytics') {
    return { page: 'analytics', pathname: clean };
  }

  if (rest[0] === 'portfolio' && rest[1]) {
    return { page: 'portfolioCase', pathname: clean, slug: rest[1] };
  }

  return { page: 'home', pathname: clean };
}

export function pagePath(page: PageKind = 'home', hashOrSlug?: string): string {
  if (page === 'photography') {
    return hashOrSlug ? `/photography#${hashOrSlug}` : '/photography';
  }
  if (page === 'analytics') {
    return hashOrSlug ? `/analytics#${hashOrSlug}` : '/analytics';
  }
  if (page === 'portfolioCase') {
    return hashOrSlug ? `/portfolio/${hashOrSlug}` : '/portfolio';
  }
  return hashOrSlug ? `/#${hashOrSlug}` : '/';
}

export function canonicalUrl(page: PageKind = 'home', slug?: string): string {
  if (page === 'photography') return `${siteUrl}/photography`;
  if (page === 'analytics') return `${siteUrl}/analytics`;
  if (page === 'portfolioCase' && slug) return `${siteUrl}/portfolio/${slug}`;
  return siteUrl;
}

/** Redirect legacy localized URLs to English-only paths */
export function resolveLegacyRedirect(pathname: string, hash: string): string | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);

  if (segments[0] === 'he' || segments[0] === 'en') {
    const rest = segments.slice(1);
    if (rest[0] === 'photography') {
      return pagePath('photography', hash || undefined);
    }
    if (rest[0] === 'analytics') {
      return pagePath('analytics', hash || undefined);
    }
    if (rest[0] === 'portfolio' && rest[1]) {
      return pagePath('portfolioCase', rest[1]);
    }
    return pagePath('home', hash || undefined);
  }

  return null;
}

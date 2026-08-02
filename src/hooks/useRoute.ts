import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  canonicalUrl,
  pagePath,
  parsePath,
  resolveLegacyRedirect,
  type PageKind,
} from '../routing';

export function useRoute() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  const route = useMemo(() => parsePath(pathname), [pathname]);

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  useEffect(() => {
    const redirect = resolveLegacyRedirect(window.location.pathname, window.location.hash.replace('#', ''));
    if (redirect) {
      window.history.replaceState({}, '', redirect);
      setPathname(window.location.pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((page: PageKind, hashOrSlug?: string) => {
    const next = pagePath(page, hashOrSlug);
    window.history.pushState({}, '', next);
    setPathname(window.location.pathname);

    if (page === 'portfolioCase' || page === 'photography') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (hashOrSlug) {
      requestAnimationFrame(() => {
        document.getElementById(hashOrSlug)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const goHomeSection = useCallback(
    (id: string) => {
      if (route.page === 'home') {
        scrollToSection(id);
        return;
      }
      navigate('home', id);
    },
    [navigate, route.page, scrollToSection]
  );

  return {
    route,
    pathname,
    canonical: canonicalUrl(route.page, route.slug),
    isHome: route.page === 'home',
    isPhotography: route.page === 'photography',
    isPortfolioCase: route.page === 'portfolioCase',
    navigate,
    goHomeSection,
    scrollToSection,
  };
}

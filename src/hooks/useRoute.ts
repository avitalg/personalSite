import { useCallback, useEffect, useMemo, useState } from 'react';
import { i18n } from '../i18n/config';
import {
  canonicalUrl,
  defaultLocale,
  localePath,
  parsePath,
  resolveLegacyRedirect,
  type Locale,
  type PageKind,
} from '../routing';

export function useRoute() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  const route = useMemo(() => parsePath(pathname), [pathname]);

  const syncDocument = useCallback((locale: Locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr';
    void i18n.changeLanguage(locale);
  }, []);

  useEffect(() => {
    const redirect = resolveLegacyRedirect(window.location.pathname, window.location.hash.replace('#', ''));
    if (redirect) {
      window.history.replaceState({}, '', redirect);
      setPathname(window.location.pathname);
      return;
    }

    if (pathname === '/' || pathname === '') {
      const target = localePath(defaultLocale, 'home');
      window.history.replaceState({}, '', target);
      setPathname(target);
    }
  }, [pathname]);

  useEffect(() => {
    syncDocument(route.locale);
  }, [route.locale, syncDocument]);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (locale: Locale, page: PageKind, hash?: string) => {
      const next = localePath(locale, page, hash);
      window.history.pushState({}, '', next);
      setPathname(window.location.pathname);
      window.scrollTo({ top: hash ? undefined : 0, behavior: 'smooth' });
      if (hash) {
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        });
      }
    },
    []
  );

  const switchLocale = useCallback(
    (nextLocale: Locale) => {
      navigate(nextLocale, route.page);
    },
    [navigate, route.page]
  );

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const goHomeSection = useCallback(
    (id: string) => {
      if (route.page === 'home') {
        scrollToSection(id);
        return;
      }
      navigate(route.locale, 'home', id);
    },
    [navigate, route.locale, route.page, scrollToSection]
  );

  return {
    route,
    pathname,
    canonical: canonicalUrl(route.locale, route.page),
    isHome: route.page === 'home',
    isPhotography: route.page === 'photography',
    navigate,
    switchLocale,
    goHomeSection,
    scrollToSection,
  };
}

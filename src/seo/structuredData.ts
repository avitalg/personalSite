import type { TFunction } from 'i18next';
import { siteUrl, type Locale, type PageKind } from '../routing';

const sameAs = [
  'https://www.linkedin.com/in/avital-glazer/',
  'https://www.instagram.com/avitalg_photography/',
];

const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'AI Integration',
  'UI/UX',
  'Web Development',
  'API Development',
  'Performance Optimization',
  'Testing',
];

export function buildJsonLd(locale: Locale, page: PageKind, t: TFunction) {
  const homeUrl = `${siteUrl}/${locale}`;
  const pageUrl = page === 'photography' ? `${homeUrl}/photography` : homeUrl;
  const isPhoto = page === 'photography';

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Avital Glazer',
    alternateName: locale === 'he' ? 'אביטל גלזר' : undefined,
    jobTitle: locale === 'he' ? 'מפתחת Full Stack' : 'Full Stack Developer',
    url: homeUrl,
    image: `${siteUrl}/logo-512.png`,
    email: 'avitalglazer@gmail.com',
    sameAs,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
    },
    knowsAbout: skills,
    alumniOf: [
      { '@type': 'Organization', name: 'Outbrain' },
      { '@type': 'Organization', name: 'Promo.com' },
      { '@type': 'Organization', name: 'BitTech' },
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t('seo.title'),
    url: homeUrl,
    description: t('seo.description'),
    inLanguage: locale === 'he' ? 'he-IL' : 'en-US',
    publisher: {
      '@type': 'Person',
      name: 'Avital Glazer',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-512.png`,
        width: 512,
        height: 512,
      },
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: isPhoto
      ? [
          { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('nav.photography'),
            item: pageUrl,
          },
        ]
      : [
          { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${homeUrl}#home` },
          { '@type': 'ListItem', position: 2, name: t('nav.about'), item: `${homeUrl}#about` },
          { '@type': 'ListItem', position: 3, name: t('nav.services'), item: `${homeUrl}#services` },
          { '@type': 'ListItem', position: 4, name: t('nav.contact'), item: `${homeUrl}#contact` },
        ],
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isPhoto ? t('seo.photographyTitle') : t('seo.title'),
    description: isPhoto ? t('seo.photographyDescription') : t('seo.description'),
    url: pageUrl,
    inLanguage: locale === 'he' ? 'he-IL' : 'en-US',
    isPartOf: { '@type': 'WebSite', url: homeUrl },
    about: { '@type': 'Person', name: 'Avital Glazer' },
  };

  if (isPhoto) {
    const photographyService = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: t('seo.photographyTitle'),
      description: t('seo.photographyDescription'),
      url: pageUrl,
      provider: { '@type': 'Person', name: 'Avital Glazer', url: homeUrl, sameAs },
      areaServed: { '@type': 'Country', name: 'Israel' },
      serviceType: ['Product Photography', 'Catalog Photography', 'Brand Photography', 'E-commerce Photography'],
    };
    return [person, website, webPage, breadcrumb, photographyService];
  }

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: locale === 'he' ? 'אביטל גלזר - פיתוח Full Stack' : 'Avital Glazer - Full Stack Development',
    description: t('seo.description'),
    url: homeUrl,
    provider: { '@type': 'Person', name: 'Avital Glazer', email: 'avitalglazer@gmail.com', url: homeUrl, sameAs },
    areaServed: 'Worldwide',
    serviceType: [
      'Web Development',
      'Branding and Showcase Websites',
      'Business Catalog Photography',
      'Full Stack Development',
      'React Development',
      'TypeScript Development',
      'AI Integration',
      'API Development',
      'Performance Optimization',
      'UI/UX Design',
      'Technical Training and Consulting',
      'Testing',
    ],
  };

  return [person, website, webPage, breadcrumb, professionalService];
}

import type { TFunction } from 'i18next';
import { getPortfolioCase, listFeaturedPortfolioCases } from '../portfolio/cases';
import { portfolioCaseOgImage } from '../portfolio/case-images';
import { siteUrl, type PageKind } from '../routing';

const sameAs = [
  'https://www.linkedin.com/in/avital-glazer/',
  'https://github.com/avitalglazer',
  'https://www.instagram.com/avitalg_photography/',
];

const skills = [
  'Frontend Development',
  'Full Stack Development',
  'UI Development',
  'Performance Optimization',
  'Testing',
  'Cross-browser Compatibility',
  'Storybook',
  'MySQL',
  'WordPress',
  'SEO',
];

export function buildJsonLd(page: PageKind, t: TFunction, slug?: string) {
  const homeUrl = siteUrl;
  const caseStudy = page === 'portfolioCase' ? getPortfolioCase(slug) : undefined;
  const isPhoto = page === 'photography';
  const isAnalytics = page === 'analytics';
  const pageUrl = caseStudy
    ? `${siteUrl}/portfolio/${caseStudy.slug}`
    : isPhoto
      ? `${siteUrl}/photography`
      : isAnalytics
        ? `${siteUrl}/analytics`
        : homeUrl;

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Avital Glazer',
    jobTitle: 'Software Engineer',
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
      { '@type': 'CollegeOrUniversity', name: 'The Hebrew University of Jerusalem' },
      { '@type': 'CollegeOrUniversity', name: 'Shenkar College of Engineering Design and Art' },
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t('seo.title'),
    url: homeUrl,
    description: t('seo.description'),
    inLanguage: 'en-US',
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

  if (caseStudy) {
    if (caseStudy.noindex) {
      return [person, website];
    }
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.analytics'), item: `${siteUrl}/analytics` },
        { '@type': 'ListItem', position: 3, name: caseStudy.title, item: pageUrl },
      ],
    };

    const webPage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: caseStudy.title,
      description: caseStudy.seoDescription,
      url: pageUrl,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', url: homeUrl },
      about: { '@type': 'Person', name: 'Avital Glazer' },
    };

    const creativeWork = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: caseStudy.title,
      description: caseStudy.seoDescription,
      url: pageUrl,
      author: { '@type': 'Person', name: 'Avital Glazer', url: homeUrl },
      keywords: caseStudy.tech.join(', '),
      image: portfolioCaseOgImage(caseStudy),
    };

    return [person, website, webPage, breadcrumb, creativeWork];
  }

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
          { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${homeUrl}/#home` },
          { '@type': 'ListItem', position: 2, name: t('nav.about'), item: `${homeUrl}/#about` },
          { '@type': 'ListItem', position: 3, name: t('nav.experience'), item: `${homeUrl}/#experience` },
          { '@type': 'ListItem', position: 4, name: t('nav.contact'), item: `${homeUrl}/#contact` },
        ],
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isPhoto ? t('seo.photographyTitle') : t('seo.title'),
    description: isPhoto ? t('seo.photographyDescription') : t('seo.description'),
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', url: homeUrl },
    about: { '@type': 'Person', name: 'Avital Glazer' },
  };

  if (isAnalytics) {
    const analyticsPerson = {
      ...person,
      knowsAbout: [
        ...skills,
        'SQL',
        'Python',
        'Pandas',
        'Tableau',
        'Data Analysis',
        'ETL',
        'Business Analytics',
      ],
    };
    const portfolioList = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: t('portfolio.title'),
      itemListElement: listFeaturedPortfolioCases().map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: `${siteUrl}/portfolio/${item.slug}`,
      })),
    };
    const analyticsBreadcrumb = {
      ...breadcrumb,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.analytics'), item: pageUrl },
      ],
    };
    const analyticsPage = {
      ...webPage,
      name: t('seo.analyticsTitle'),
      description: t('seo.analyticsDescription'),
    };
    return [analyticsPerson, website, analyticsPage, analyticsBreadcrumb, portfolioList];
  }

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

  return [person, website, webPage, breadcrumb];
}

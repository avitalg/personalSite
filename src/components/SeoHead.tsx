import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getPortfolioCase } from '../portfolio/cases';
import { buildJsonLd } from '../seo/structuredData';
import { canonicalUrl, siteUrl, type PageKind } from '../routing';

type SeoHeadProps = {
  page: PageKind;
  slug?: string;
};

export function SeoHead({ page, slug }: SeoHeadProps) {
  const { t } = useTranslation();
  const isPhoto = page === 'photography';
  const caseStudy = page === 'portfolioCase' ? getPortfolioCase(slug) : undefined;

  const title = caseStudy
    ? `${caseStudy.title} | Avital Glazer`
    : isPhoto
      ? t('seo.photographyTitle')
      : t('seo.title');
  const description = caseStudy
    ? caseStudy.seoDescription
    : isPhoto
      ? t('seo.photographyDescription')
      : t('seo.description');
  const canonical = canonicalUrl(page, slug);
  const ogImage = caseStudy?.tableau.staticImageUrl ?? `${siteUrl}/logo-512.png`;
  const jsonLd = buildJsonLd(page, t, slug);

  return (
    <Helmet>
      <html lang="en" dir="ltr" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Avital Glazer" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

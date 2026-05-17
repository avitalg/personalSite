import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { buildJsonLd } from '../seo/structuredData';
import { canonicalUrl, siteUrl, type Locale, type PageKind } from '../routing';

type SeoHeadProps = {
  locale: Locale;
  page: PageKind;
};

export function SeoHead({ locale, page }: SeoHeadProps) {
  const { t } = useTranslation();
  const isPhoto = page === 'photography';

  const title = isPhoto ? t('seo.photographyTitle') : t('seo.title');
  const description = isPhoto ? t('seo.photographyDescription') : t('seo.description');
  const canonical = canonicalUrl(locale, page);
  const ogImage = `${siteUrl}/logo-512.png`;
  const ogLocale = locale === 'he' ? 'he_IL' : 'en_US';
  const ogLocaleAlternate = locale === 'he' ? 'en_US' : 'he_IL';
  const heUrl = `${siteUrl}/he${isPhoto ? '/photography' : ''}`;
  const enUrl = `${siteUrl}/en${isPhoto ? '/photography' : ''}`;
  const jsonLd = buildJsonLd(locale, page, t);

  return (
    <Helmet>
      <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="he" href={heUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={heUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />
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

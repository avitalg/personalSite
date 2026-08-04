/**
 * After `vite build`, generates static HTML for each route so crawlers
 * (OpenAI GPTBot, Google, etc.) receive full page content without executing JS.
 */
import * as React from 'react';

Object.assign(globalThis, { React });

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from '../src/i18n/locales/en.json';
import { listPortfolioCases } from '../src/portfolio/cases';
import { renderPage } from '../src/entry-server';
import { buildJsonLd } from '../src/seo/structuredData';
import { canonicalUrl, siteUrl, type PageKind } from '../src/routing';
import { initI18n } from '../src/i18n/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

type RouteSpec = { dir: string; page: PageKind; slug?: string };

const routes: RouteSpec[] = [
  { dir: '', page: 'home' },
  { dir: 'photography', page: 'photography' },
  ...listPortfolioCases().map((c) => ({
    dir: `portfolio/${c.slug}`,
    page: 'portfolioCase' as const,
    slug: c.slug,
  })),
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHead(page: PageKind, slug?: string): string {
  const caseStudy = page === 'portfolioCase' ? listPortfolioCases().find((c) => c.slug === slug) : undefined;
  const isPhoto = page === 'photography';
  const title = caseStudy
    ? `${caseStudy.title} | Avital Glazer`
    : isPhoto
      ? en.seo.photographyTitle
      : en.seo.title;
  const description = caseStudy
    ? caseStudy.seoDescription
    : isPhoto
      ? en.seo.photographyDescription
      : en.seo.description;
  const canonical = canonicalUrl(page, slug);
  const ogImage = caseStudy?.tableau.staticImageUrl ?? `${siteUrl}/logo-512.png`;

  const i18n = initI18n();
  const jsonLd = buildJsonLd(page, i18n.t.bind(i18n), slug);
  const ldScripts = jsonLd
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n    ');

  return `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
    <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192" />
    <link rel="apple-touch-icon" href="/logo-192.png" sizes="192x192" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="llms-txt" href="/llms.txt" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="title" content="${escapeHtml(title)}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonical}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="canonical" href="${canonical}" />
    PLACEHOLDER_CSS
    ${ldScripts}
  </head>
  <body>`;
}

function extractAssets(template: string): { css: string; js: string; analytics: string } {
  const cssMatch = template.match(/<link rel="stylesheet"[^>]+>/g);
  const jsMatch = template.match(/<script type="module"[^>]+><\/script>/g);
  const analyticsMatch = template.match(
    /<!--\s*GoatCounter[\s\S]*?-->\s*<script[\s\S]*?data-goatcounter[\s\S]*?<\/script>|<script[^>]*data-goatcounter[^>]*>\s*<\/script>/i
  );
  return {
    css: cssMatch?.join('\n    ') ?? '',
    js: jsMatch?.join('\n    ') ?? '',
    analytics: analyticsMatch?.[0]?.trim() ?? '',
  };
}

function main() {
  const templatePath = join(distDir, 'index.html');
  const template = readFileSync(templatePath, 'utf8');
  const { css, js, analytics } = extractAssets(template);

  if (!analytics) {
    console.warn('prerender: warning — GoatCounter script not found in dist/index.html');
  }

  for (const route of routes) {
    const appHtml = renderPage(route.page, route.slug);
    const head = buildHead(route.page, route.slug).replace('    PLACEHOLDER_CSS', css ? `    ${css}` : '');
    const html = `${head}
    <div id="root">${appHtml}</div>
    ${js}
    ${analytics}
  </body>
</html>
`;

    const outPath = route.dir
      ? join(distDir, route.dir, 'index.html')
      : join(distDir, 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    console.log(`prerender: ${route.dir ? `/${route.dir}/` : '/'}index.html`);
  }

  console.log(`prerender: done (${routes.length} static HTML pages)`);
}

main();

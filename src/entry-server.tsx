import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { initI18n } from './i18n/config';
import { SiteApp } from './SiteApp';
import type { PageKind } from './routing';

export function renderPage(page: PageKind, slug?: string): string {
  const i18n = initI18n();
  return renderToString(
    <I18nextProvider i18n={i18n}>
      <SiteApp page={page} slug={slug} />
    </I18nextProvider>
  );
}

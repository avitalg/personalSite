import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { App } from './App.tsx';
import { initI18n } from './i18n/config';
import { parsePath } from './routing';

const { locale } = parsePath(window.location.pathname);
initI18n(locale);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

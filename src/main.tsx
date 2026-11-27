import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { languageFromLocation } from './lib/seo';
import './index.css';

/*
 * The HTML already contains the full page (pre-rendered at build time, for search engines and a fast
 * first paint). React then renders the live version over it. createRoot rather than hydrateRoot because
 * the deadline widget and the open/closed badge depend on today's date and time, which differ from build time.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App initialLanguage={languageFromLocation(window.location)} />
  </StrictMode>,
);

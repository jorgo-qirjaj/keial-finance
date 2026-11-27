import { renderToString } from 'react-dom/server';
import App from './App';
import { Language } from './types';

export { SEO, canonicalUrl } from './lib/seo';

/** Renders the whole page to HTML for one language. Used only at build time by scripts/prerender.mjs. */
export function render(language: Language) {
  return renderToString(<App initialLanguage={language} />);
}

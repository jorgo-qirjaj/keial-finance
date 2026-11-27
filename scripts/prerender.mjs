/**
 * Writes static HTML for every page after `vite build`, so search engines and link previews get the full
 * content without running JavaScript, and visitors see the page at once.
 *
 *   dist/index.html     Albanian  (https://kei.al/)
 *   dist/en/index.html  English   (https://kei.al/en/)
 *   dist/404.html       not-found page
 *
 * Uses the server bundle built by `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const { render, SEO, canonicalUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Replace the attribute value of the one tag matching `tagPattern`, failing loudly if it is missing. */
function setAttr(html, tagPattern, attr, value) {
  const re = new RegExp(`(<${tagPattern}[^>]*\\s${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: tag not found: ${tagPattern}`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function page(lang) {
  const seo = SEO[lang];
  const other = lang === 'sq' ? 'en' : 'sq';
  let html = template.replace('<!--app-html-->', render(lang));
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>`);
  html = setAttr(html, 'meta name="description"', 'content', seo.description);
  html = setAttr(html, 'link rel="canonical"', 'href', canonicalUrl(lang));
  html = setAttr(html, 'meta property="og:title"', 'content', seo.title);
  html = setAttr(html, 'meta property="og:description"', 'content', seo.description);
  html = setAttr(html, 'meta property="og:url"', 'content', canonicalUrl(lang));
  html = setAttr(html, 'meta property="og:locale"', 'content', seo.locale);
  html = setAttr(html, 'meta property="og:locale:alternate"', 'content', SEO[other].locale);
  if (html.includes('<!--app-html-->')) throw new Error('prerender: app HTML was not inserted');
  return html;
}

function write(rel, html) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`prerender: ${rel} (${(html.length / 1024).toFixed(1)} kB)`);
}

write('index.html', page('sq'));
write('en/index.html', page('en'));

// Not-found page: plain HTML, not indexed, links back home in both languages.
write('404.html', `<!doctype html>
<html lang="sq"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Faqja nuk u gjet | KEI-AL Auditing</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:16px/1.6 system-ui,sans-serif;color:#14213D;background:#F4F6F9}
main{text-align:center;padding:24px}h1{font-size:28px;margin:0 0 8px}a{color:#14213D;font-weight:600}</style></head>
<body><main><h1>Faqja nuk u gjet</h1><p>Page not found.</p><p><a href="/">Kthehu te kreu</a> · <a href="/en/">Back to home</a></p></main></body></html>
`);

fs.rmSync(ssrDir, { recursive: true, force: true });

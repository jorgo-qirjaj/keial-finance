import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Language } from './types';
import { content } from './content';
import { PHONE_MOBILE, waLink } from './config';
import { SEO, canonicalUrl } from './lib/seo';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Calculator } from './components/Calculator';
import { Deadlines } from './components/Deadlines';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

/**
 * Albanian lives at /, English at /en/. Both are pre-rendered to static HTML at build time
 * (scripts/prerender.mjs), so `initialLanguage` comes from the page's address.
 */
export default function App({ initialLanguage }: { initialLanguage: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const c = content[language];

  // When the visitor switches language, move to that language's address and update the head to match.
  useEffect(() => {
    const seo = SEO[language];
    if (window.location.pathname !== seo.path || window.location.search) {
      window.history.replaceState(null, '', seo.path + window.location.hash);
    }
    document.documentElement.lang = language;
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl(language));
  }, [language]);

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <Services language={language} />
        <About language={language} />
        <Calculator language={language} />
        <Deadlines language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />

      {/* Phones only: call or WhatsApp in one tap. The page reserves its height (index.css), so it never covers content. */}
      <nav
        aria-label={language === 'en' ? 'Quick contact' : 'Kontakt i shpejtë'}
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-rule bg-white px-4 pt-2 md:hidden"
        style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))' }}
      >
        <a href={`tel:${PHONE_MOBILE.replace(/\s/g, '')}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-rule text-[15px] font-medium text-ink no-underline">
          <Phone size={17} strokeWidth={1.75} aria-hidden="true" />
          {c.contact.call}
        </a>
        <a href={waLink(c.contact.whatsappMessage)} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#1F8F55] text-[15px] font-medium text-white no-underline">
          <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
      </nav>
    </>
  );
}

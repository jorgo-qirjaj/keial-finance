import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Language } from './types';
import { content } from './content';
import { SITE_URL, PHONE_MOBILE, waLink } from './config';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Calculator } from './components/Calculator';
import { Deadlines } from './components/Deadlines';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  // Albanian by default; https://kei.al/?lang=en opens the English version.
  const [language, setLanguage] = useState<Language>(() =>
    new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'sq'
  );
  const c = content[language];

  // Keep the URL, <html lang>, <title> and canonical link in step with the chosen language.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (language === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);

    document.documentElement.lang = language;
    document.title = language === 'en'
      ? 'KEI-AL Auditing | Audit, Accounting and Tax in Vlorë, Albania'
      : 'KEI-AL Auditing | Auditim, Kontabilitet dhe Tatime në Vlorë';

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = language === 'en' ? `${SITE_URL}/?lang=en` : `${SITE_URL}/`;
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

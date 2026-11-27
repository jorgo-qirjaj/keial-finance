import { useEffect, useState } from 'react';
import { Language } from './types';
import { Phone } from 'lucide-react';
import { SITE_URL, WHATSAPP_URL, PHONE_MOBILE } from './config';
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

      {/* Phones only: a slim contact bar. The page reserves its height (see index.css), so it never covers content. */}
      <nav
        aria-label={language === 'en' ? 'Quick contact' : 'Kontakt i shpejtë'}
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-rule bg-white px-4 pt-2 md:hidden"
        style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))' }}
      >
        <a href={`tel:${PHONE_MOBILE.replace(/\s/g, '')}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-ink/80 text-[15px] font-medium text-ink no-underline">
          <Phone size={17} strokeWidth={1.75} aria-hidden="true" />
          {language === 'en' ? 'Call' : 'Telefononi'}
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-ink text-[15px] font-medium text-white no-underline">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.76 2.68 4.25 3.76.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
        </svg>
          WhatsApp
        </a>
      </nav>
    </>
  );
}

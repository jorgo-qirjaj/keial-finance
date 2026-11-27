/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Tools } from './components/Tools';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Language } from './types';
import { SITE_URL } from './config';
import { MessageSquare, ArrowUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Albanian by default; https://kei.al/?lang=en opens the English version.
  const [language, setLanguage] = useState<Language>(() =>
    new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'sq'
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Keep the URL, <html lang>, <title> and canonical link in step with the chosen language,
  // so the English version has its own shareable, indexable address.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (language === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);

    document.documentElement.lang = language;
    document.title = language === 'en'
      ? 'KEI-AL Auditing & Consulting | Audit, Accounting, Tax & Advisory in Vlorë, Albania'
      : 'KEI-AL Auditing & Consulting | Auditim, Finance, Tatime, Konsulencë në Vlorë & Shqipëri';

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = language === 'en' ? `${SITE_URL}/?lang=en` : `${SITE_URL}/`;
  }, [language]);

  // Monitor scroll for ScrollToTop capability
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 85; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-brand-white text-brand-dark selection:bg-brand-orange/20 selection:text-brand-dark antialiased">
      
      {/* Dynamic Header Navigation */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* Main Structural Layout Rows */}
      <main>
        {/* Hero Section */}
        <Hero language={language} onNavigate={handleNavigateToSection} />

        {/* About Section */}
        <About language={language} />

        {/* Services Section */}
        <Services language={language} />

        {/* Why Choose Us Section */}
        <WhyUs language={language} />

        {/* Financial Calculators & Rules Timeline of Resources Section */}
        <Tools language={language} />

        {/* Contact form & coordinates */}
        <Contact language={language} />
      </main>

      {/* Footer Section */}
      <Footer language={language} onNavigate={handleNavigateToSection} />

      {/* Floating Interactive Widget Group (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        
        {/* Floating Scroll to Top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              onClick={handleScrollToTop}
              className="w-11 h-11 rounded-full bg-brand-white border border-brand-border text-brand-dark flex items-center justify-center hover:scale-110 shadow-lg cursor-pointer transition-transform duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating High-Conversion WhatsApp CTA button */}
        <motion.a
          href="https://wa.me/355682095535"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 p-3 bg-[#25D366] text-white rounded-full hover:scale-105 shadow-xl shadow-[#25D366]/20 transition-all cursor-pointer group"
          title={language === 'sq' ? 'Na kontaktoni direkt në WhatsApp' : 'Contact Us on WhatsApp'}
        >
          {/* WhatsApp Text Slide out on Hover */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-sans font-bold text-xs pl-2 whitespace-nowrap">
            {language === 'sq' ? 'Konsultohuni në WhatsApp' : 'Chat on WhatsApp'}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <MessageSquare className="w-4.5 h-4.5 fill-white text-white" />
          </div>
        </motion.a>
      </div>

    </div>
  );
}

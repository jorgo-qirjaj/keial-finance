/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { Logo } from './Logo';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function Navbar({ language, setLanguage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[language].nav;

  // Track scroll position to change background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section
      const sections = ['about', 'services', 'why-us', 'tools', 'contact'];
      let currentSection = 'home';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      if (window.scrollY < 100) {
        currentSection = 'home';
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'why-us', label: t.whyUs },
    { id: 'tools', label: t.tools },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 80;
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

  return (
    <>
      <nav 
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav h-[72px]' 
            : 'bg-transparent h-[84px]'
        } flex items-center justify-between px-6 md:px-12`}
      >
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange/20 rounded-lg p-1"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-sans font-medium text-[14px] leading-5 tracking-wide cursor-pointer transition-colors px-1 py-1 relative ${
                activeSection === item.id 
                  ? 'text-brand-orange font-bold' 
                  : 'text-brand-mid hover:text-brand-orange'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange to-brand-purple rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Interactions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Button */}
          <div className="flex items-center bg-white/40 border border-[#E5E2DC]/50 rounded-full p-0.5 backdrop-blur-sm shadow-inner">
            <button
              onClick={() => setLanguage('sq')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                language === 'sq'
                  ? 'bg-brand-dark text-brand-white shadow-sm shadow-brand-dark/20'
                  : 'text-brand-text-muted hover:text-brand-dark'
              }`}
            >
              AL
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                language === 'en'
                  ? 'bg-brand-dark text-brand-white shadow-sm shadow-brand-dark/20'
                  : 'text-brand-text-muted hover:text-brand-dark'
              }`}
            >
              EN
            </button>
          </div>

          {/* Quick Consultation CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-orange to-[#D66AA2] text-brand-white text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.cta}</span>
          </button>

          {/* Mobile hamburger icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex lg:hidden p-2 rounded-xl border border-brand-border hover:bg-brand-light cursor-pointer text-brand-dark transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-dark z-40 lg:hidden"
            />

            {/* Menu container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white/70 backdrop-blur-xl border-l border-white/40 z-40 shadow-2xl pt-24 px-6 flex flex-col gap-6 lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left font-sans font-medium text-[16px] py-2 border-b border-white/20 hover:text-brand-orange transition-colors cursor-pointer ${
                      activeSection === item.id ? 'text-brand-orange font-bold border-brand-orange/30' : 'text-brand-dark'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto mb-12 flex flex-col gap-4">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
                  <Globe className="w-4 h-4 text-brand-orange text-brand-text-muted" />
                  <span className="text-xs font-semibold text-brand-text-muted">
                    {language === 'sq' ? 'Gjuha e Aktivizuar' : 'Active Language'}:
                  </span>
                  <span className="text-xs font-bold text-brand-dark ml-auto">
                    {language === 'sq' ? 'Shqip (AL)' : 'English (EN)'}
                  </span>
                </div>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 bg-brand-dark text-brand-white text-[14px] font-bold py-3.5 rounded-full hover:bg-brand-orange transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t.cta}</span>
                </button>
                
                <div className="text-center font-sans text-[10px] text-brand-text-muted">
                  NIPT: L37023201C · Vlorë
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

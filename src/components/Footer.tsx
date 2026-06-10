/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export function Footer({ language, onNavigate }: FooterProps) {
  const t = translations[language].footer;
  const navT = translations[language].nav;
  const svcT = translations[language].services;

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
  };

  return (
    <footer className="bg-brand-dark/95 backdrop-blur-md text-[#9999AF] py-16 border-t border-brand-mid/45">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 pb-12 border-b border-brand-mid/30">
          
          {/* Col 5: Brand presentation */}
          <div className="lg:col-span-5 space-y-6">
            <button 
              onClick={() => handleNavClick('home')} 
              className="cursor-pointer focus:outline-none p-1 rounded-lg"
            >
              {/* Force white-friendly typography for dark footer */}
              <Logo size="md" className="brightness-0 invert tracking-wide" />
            </button>
            <p className="font-sans font-light text-sm text-[#A0A1B9] leading-relaxed max-w-sm">
              {t.desc}
            </p>
          </div>

          {/* Col 3: Services shortcuts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-white">
              {t.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {svcT.items.map((svc) => (
                <li key={svc.id}>
                  <button 
                    onClick={() => handleNavClick('services')}
                    className="hover:text-brand-orange text-[#8C8DAB] transition-colors cursor-pointer text-left leading-normal"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick links & credentials */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-white">
              {t.linksTitle}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleNavClick('about')} className="hover:text-brand-orange text-[#8C8DAB] transition-colors cursor-pointer">
                    {navT.about}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('services')} className="hover:text-brand-orange text-[#8C8DAB] transition-colors cursor-pointer">
                    {navT.services}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('why-us')} className="hover:text-brand-orange text-[#8C8DAB] transition-colors cursor-pointer">
                    {navT.whyUs}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('tools')} className="hover:text-brand-orange text-[#8C8DAB] transition-colors cursor-pointer">
                    {navT.tools}
                  </button>
                </li>
              </ul>
              
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleNavClick('contact')} className="hover:text-brand-orange text-[#8C8DAB] transition-colors cursor-pointer">
                    {navT.contact}
                  </button>
                </li>
                <li>
                  <a href="https://www.facebook.com/keialauditing" target="_blank" rel="noreferrer" className="hover:text-brand-orange text-[#8C8DAB] transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/keialauditing" target="_blank" rel="noreferrer" className="hover:text-brand-orange text-[#8C8DAB] transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#7D7F9B]">
          <span>
            © 2026 KEI-AL Auditing SH.P.K. {t.legalDisclaimer}
          </span>
          <span className="text-[11px] text-[#696982]">
            {t.credits}
          </span>
        </div>

      </div>
    </footer>
  );
}

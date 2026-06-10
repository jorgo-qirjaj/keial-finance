/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ClipboardCheck, 
  Lock, 
  Zap, 
  MapPin, 
  Lightbulb, 
  Globe, 
  PhoneCall,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

const getWhyUsIcon = (iconName: string) => {
  const normClass = "w-6 h-6 text-brand-orange group-hover:scale-110 transition-transform duration-200";
  switch (iconName) {
    case 'award':
      return <Award className={normClass} />;
    case 'clipboard':
      return <ClipboardCheck className={normClass} />;
    case 'lock':
      return <Lock className={normClass} />;
    case 'zap':
      return <Zap className={normClass} />;
    case 'map':
      return <MapPin className={normClass} />;
    case 'lightbulb':
      return <Lightbulb className={normClass} />;
    case 'globe':
      return <Globe className={normClass} />;
    case 'phone':
      return <PhoneCall className={normClass} />;
    default:
      return null;
  }
};

interface WhyUsProps {
  language: Language;
}

export function WhyUs({ language }: WhyUsProps) {
  const t = translations[language].whyUs;

  return (
    <section id="why-us" className="py-20 md:py-28 bg-brand-dark/95 backdrop-blur-md text-brand-white relative overflow-hidden border-t border-brand-mid/50">
      
      {/* Decorative Orbs inside dark layout */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-brand-purple/10 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-orange/10 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Headers */}
        <div className="max-w-xl mb-16">
          <span className="font-sans font-bold text-xs tracking-[0.2em] text-brand-orange uppercase mb-4 block">
            {t.tag}
          </span>
          <h2 className="font-serif font-black text-3xl md:text-4xl text-brand-white leading-tight tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="font-sans font-light text-base text-[#9FA0B5] leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          {t.items.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-brand-dark/60 p-8 flex flex-col items-start hover:bg-brand-dark/30 transition-all group"
            >
              {/* Highlight Circle for icons */}
              <div className="w-12 h-12 rounded-2xl bg-brand-white/5 border border-brand-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-brand-orange/30 group-hover:bg-brand-orange/5 transition-all duration-200">
                {getWhyUsIcon(benefit.icon)}
              </div>

              {/* Text */}
              <h4 className="font-sans font-bold text-[16px] text-brand-white mb-2 group-hover:text-brand-orange transition-colors">
                {benefit.title}
              </h4>
              <p className="font-sans font-light text-xs md:text-sm text-[#A5A6BA] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Certification Callout Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-brand-orange/15 to-brand-purple/15 backdrop-blur-lg border border-brand-orange/25 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 rounded-full bg-brand-orange text-brand-white flex items-center justify-center shrink-0 shadow-lg">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-sans font-bold text-base text-brand-white mb-1">
                {language === 'sq' ? 'Auditim i Siguruar sipas Ligjit Nr. 25/2018' : 'Licensed Auditing per Law No. 25/2018'}
              </h5>
              <p className="font-sans text-xs text-[#BCBDD2]">
                {language === 'sq' 
                  ? 'Firma jonë mban të gjitha licencat profesionale zyrtare për dhënien e opinioneve të pavarura të auditit ligjor.' 
                  : 'Our firm retains full professional licenses to administer certified, independent legal audit reports.'
                }
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-brand-white hover:bg-brand-orange text-brand-dark hover:text-brand-white font-bold text-xs tracking-wide transition-all uppercase whitespace-nowrap"
          >
            {language === 'sq' ? 'Kërko ofertë' : 'Request Pricing'}
          </a>
        </motion.div>

      </div>
    </section>
  );
}

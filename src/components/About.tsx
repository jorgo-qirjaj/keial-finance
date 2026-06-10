/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { Logo } from './Logo';

interface AboutProps {
  language: Language;
}

export function About({ language }: AboutProps) {
  const t = translations[language].about;

  return (
    <section id="about" className="py-20 md:py-28 bg-white/10 backdrop-blur-sm border-y border-brand-border/30 relative overflow-hidden">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-orange/5 filter blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <span className="font-sans font-bold text-xs tracking-[0.2em] text-brand-orange uppercase mb-4">
            {t.tag}
          </span>
          <h2 className="font-serif font-black text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight mb-6">
            {t.title}
          </h2>
          <p className="font-sans font-light text-base md:text-lg text-brand-text-muted leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {t.pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl glass-card border border-brand-border/40 hover:shadow-xl hover:shadow-brand-orange/5 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-sm border border-brand-border/40 flex items-center justify-center text-3xl shadow-sm text-brand-dark group-hover:scale-110 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-all duration-300 mb-6">
                {pillar.icon}
              </div>
              <h4 className="font-sans font-bold text-lg text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">
                {pillar.title}
              </h4>
              <p className="font-sans font-light text-sm text-brand-text-muted leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

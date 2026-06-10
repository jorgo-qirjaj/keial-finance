/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export function Hero({ language, onNavigate }: HeroProps) {
  const t = translations[language].hero;

  const handleCtaClick = (sectionId: string) => {
    onNavigate(sectionId);
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div 
        className="absolute top-[-12%] right-[-12%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full filter blur-[110px] opacity-[0.14] pointer-events-none select-none"
        style={{ background: 'linear-gradient(135deg, #E8724A 0%, #9B6DB5 100%)' }}
      />
      <div 
        className="absolute bottom-[-15%] left-[10%] w-[350px] h-[350px] rounded-full filter blur-[90px] opacity-[0.08] pointer-events-none select-none"
        style={{ background: '#3DAA6A' }}
      />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center mt-8 md:mt-12">
        
        {/* Dynamic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8724A]/10 backdrop-blur-md border border-[#E8724A]/25 text-[#E8724A] text-xs md:text-sm font-bold tracking-wide mb-8 shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span>{t.badge}</span>
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-brand-dark leading-[1.15] tracking-tight mb-6"
        >
          {t.title1} <br />
          <span className="bg-gradient-to-r from-brand-orange via-[#D66AA2] to-brand-purple bg-clip-text text-transparent font-black">
            {t.titleAccent}
          </span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans font-light text-base md:text-[18px] text-brand-text-muted leading-relaxed max-w-2xl mb-10"
        >
          {t.sub}
        </motion.p>

        {/* Interaction CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <button
            onClick={() => handleCtaClick('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-dark hover:bg-brand-orange text-brand-white font-bold text-sm tracking-wide shadow-lg shadow-brand-dark/15 hover:shadow-brand-orange/20 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{t.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleCtaClick('services')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#E5E2DC]/60 hover:border-brand-orange hover:text-brand-orange text-brand-dark font-medium text-sm tracking-wide bg-white/40 backdrop-blur-md transition-all cursor-pointer shadow-sm"
          >
            {t.ctaSecondary}
          </button>
        </motion.div>

        {/* Statistics highlights bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 w-full glass-card rounded-2xl p-6 md:p-8 shadow-xl shadow-brand-dark/5"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 group">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-brand-orange/10 text-brand-orange">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="font-serif font-black text-3xl text-brand-dark bg-gradient-to-r from-brand-orange to-[#D66AA2] bg-clip-text text-transparent">
                10+
              </span>
            </div>
            <span className="font-sans font-medium text-[13px] text-brand-text-muted">
              {t.statYears}
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 sm:border-x border-brand-border/60 group">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-brand-purple/10 text-brand-purple">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-serif font-black text-3xl text-brand-dark bg-gradient-to-r from-brand-purple to-[#BF94E4] bg-clip-text text-transparent">
                5
              </span>
            </div>
            <span className="font-sans font-medium text-[13px] text-brand-text-muted">
              {t.statServices}
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 group">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-[#3DAA6A]/10 text-[#3DAA6A]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-serif font-black text-3xl text-brand-dark bg-gradient-to-r from-[#21c062] to-[#BFCE57] bg-clip-text text-transparent">
                ISA / SNRF
              </span>
            </div>
            <span className="font-sans font-medium text-[13px] text-brand-text-muted">
              {t.statStandards}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

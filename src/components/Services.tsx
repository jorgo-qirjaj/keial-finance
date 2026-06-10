/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, X, ShieldAlert, BarChart3, Search, Users, Receipt, Briefcase } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

const getServiceIcon = (iconName: string, className?: string) => {
  const normClass = className || "w-6 h-6";
  switch (iconName) {
    case 'bar-chart':
      return <BarChart3 className={normClass} />;
    case 'search':
      return <Search className={normClass} />;
    case 'users':
      return <Users className={normClass} />;
    case 'receipt':
      return <Receipt className={normClass} />;
    case 'briefcase':
      return <Briefcase className={normClass} />;
    default:
      return null;
  }
};

interface ServicesProps {
  language: Language;
}

export function Services({ language }: ServicesProps) {
  const t = translations[language].services;
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = t.items.find(item => item.id === selectedServiceId);

  return (
    <section id="services" className="py-20 md:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Headers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-sans font-bold text-xs tracking-[0.2em] text-brand-orange uppercase mb-4 block">
              {t.tag}
            </span>
            <h2 className="font-serif font-black text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight">
              {t.title}
            </h2>
          </div>
          <p className="font-sans font-light text-base text-brand-text-muted leading-relaxed max-w-sm md:text-right">
            {t.sub}
          </p>
        </div>

        {/* Services Bento-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((svc, index) => {
            // Apply different accent color styles depending on service number
            const colorClass = 
              index === 0 ? 'bg-brand-orange/10 text-brand-orange text-orange-border' :
              index === 1 ? 'bg-brand-purple/10 text-brand-purple text-purple-border' :
              index === 2 ? 'bg-[#3DAA6A]/10 text-[#3DAA6A]' :
              index === 3 ? 'bg-[#2E8BC0]/10 text-[#2E8BC0]' :
              'bg-[#E5A93C]/10 text-[#E5A93C]';

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative glass-card rounded-2xl p-8 hover:shadow-2xl hover:shadow-brand-orange/10 transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={() => setSelectedServiceId(svc.id)}
              >
                {/* Visual Top Highlight Strip on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-brand-purple to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Header row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif font-black text-xs md:text-sm text-brand-orange tracking-wider">
                      {svc.num} —
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${colorClass}`}>
                      {getServiceIcon(svc.icon, "w-6 h-6")}
                    </div>
                  </div>

                  {/* Title & Core description */}
                  <h3 className="font-sans font-extrabold text-[18px] md:text-[20px] text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">
                    {svc.title}
                  </h3>
                  <p className="font-sans font-light text-sm text-brand-text-muted leading-relaxed mb-6 line-clamp-3">
                    {svc.description}
                  </p>
                </div>

                {/* Sub Bulletpoints (Hidden on very compact, shown cleanly) */}
                <div className="border-t border-brand-light pt-4 mt-6">
                  <ul className="space-y-2.5 mb-6">
                    {svc.points.slice(0, 2).map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex gap-2.5 text-xs text-brand-mid items-start">
                        <Check className="w-3.5 h-3.5 text-[#3DAA6A] shrink-0 mt-0.5" />
                        <span className="font-sans leading-tight line-clamp-1">{pt}</span>
                      </li>
                    ))}
                    {svc.points.length > 2 && (
                      <li className="text-[11px] font-bold text-brand-orange flex items-center gap-1 mt-1 font-sans">
                        <span>+ {svc.points.length - 2} {language === 'sq' ? 'procedura të tjera' : 'additional procedures'}</span>
                      </li>
                    )}
                  </ul>

                  {/* View Details Action Label */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:text-brand-orange transition-colors">
                    <span>{language === 'sq' ? 'Shiko Detajet' : 'Explore Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expandable details dynamic modal/overlay */}
        <AnimatePresence>
          {selectedServiceId && selectedService && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-brand-dark z-50 backdrop-blur-sm cursor-pointer"
                onClick={() => setSelectedServiceId(null)}
              />

              {/* Detail drawer container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-x-4 bottom-4 md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl glass-card rounded-3xl p-8 md:p-10 z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Header info */}
                <div className="flex items-start justify-between mb-6 border-b border-brand-light pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-xl">
                      {getServiceIcon(selectedService.icon, "w-6 h-6 text-brand-dark")}
                    </div>
                    <div>
                      <span className="font-serif text-xs font-bold text-brand-orange tracking-widest block uppercase">
                        {selectedService.num} — {language === 'sq' ? 'Klasa e Shërbimit' : 'Service Domain'}
                      </span>
                      <h3 className="font-serif font-black text-xl md:text-2xl text-brand-dark mt-0.5">
                        {selectedService.title}
                      </h3>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedServiceId(null)}
                    className="p-1.5 rounded-lg border border-brand-border hover:bg-brand-light transition-colors text-brand-dark cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scope body */}
                <div className="space-y-6">
                  <div>
                    <h5 className="font-sans font-bold text-xs uppercase text-brand-text-muted tracking-wider mb-2">
                      {language === 'sq' ? 'Prezantim Përmbledhës' : 'Practice Summary'}
                    </h5>
                    <p className="font-sans font-light text-[15px] text-brand-mid leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-sans font-bold text-xs uppercase text-brand-text-muted tracking-wider mb-3">
                      {language === 'sq' ? 'Procedurat & Shërbimet e Përfshira' : 'Specific Included Mandates'}
                    </h5>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedService.points.map((pt, ptIdx) => (
                        <div key={ptIdx} className="flex gap-3 items-start p-3 rounded-xl bg-brand-light border border-brand-border/30">
                          <Check className="w-4 h-4 text-[#3DAA6A] shrink-0 mt-0.5" />
                          <span className="font-sans text-sm font-medium text-brand-dark leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Regulatory standards disclaimer */}
                  <div className="p-3 bg-brand-orange/5 border border-brand-orange/20 rounded-xl flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-brand-orange shrink-0" />
                    <span className="font-sans text-[11px] text-brand-orange font-medium leading-normal">
                      {language === 'sq' 
                        ? 'Të gjitha procedurat kryhen në sinkron me QKB, Administratën Tatimore dhe standardet ISA.' 
                        : 'All compliance directives are fully integrated with QKB registry, tax offices, and ISA protocols.'
                      }
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-light flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedServiceId(null)}
                    className="px-5 py-2 rounded-full border border-brand-border text-brand-dark font-semibold text-xs hover:bg-brand-light transition-all cursor-pointer"
                  >
                    {language === 'sq' ? 'Mbyll' : 'Dismiss'}
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedServiceId(null)}
                    className="px-5 py-2 rounded-full bg-brand-dark hover:bg-brand-orange text-brand-white font-bold text-xs transition-all flex items-center justify-center"
                  >
                    {language === 'sq' ? 'Konsultohu Tani' : 'Inquire Now'}
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

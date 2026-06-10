/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Calendar, Info, CheckSquare } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ToolsProps {
  language: Language;
}

export function Tools({ language }: ToolsProps) {
  const t = translations[language].tools;
  const [calcType, setCalcType] = useState<'salary' | 'dividend'>('salary');
  
  // Inputs
  const [grossInput, setGrossInput] = useState<number>(80000);
  const [dividendInput, setDividendInput] = useState<number>(1000000);

  // Math calculation variables
  const handleGrossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setGrossInput(val >= 0 ? val : 0);
  };

  const handleDividendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDividendInput(val >= 0 ? val : 0);
  };

  // ─── ALBANIAN FISCAL MATH ESTIMATOR (Approx for 2026) ───
  // Social Security limit caps (estimated for 2026: Min wage 40,000 ALL, Max wage base 176,416 ALL)
  const minSocialBase = 40000;
  const maxSocialBase = 176416;

  const currentSalaryBaseForSocial = Math.max(minSocialBase, Math.min(grossInput, maxSocialBase));

  // Deductions
  const socialEmployer = Math.round(currentSalaryBaseForSocial * 0.150);
  const socialEmployee = Math.round(currentSalaryBaseForSocial * 0.095);

  const healthEmployer = Math.round(grossInput * 0.017);
  const healthEmployee = Math.round(grossInput * 0.017);

  // Progressive Tax (TAP) Estimation:
  // Base 0 - 50,000: 0%
  // 50,000 - 60,000: 13% on amount above 50,000 (simplified)
  // 60,000 - 200,000: 13% on amount above 30,000
  // Above 200,000: 22,100 + 23% on amount above 200,000
  let tapTax = 0;
  if (grossInput > 200000) {
    tapTax = 22100 + Math.round((grossInput - 200000) * 0.23);
  } else if (grossInput > 60000) {
    tapTax = Math.round((grossInput - 30000) * 0.13);
  } else if (grossInput > 50000) {
    tapTax = Math.round((grossInput - 50000) * 0.13);
  }

  const employeeTotalDeductions = socialEmployee + healthEmployee + tapTax;
  const estimatedNetSalary = Math.max(0, grossInput - employeeTotalDeductions);

  // Dividend computations
  const dividendTax = Math.round(dividendInput * 0.08); // 8% dividend tax rate
  const netDividendPayout = Math.max(0, dividendInput - dividendTax);

  return (
    <section id="tools" className="py-20 md:py-28 bg-transparent border-b border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Headers */}
        <div className="max-w-3xl mb-16">
          <span className="font-sans font-bold text-xs tracking-[0.2em] text-brand-orange uppercase mb-4 block">
            {t.tag}
          </span>
          <h2 className="font-serif font-black text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="font-sans font-light text-base md:text-lg text-brand-text-muted leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* 1. Large, Full-Width Calculator (12-cols or centered) */}
        <div className="w-full glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-brand-border/40 mb-16 relative overflow-hidden">
          {/* Subtle design decor background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-border/40 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shadow-inner">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl md:text-2xl text-brand-dark">
                  {t.calcTitle}
                </h3>
                <p className="font-sans font-light text-xs text-brand-text-muted mt-0.5">
                  {t.calcDesc}
                </p>
              </div>
            </div>

            {/* Selector Segment Tabs (Desktop Right, Mobile full-width) */}
            <div className="flex bg-white/40 p-1.5 rounded-2xl border border-brand-border/30 backdrop-blur-sm shadow-inner min-w-[280px]">
              <button
                onClick={() => setCalcType('salary')}
                className={`flex-1 font-sans font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer ${
                  calcType === 'salary'
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'text-brand-text-muted hover:text-brand-dark'
                }`}
              >
                {t.typeSalary}
              </button>
              <button
                onClick={() => setCalcType('dividend')}
                className={`flex-1 font-sans font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer ${
                  calcType === 'dividend'
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'text-brand-text-muted hover:text-brand-dark'
                }`}
              >
                {t.typeDividend}
              </button>
            </div>
          </div>

          {/* Interactive Calculator split screen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Side: Controls (7 columns) */}
            <div className="lg:col-span-7 space-y-8">
              <AnimatePresence mode="wait">
                {calcType === 'salary' ? (
                  <motion.div
                    key="salary-inputs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <label className="font-sans font-bold text-sm text-brand-dark">
                        {t.salaryLabel}
                      </label>
                      
                      <div className="relative max-w-[240px]">
                        <input
                          type="number"
                          value={grossInput}
                          onChange={handleGrossChange}
                          step="5000"
                          min="40000"
                          className="w-full pl-4 pr-12 py-3 rounded-xl border border-brand-border bg-white text-brand-dark font-sans font-bold focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none shadow-sm transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-text-muted">
                          ALL
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="range"
                        min={40000}
                        max={300000}
                        step={5000}
                        value={grossInput}
                        onChange={handleGrossChange}
                        className="w-full accent-brand-orange h-1.5 bg-brand-border/40 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-xs font-semibold text-brand-text-muted">
                        <span>Min: 40,000 ALL</span>
                        <span>Max: 300,000 ALL</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="dividend-inputs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <label className="font-sans font-bold text-sm text-brand-dark">
                        {t.dividendLabel}
                      </label>
                      
                      <div className="relative max-w-[240px]">
                        <input
                          type="number"
                          value={dividendInput}
                          onChange={handleDividendChange}
                          step="50000"
                          min="50000"
                          className="w-full pl-4 pr-12 py-3 rounded-xl border border-brand-border bg-white text-brand-dark font-sans font-bold focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none shadow-sm transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-text-muted">
                          ALL
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="range"
                        min={50000}
                        max={10000000}
                        step={50000}
                        value={dividendInput}
                        onChange={handleDividendChange}
                        className="w-full accent-brand-orange h-1.5 bg-brand-border/40 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-xs font-semibold text-brand-text-muted">
                        <span>Min: 50,000 ALL</span>
                        <span>Max: 10,000,000 ALL</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Disclaimer footnote */}
              <div className="p-4 rounded-2xl bg-white/40 border border-brand-border/40 flex gap-3 backdrop-blur-sm shadow-sm">
                <Info className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-brand-text-muted leading-relaxed">
                  {t.disclaimer}
                </p>
              </div>
            </div>

            {/* Right Side: Calculated Dashboard (5 columns) */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-white/40 border border-brand-border/40 backdrop-blur-md shadow-inner">
              <h4 className="font-sans font-bold text-xs text-brand-text-muted uppercase tracking-widest mb-6 border-b border-brand-border pb-3">
                {t.resultTitle}
              </h4>

              <AnimatePresence mode="wait">
                {calcType === 'salary' ? (
                  <motion.div 
                    key="salary-results" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-sm font-sans text-brand-dark"
                  >
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-border/40">
                      <span className="text-brand-text-muted text-xs">{t.resSocialEmp}</span>
                      <span className="font-semibold text-brand-dark">{socialEmployer.toLocaleString()} ALL</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-border/40">
                      <span className="text-brand-text-muted text-xs">{t.resSocialWork}</span>
                      <span className="font-semibold text-brand-dark">{socialEmployee.toLocaleString()} ALL</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-border/40">
                      <span className="text-brand-text-muted text-xs">{t.resHealthEmp}</span>
                      <span className="font-semibold text-brand-dark">{healthEmployer.toLocaleString()} ALL</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-border/40">
                      <span className="text-brand-text-muted text-xs">{t.resHealthWork}</span>
                      <span className="font-semibold text-brand-dark">{healthEmployee.toLocaleString()} ALL</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-border/40">
                      <span className="text-brand-text-muted text-xs">{t.resTax}</span>
                      <span className="font-semibold text-brand-orange">{tapTax.toLocaleString()} ALL</span>
                    </div>
                    
                    <div className="pt-6 mt-4 flex flex-col gap-2">
                      <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">{t.resNetSalary}</span>
                      <span className="text-2xl md:text-3xl font-black text-brand-orange leading-none">
                        {estimatedNetSalary.toLocaleString()} ALL
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="dividend-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-sm font-sans text-brand-dark"
                  >
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-border/40">
                      <span className="text-brand-text-muted text-xs">{t.dividendLabel}</span>
                      <span className="font-semibold text-brand-dark">{dividendInput.toLocaleString()} ALL</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-border/40">
                      <span className="text-brand-text-muted text-xs">{t.resDivTax}</span>
                      <span className="font-semibold text-brand-orange">{dividendTax.toLocaleString()} ALL</span>
                    </div>

                    <div className="pt-6 mt-4 flex flex-col gap-2">
                      <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">{t.resDivNet}</span>
                      <span className="text-2xl md:text-3xl font-black text-brand-orange leading-none">
                        {netDividendPayout.toLocaleString()} ALL
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>

        {/* 2. Smaller, Horizontal Compliance Timeline Grid below Calculator */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange shadow-inner">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-black text-lg md:text-xl text-brand-dark">
                {t.checkpointsTitle}
              </h3>
            </div>
            <p className="font-sans font-light text-xs md:text-sm text-brand-text-muted max-w-md">
              {t.checkpointsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.checkpoints.map((cp, idx) => (
              <div 
                key={idx} 
                className="glass-card rounded-2xl p-6 border border-brand-border/30 hover:shadow-lg hover:border-brand-orange/30 transition-all group relative overflow-hidden"
              >
                {/* Subtle continuous indicator tag */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange/30 to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-9 h-9 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <CheckSquare className="w-4.5 h-4.5" />
                </div>
                
                <h5 className="font-sans font-bold text-sm text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">
                  {cp.title}
                </h5>
                <p className="font-sans font-light text-xs text-brand-text-muted leading-relaxed">
                  {cp.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

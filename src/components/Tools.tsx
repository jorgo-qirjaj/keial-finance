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
        <div className="max-w-xl mb-16">
          <span className="font-sans font-bold text-xs tracking-[0.2em] text-brand-orange uppercase mb-4 block">
            {t.tag}
          </span>
          <h2 className="font-serif font-black text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="font-sans font-light text-base text-brand-text-muted leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Double-grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Grid: Calculator Container (Cols 7) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-dark/5">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-brand-orange" />
              <h3 className="font-serif font-black text-lg md:text-xl text-brand-dark">
                {t.calcTitle}
              </h3>
            </div>
            
            <p className="font-sans font-light text-xs md:text-sm text-brand-text-muted mb-6 leading-relaxed">
              {t.calcDesc}
            </p>

            {/* Selector Segment Tabs */}
            <div className="flex bg-white/40 p-1 rounded-xl mb-8 border border-[#E5E2DC]/40 backdrop-blur-sm shadow-inner">
              <button
                onClick={() => setCalcType('salary')}
                className={`flex-1 font-sans font-bold text-xs md:text-[13px] py-3 rounded-lg transition-all cursor-pointer ${
                  calcType === 'salary'
                    ? 'bg-white text-brand-dark shadow-sm'
                    : 'text-brand-text-muted hover:text-brand-dark'
                }`}
              >
                {t.typeSalary}
              </button>
              <button
                onClick={() => setCalcType('dividend')}
                className={`flex-1 font-sans font-bold text-xs md:text-[13px] py-3 rounded-lg transition-all cursor-pointer ${
                  calcType === 'dividend'
                    ? 'bg-white text-brand-dark shadow-sm'
                    : 'text-brand-text-muted hover:text-brand-dark'
                }`}
              >
                {t.typeDividend}
              </button>
            </div>

            {/* Inputs & Outputs panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Calculator Inputs (Left) */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {calcType === 'salary' ? (
                    <motion.div
                      key="salary-inputs"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <label className="font-sans font-bold text-xs text-brand-mid block">
                        {t.salaryLabel}
                      </label>
                      <input
                        type="number"
                        value={grossInput}
                        onChange={handleGrossChange}
                        step="5000"
                        min="40000"
                        className="w-full px-4 py-3 rounded-xl glass-input text-brand-dark font-sans font-semibold focus:border-brand-orange focus:bg-white outline-none shadow-sm transition-all"
                      />
                      <input
                        type="range"
                        min={40000}
                        max={300000}
                        step={5000}
                        value={grossInput}
                        onChange={handleGrossChange}
                        className="w-full accent-brand-orange cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-brand-text-muted">
                        <span>Min: 40,000 ALL</span>
                        <span>Max: 300,000 ALL</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dividend-inputs"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <label className="font-sans font-bold text-xs text-brand-mid block">
                        {t.dividendLabel}
                      </label>
                      <input
                        type="number"
                        value={dividendInput}
                        onChange={handleDividendChange}
                        step="50000"
                        min="50000"
                        className="w-full px-4 py-3 rounded-xl glass-input text-brand-dark font-sans font-semibold focus:border-brand-orange focus:bg-white outline-none shadow-sm transition-all"
                      />
                      <input
                        type="range"
                        min={50000}
                        max={10000000}
                        step={50000}
                        value={dividendInput}
                        onChange={handleDividendChange}
                        className="w-full accent-brand-purple cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-brand-text-muted">
                        <span>Min: 50,000 ALL</span>
                        <span>Max: 10,000,000 ALL</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dynamic Calculations results (Right) */}
              <div className="p-5 rounded-2xl bg-white/40 border border-[#E5E2DC]/50 backdrop-blur-md shadow-inner">
                <h4 className="font-sans font-bold text-xs text-brand-text-muted uppercase tracking-wider mb-4 border-b border-brand-border pb-2">
                  {t.resultTitle}
                </h4>

                <AnimatePresence mode="wait">
                  {calcType === 'salary' ? (
                    <motion.div 
                      key="salary-results" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 text-xs font-sans text-brand-dark"
                    >
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">{t.resSocialEmp}</span>
                        <span className="font-bold">{socialEmployer.toLocaleString()} ALL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">{t.resSocialWork}</span>
                        <span className="font-bold">{socialEmployee.toLocaleString()} ALL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">{t.resHealthEmp}</span>
                        <span className="font-bold">{healthEmployer.toLocaleString()} ALL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">{t.resHealthWork}</span>
                        <span className="font-bold">{healthEmployee.toLocaleString()} ALL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">{t.resTax}</span>
                        <span className="font-bold text-brand-orange">{tapTax.toLocaleString()} ALL</span>
                      </div>
                      
                      <div className="pt-3 border-t border-brand-border/65 flex justify-between font-bold text-sm text-brand-dark">
                        <span>{t.resNetSalary}</span>
                        <span className="text-brand-dark font-black px-2 py-0.5 rounded bg-brand-orange/10 text-brand-orange">
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
                      className="space-y-3 text-xs font-sans text-brand-dark"
                    >
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">{t.dividendLabel}</span>
                        <span className="font-bold">{dividendInput.toLocaleString()} ALL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">{t.resDivTax}</span>
                        <span className="font-bold text-brand-orange">{dividendTax.toLocaleString()} ALL</span>
                      </div>

                      <div className="pt-3 border-t border-brand-border/65 flex justify-between font-bold text-sm text-brand-dark">
                        <span>{t.resDivNet}</span>
                        <span className="text-brand-dark font-black px-2 py-0.5 rounded bg-brand-purple/10 text-brand-purple">
                          {netDividendPayout.toLocaleString()} ALL
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Disclaimer disclaimer footnote */}
            <div className="mt-8 p-3 rounded-xl bg-white/30 border border-[#E5E2DC]/30 flex gap-2 backdrop-blur-sm">
              <Info className="w-4 h-4 text-brand-text-muted shrink-0 mt-0.5" />
              <p className="font-sans text-[11px] text-brand-text-muted leading-relaxed">
                {t.disclaimer}
              </p>
            </div>
          </div>

          {/* Right Grid: Compliance Timelines (Cols 5) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-dark/5">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-brand-purple" />
              <h3 className="font-serif font-black text-lg md:text-xl text-brand-dark">
                {t.checkpointsTitle}
              </h3>
            </div>
            
            <p className="font-sans font-light text-xs md:text-sm text-brand-text-muted mb-8 leading-relaxed">
              {t.checkpointsDesc}
            </p>

            <div className="space-y-6">
              {t.checkpoints.map((cp, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-5 border-b border-brand-light last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center shrink-0">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-[14px] text-brand-dark mb-1">
                      {cp.title}
                    </h5>
                    <p className="font-sans font-light text-xs text-brand-text-muted leading-relaxed">
                      {cp.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

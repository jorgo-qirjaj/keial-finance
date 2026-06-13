/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Facebook, Instagram } from 'lucide-react';
import { Language, ContactFormData } from '../types';
import { translations } from '../translations';

interface ContactProps {
  language: Language;
}

export function Contact({ language }: ContactProps) {
  const t = translations[language].contact;
  
  // State
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    email: '',
    service: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick local validations
    if (!formData.fullName || !formData.email || !formData.message) {
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');

    // Simulate API submission server delay
    setTimeout(() => {
      setFormStatus('success');
      // Clear fields on success
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        service: '',
        message: ''
      });
      
      // Auto fade success message in 8s
      setTimeout(() => {
        setFormStatus('idle');
      }, 8000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent relative">
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

        {/* Form & Coordinates Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Coordinates Grid (Cols 5) */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Practical details boxes */}
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-white/40 border border-white/50 backdrop-blur-sm flex items-center justify-center text-brand-orange shrink-0 shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-dark mb-1">{t.addressLabel}</h4>
                  <p className="font-sans font-light text-sm text-brand-text-muted leading-relaxed">
                    {t.addressText}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-white/40 border border-white/50 backdrop-blur-sm flex items-center justify-center text-brand-orange shrink-0 shadow-inner">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-dark mb-1">{t.phoneLabel}</h4>
                  <p className="font-sans font-light text-sm text-brand-text-muted leading-relaxed">
                    {t.phoneText}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-white/40 border border-white/50 backdrop-blur-sm flex items-center justify-center text-brand-orange shrink-0 shadow-inner">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-dark mb-1">{t.emailLabel}</h4>
                  <p className="font-sans font-light text-sm text-brand-text-muted select-all">
                    <a 
                      href={`mailto:${t.emailText}`} 
                      className="hover:text-brand-orange hover:underline transition-all duration-200"
                    >
                      {t.emailText}
                    </a>
                  </p>
                </div>
              </div>

              {/* Clock Hours */}
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-white/40 border border-white/50 backdrop-blur-sm flex items-center justify-center text-brand-orange shrink-0 shadow-inner">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-dark mb-1">{t.hoursLabel}</h4>
                  <p className="font-sans font-light text-sm text-brand-text-muted">
                    {t.hoursText}
                  </p>
                </div>
              </div>

            </div>

            {/* Social Channels Quick links */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.facebook.com/keialauditing" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/40 hover:border-brand-orange text-brand-dark text-xs font-bold bg-white/30 backdrop-blur-sm hover:bg-brand-orange/5 transition-all group"
              >
                <Facebook className="w-4 h-4 text-brand-dark group-hover:text-brand-orange transition-colors duration-200" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/keialauditing" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/40 hover:border-brand-orange text-brand-dark text-xs font-bold bg-white/30 backdrop-blur-sm hover:bg-brand-orange/5 transition-all group"
              >
                <Instagram className="w-4 h-4 text-brand-dark group-hover:text-brand-orange transition-colors duration-200" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Google map iframe wrapper */}
            <div className="rounded-2xl overflow-hidden glass-card shadow-lg">
              <div className="bg-white/40 px-4 py-2 border-b border-[#E5E2DC]/50 flex items-center justify-between text-xs font-bold text-brand-text-muted backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{t.mapLabel}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              </div>
              <iframe
                title="KEI-AL Auditing Office Location Map"
                src="https://maps.google.com/maps?q=Lagjja%2029%20Nentori%2C%20Vlore%2C%20Albania&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Side: Interactive Client inquiry Form (Cols 7) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-dark/5">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-brand-orange" />
              <h3 className="font-serif font-black text-lg md:text-xl text-brand-dark">
                {t.formTitle}
              </h3>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="font-sans font-bold text-xs text-brand-mid block">
                    {t.formName} *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={t.formNamePh}
                    className="w-full px-4 py-3 rounded-xl glass-input text-brand-dark font-sans text-sm focus:border-brand-orange focus:bg-white outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="companyName" className="font-sans font-bold text-xs text-brand-mid block">
                    {t.formCompany}
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={t.formCompanyPh}
                    className="w-full px-4 py-3 rounded-xl glass-input text-brand-dark font-sans text-sm focus:border-brand-orange focus:bg-white outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Row 2: Email and Service select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-sans font-bold text-xs text-brand-mid block">
                    {t.formEmail} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.formEmailPh}
                    className="w-full px-4 py-3 rounded-xl glass-input text-brand-dark font-sans text-sm focus:border-brand-orange focus:bg-white outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="service" className="font-sans font-bold text-xs text-brand-mid block">
                    {t.formService}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-brand-dark font-sans text-sm focus:border-brand-orange focus:bg-white outline-none transition-all shadow-sm appearance-none"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B6B80%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px top 50%', backgroundSize: '10px' }}
                  >
                    <option value="">{t.formServicePh}</option>
                    <option value="accounting">{translations[language].services.items[0].title}</option>
                    <option value="audit">{translations[language].services.items[1].title}</option>
                    <option value="payroll">{translations[language].services.items[2].title}</option>
                    <option value="tax">{translations[language].services.items[3].title}</option>
                    <option value="other">{translations[language].services.items[4].title}</option>
                  </select>
                </div>
              </div>

              {/* Message field */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="font-sans font-bold text-xs text-brand-mid block">
                  {t.formMsg} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.formMsgPh}
                  className="w-full px-4 py-3 rounded-xl glass-input text-brand-dark font-sans text-sm focus:border-brand-orange focus:bg-white outline-none resize-y transition-all shadow-sm"
                />
              </div>

              {/* Status Signals Alerts */}
              <AnimatePresence mode="wait">
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-[#3DAA6A]/10 border border-[#3DAA6A]/20 text-[#3DAA6A] text-xs font-medium flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{t.formSuccess}</span>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-medium flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{t.formError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full py-4 mt-2 rounded-xl bg-brand-dark hover:bg-brand-orange disabled:bg-brand-text-muted text-brand-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-brand-orange/10 cursor-pointer flex items-center justify-center gap-2"
              >
                {formStatus === 'loading' ? (
                  <span className="w-5 h-5 border-2 border-brand-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.formSubmit}</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

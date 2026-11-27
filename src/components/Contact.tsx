import { useState, type FormEvent } from 'react';
import { Language, ContactFormData } from '../types';
import { content } from '../content';
import { CONTACT_EMAIL, WHATSAPP_URL, PHONE_MOBILE, PHONE_OFFICE, MAPS_URL } from '../config';
import { Section, SectionHeader } from './ui';
import { Input } from './arc/input/input';
import { Textarea } from './arc/textarea/textarea';
import { Select } from './arc/select/select';
import { Button } from './arc/button/button';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'sendError';
const EMPTY: ContactFormData = { fullName: '', companyName: '', email: '', service: '', message: '' };

export function Contact({ language }: { language: Language }) {
  const c = content[language];
  const t = c.contact;
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof ContactFormData) => (value: string) => setForm((f) => ({ ...f, [key]: value }));
  const missing = status === 'error';

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('success');
        setForm(EMPTY);
        return;
      }
      setStatus(res.status === 422 ? 'error' : 'sendError');
    } catch {
      setStatus('sendError');
    }
  }

  const details = [
    {
      label: t.address,
      body: (
        <>
          {t.addressText}
          <br />
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-[14px] text-ledger underline underline-offset-2">{t.mapLink}</a>
        </>
      ),
    },
    {
      label: t.phone,
      body: (
        <>
          <a href={`tel:${PHONE_MOBILE.replace(/\s/g, '')}`} className="num no-underline text-ink">{PHONE_MOBILE}</a>
          <br />
          <a href={`tel:${PHONE_OFFICE.replace(/\s/g, '')}`} className="num no-underline text-ink">{PHONE_OFFICE}</a>
        </>
      ),
    },
    { label: t.whatsapp, body: <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="num no-underline text-ink">{PHONE_MOBILE}</a> },
    { label: t.email, body: <a href={`mailto:${CONTACT_EMAIL}`} className="no-underline text-ink break-all">{CONTACT_EMAIL}</a> },
    { label: t.hours, body: t.hoursText },
  ];

  return (
    <Section id="contact">
      <SectionHeader title={t.title} sub={t.sub} />
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <dl className="min-w-0 border-t border-ink/90">
          {details.map((d) => (
            <div key={d.label} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-rule py-4">
              <dt className="text-[14px] text-muted">{d.label}</dt>
              <dd className="text-[15px]">{d.body}</dd>
            </div>
          ))}
        </dl>

        <form onSubmit={submit} noValidate className="relative min-w-0 space-y-5 rounded-[8px] border border-rule p-5 md:p-8">
          <h3 className="text-[18px] font-semibold">{t.formTitle}</h3>

          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="fullName"
              name="fullName"
              label={t.formName}
              autoComplete="name"
              required
              value={form.fullName}
              onChange={(e) => set('fullName')(e.target.value)}
              error={missing && !form.fullName.trim() ? t.required : undefined}
            />
            <Input
              id="companyName"
              name="companyName"
              label={t.formCompany}
              autoComplete="organization"
              value={form.companyName}
              onChange={(e) => set('companyName')(e.target.value)}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="email"
              name="email"
              type="email"
              label={t.formEmail}
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => set('email')(e.target.value)}
              error={missing && !form.email.trim() ? t.required : undefined}
            />
            <Select
              id="service"
              label={t.formService}
              placeholder={t.formServicePh}
              value={form.service}
              onValueChange={set('service')}
              options={c.services.items.map((s) => ({ value: s.id, label: s.title }))}
            />
          </div>
          <Textarea
            id="message"
            name="message"
            label={t.formMsg}
            placeholder={t.formMsgPh}
            rows={5}
            required
            value={form.message}
            onChange={(e) => set('message')(e.target.value)}
            error={missing && !form.message.trim() ? t.required : undefined}
          />

          <div role="status" aria-live="polite" className="text-[14px]">
            {status === 'success' && <p className="rounded-[6px] bg-ledger/10 px-4 py-3 text-ledger">{t.formSuccess}</p>}
            {status === 'error' && <p className="text-[#B3392B]">{t.formError}</p>}
            {status === 'sendError' && (
              <p className="rounded-[6px] bg-[#B3392B]/8 px-4 py-3 text-[#8E2A1F]">
                {t.formSendError}{' '}
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="font-medium underline">WhatsApp</a>
                {' · '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">{CONTACT_EMAIL}</a>
              </p>
            )}
          </div>

          <Button type="submit" size="lg" loading={status === 'loading'} className="w-full sm:w-auto">
            {t.formSubmit}
          </Button>
        </form>
      </div>
    </Section>
  );
}

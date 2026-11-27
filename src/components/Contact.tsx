import { useEffect, useState, type ReactNode } from 'react';
import { Check, Clock, Copy, Mail, MapPin, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
import { CONTACT_EMAIL, MAPS_URL, PHONE_MOBILE, PHONE_OFFICE, isOfficeOpen, waLink } from '../config';
import { BarsMotif, Badge, Card, LinkButton, Section, SectionHeader } from './ui';

/** Copies text and briefly confirms; falls back silently where the clipboard is unavailable. */
function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked: the text stays selectable */ }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label}: ${text}`}
      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-rule px-2.5 text-[12.5px] text-sub transition-colors hover:border-ink/40 hover:text-ink"
    >
      {copied ? <Check size={14} strokeWidth={2.25} className="text-leaf" aria-hidden="true" /> : <Copy size={14} strokeWidth={1.75} aria-hidden="true" />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}

function InfoCard({ icon, title, children, action }: { icon: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 text-[14px] font-medium text-muted">
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-soft text-ink">{icon}</span>
          {title}
        </span>
        {action}
      </div>
      <div className="mt-4 text-[16px] text-ink">{children}</div>
    </Card>
  );
}

export function Contact({ language }: { language: Language }) {
  const t = content[language].contact;
  const [open, setOpen] = useState(() => isOfficeOpen());
  useEffect(() => {
    const id = setInterval(() => setOpen(isOfficeOpen()), 60_000);
    return () => clearInterval(id);
  }, []);
  const tel = (n: string) => `tel:${n.replace(/\s/g, '')}`;

  return (
    <Section id="contact">
      <SectionHeader title={t.title} sub={t.sub} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* WhatsApp: the primary channel */}
        <Card className="relative overflow-hidden border-ink bg-ink p-6 text-white lg:row-span-2 md:p-7">
          <BarsMotif className="pointer-events-none absolute -right-12 -bottom-16 w-[260px]" opacity={0.14} />
          <div className="relative flex h-full flex-col">
            <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#1F8F55]">
              <MessageCircle size={22} strokeWidth={2} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-[22px] font-semibold">{t.whatsappTitle}</h3>
            <p className="mt-2 max-w-[32ch] text-white/75">{t.whatsappText}</p>
            <p className="num mt-5 text-[18px]">{PHONE_MOBILE}</p>
            <div className="mt-auto pt-8">
              <LinkButton href={waLink(t.whatsappMessage)} target="_blank" rel="noreferrer" variant="light" className="w-full sm:w-auto">
                {t.whatsappCta}
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </LinkButton>
            </div>
          </div>
        </Card>

        <InfoCard icon={<Phone size={16} strokeWidth={1.75} aria-hidden="true" />} title={t.phone}>
          <div className="space-y-1.5">
            <a href={tel(PHONE_MOBILE)} className="num block text-ink no-underline hover:underline">{PHONE_MOBILE}</a>
            <a href={tel(PHONE_OFFICE)} className="num block text-ink no-underline hover:underline">{PHONE_OFFICE}</a>
          </div>
        </InfoCard>

        <InfoCard
          icon={<Mail size={16} strokeWidth={1.75} aria-hidden="true" />}
          title={t.email}
          action={<CopyButton text={CONTACT_EMAIL} label={t.copy} done={t.copied} />}
        >
          <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-ink no-underline hover:underline">{CONTACT_EMAIL}</a>
        </InfoCard>

        <InfoCard
          icon={<Clock size={16} strokeWidth={1.75} aria-hidden="true" />}
          title={t.hours}
          action={<Badge tone={open ? 'leaf' : 'neutral'} dot>{open ? t.openNow : t.closedNow}</Badge>}
        >
          {t.hoursText}
        </InfoCard>

        <InfoCard icon={<MapPin size={16} strokeWidth={1.75} aria-hidden="true" />} title={t.address}>
          <p>{t.addressText}</p>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[14px] font-medium text-leaf no-underline hover:underline">
            {t.mapLink}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </a>
        </InfoCard>
      </div>
    </Section>
  );
}

import { useMemo } from 'react';
import { ArrowRight, CalendarClock, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
import { waLink, NIPT } from '../config';
import { upcomingDeadlines } from '../lib/deadlines';
import { BarsMotif, Container, LinkButton } from './ui';
import { DeadlineRow } from './DeadlineRow';

export function Hero({ language }: { language: Language }) {
  const c = content[language];
  const t = c.hero;
  const deadlines = useMemo(() => upcomingDeadlines(c), [c]);

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-ink text-white">
        {/* Soft depth and the logo's three bars, kept low-contrast. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_85%_-10%,#24345A_0%,transparent_60%),linear-gradient(180deg,#14213D_0%,#0F1A33_100%)]" />
        <BarsMotif className="pointer-events-none absolute -right-16 -bottom-24 w-[520px] max-w-none md:right-[-40px]" opacity={0.1} />

        <Container className="relative grid items-center gap-12 pt-14 pb-28 md:pt-20 md:pb-36 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[13px] text-white/80">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-leaf-bright" />
              {t.eyebrow}
            </p>
            <h1 className="mt-6 text-[36px] md:text-[52px] font-semibold leading-[1.08] tracking-[-0.02em]">{t.title}</h1>
            <p className="mt-5 max-w-[48ch] text-[17px] md:text-[18px] text-white/75">{t.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={waLink(c.contact.whatsappMessage)} target="_blank" rel="noreferrer" variant="light">
                <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                {t.ctaPrimary}
              </LinkButton>
              <LinkButton href="#services" variant="ghost-light">
                {t.ctaSecondary}
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </LinkButton>
            </div>
            <p className="num mt-8 text-[13px] text-white/55">NIPT {NIPT}</p>
          </div>

          {/* Live widget: next filing dates, computed from today. */}
          <div className="min-w-0 rounded-[16px] bg-white p-5 text-ink shadow-[var(--shadow-float)] md:p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[15px] font-semibold">
                <CalendarClock size={18} strokeWidth={1.75} className="text-leaf" aria-hidden="true" />
                {t.deadlinesTitle}
              </h2>
              <a href="#deadlines" className="inline-flex items-center gap-1 text-[13px] text-sub no-underline hover:text-ink">
                {t.deadlinesAll}
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-2 divide-y divide-rule">
              {deadlines.map((d, i) => <DeadlineRow key={d.key} d={d} t={c} index={i} />)}
            </ul>
          </div>
        </Container>
      </section>

      {/* Key facts, overlapping the hero edge. */}
      <Container className="relative -mt-14 md:-mt-16">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {c.stats.map((s) => (
            <li key={s.label} className="rounded-[12px] border border-rule bg-white px-5 py-4 shadow-[var(--shadow-lift)]">
              <p className="num text-[20px] md:text-[24px] font-medium text-ink">{s.value}</p>
              <p className="mt-0.5 text-[13px] text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

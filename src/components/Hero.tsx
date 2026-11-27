import { useMemo } from 'react';
import { Language } from '../types';
import { content } from '../content';
import { upcomingDeadlines, formatDate } from '../lib/deadlines';
import { Container, LinkButton } from './ui';

export function Hero({ language }: { language: Language }) {
  const c = content[language];
  const t = c.hero;
  const deadlines = useMemo(() => upcomingDeadlines(c), [c]);

  return (
    <section id="top" className="py-14 md:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16 items-start">
        <div className="min-w-0">
          <h1 className="text-[34px] md:text-[46px] font-semibold leading-[1.1] tracking-[-0.015em]">{t.title}</h1>
          <p className="mt-5 max-w-[50ch] text-[17px] text-sub">{t.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#contact">{t.ctaPrimary}</LinkButton>
            <LinkButton href="#services" variant="secondary">{t.ctaSecondary}</LinkButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 num text-[13px] text-muted">
            {t.facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>

        <div className="min-w-0 rounded-[8px] border border-rule">
          <div className="flex items-baseline justify-between border-b border-rule px-5 py-3.5">
            <h2 className="text-[15px] font-semibold">{t.deadlinesTitle}</h2>
            <a href="#deadlines" className="text-[13px] text-sub no-underline hover:text-ink">→</a>
          </div>
          <table className="w-full text-[14px]">
            <tbody>
              {deadlines.map((d) => (
                <tr key={d.key} className="border-b border-rule last:border-0">
                  <td className="px-5 py-3 align-top">{d.label}</td>
                  <td className="px-5 py-3 text-right align-top whitespace-nowrap">
                    <span className="num block text-ledger font-medium">{formatDate(d.date)}</span>
                    <span className="num block text-[12px] text-muted">{t.daysLeft(d.daysLeft)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

import { Languages, Lock, Scale, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
import { NIPT } from '../config';
import { BarsMotif, Card, Section, SectionHeader } from './ui';

const ICONS: Record<string, LucideIcon> = { shield: ShieldCheck, scale: Scale, lock: Lock, languages: Languages };

export function About({ language }: { language: Language }) {
  const t = content[language].about;

  return (
    <Section id="about" className="bg-white border-y border-rule">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="min-w-0">
          <SectionHeader title={t.title} />
          <p className="-mt-4 max-w-[56ch] text-[17px] text-sub">{t.body}</p>

          {/* Firm card */}
          <Card className="relative mt-8 overflow-hidden bg-ink text-white border-ink">
            <BarsMotif className="pointer-events-none absolute -right-10 -top-8 w-[200px]" opacity={0.14} />
            <div className="relative flex items-center gap-4 p-5">
              <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-[18px] font-semibold">
                AM
              </span>
              <div className="min-w-0">
                <p className="text-[17px] font-semibold">{t.leaderName}</p>
                <p className="text-[14px] text-white/70">{t.leaderRole}</p>
              </div>
            </div>
            <div className="relative grid grid-cols-2 border-t border-white/10 text-[13px]">
              <div className="p-4 pr-2">
                <p className="text-white/55">{t.company}</p>
              </div>
              <div className="p-4 pl-2 text-right">
                <p className="num text-white/80">NIPT {NIPT}</p>
              </div>
            </div>
          </Card>
        </div>

        <ul className="grid min-w-0 content-start gap-4 sm:grid-cols-2">
          {t.points.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <li key={p.title}>
                <Card className="lift h-full p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-soft text-ink">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-semibold">{p.title}</p>
                  <p className="mt-1 text-[15px] text-sub">{p.text}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpen, Briefcase, Check, FileSearch, Receipt, Users, type LucideIcon } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
import { Card, Section, SectionHeader } from './ui';

const ICONS: Record<string, LucideIcon> = {
  audit: FileSearch,
  accounting: BookOpen,
  tax: Receipt,
  payroll: Users,
  other: Briefcase,
};

export function Services({ language }: { language: Language }) {
  const t = content[language].services;
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(t.items[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = t.items.find((s) => s.id === activeId) ?? t.items[0];
  const ActiveIcon = ICONS[active.id];

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (i + keys[e.key] + t.items.length) % t.items.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = t.items.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActiveId(t.items[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <Section id="services" className="pt-20 md:pt-28">
      <SectionHeader title={t.title} sub={t.sub} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
        {/* Service list: tabs (horizontal scroll on phones, vertical on desktop). */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={t.title}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
        >
          {t.items.map((s, i) => {
            const Icon = ICONS[s.id];
            const selected = s.id === activeId;
            return (
              <button
                key={s.id}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls="service-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(s.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative flex shrink-0 items-center gap-3 rounded-[12px] border px-4 py-3.5 text-left transition-colors duration-150 lg:w-full ${
                  selected ? 'border-ink bg-white shadow-[var(--shadow-lift)]' : 'border-rule bg-white/60 hover:bg-white'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] transition-colors ${
                    selected ? 'bg-ink text-white' : 'bg-soft text-sub'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className={`text-[15px] leading-snug ${selected ? 'font-semibold text-ink' : 'text-sub'}`}>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel for the selected service. */}
        <Card className="min-w-0 overflow-hidden">
          <div id="service-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="p-6 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start gap-4">
                  <span className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-leaf-soft text-leaf">
                    <ActiveIcon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[22px] md:text-[24px] font-semibold leading-tight">{active.title}</h3>
                    <p className="mt-2 text-[16px] text-sub">{active.description}</p>
                  </div>
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {active.points.map((p) => (
                    <li key={p} className="flex gap-3 rounded-[10px] bg-page px-4 py-3.5 text-[15px] leading-snug">
                      <Check size={18} strokeWidth={2.25} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </Section>
  );
}

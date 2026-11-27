import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CalendarDays, Repeat } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
import { upcomingDeadlines, deadlineStatus, formatDate } from '../lib/deadlines';
import { Badge, Card, Section, SectionHeader } from './ui';
import SegmentedControl from './arc/segmented-control/segmented-control';

type Filter = 'all' | 'monthly' | 'yearly';

export function Deadlines({ language }: { language: Language }) {
  const c = content[language];
  const t = c.deadlines;
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const next = useMemo(() => Object.fromEntries(upcomingDeadlines(c).map((d) => [d.key, d])), [c]);
  const items = t.items.filter((i) => filter === 'all' || i.freq === filter);

  return (
    <Section id="deadlines" className="bg-white border-y border-rule">
      <SectionHeader
        title={t.title}
        sub={t.sub}
        action={
          <SegmentedControl
            label={t.title}
            options={[
              { value: 'all', label: t.filters.all },
              { value: 'monthly', label: t.filters.monthly },
              { value: 'yearly', label: t.filters.yearly },
            ]}
            value={filter}
            onValueChange={(v) => setFilter(v as Filter)}
          />
        }
      />

      <motion.ul layout={!reduce} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => {
            const d = next[item.key];
            const status = d ? deadlineStatus(d.daysLeft) : null;
            return (
              <motion.li
                key={item.key}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="lift flex h-full flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone="neutral">
                      {item.freq === 'monthly'
                        ? <Repeat size={12} strokeWidth={2} aria-hidden="true" />
                        : <CalendarDays size={12} strokeWidth={2} aria-hidden="true" />}
                      {item.freq === 'monthly' ? t.monthly : t.yearly}
                    </Badge>
                    {status && <Badge tone={status === 'upcoming' ? 'leaf' : 'coral'} dot>{c.status[status]}</Badge>}
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] text-sub">{item.when}</p>
                  {d && (
                    <div className="mt-auto pt-5">
                      <div className="flex items-baseline justify-between border-t border-rule pt-4">
                        <span className="text-[13px] text-muted">{t.next}</span>
                        <span className="num text-[15px] font-medium text-ink">{formatDate(d.date)}</span>
                      </div>
                      <p className="num mt-1 text-right text-[12.5px] text-sub">{c.hero.daysLeft(d.daysLeft)}</p>
                    </div>
                  )}
                </Card>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}

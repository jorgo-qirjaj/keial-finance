import { motion, useReducedMotion } from 'motion/react';
import type { Content } from '../content';
import { Deadline, deadlineStatus, formatDate } from '../lib/deadlines';
import { Badge } from './ui';

/** One deadline: name, date, days left, status pill and a bar showing how much of the cycle has passed. */
export function DeadlineRow({ d, t, index = 0 }: { d: Deadline; t: Content; index?: number }) {
  const reduce = useReducedMotion();
  const status = deadlineStatus(d.daysLeft);
  const elapsed = Math.min(1, Math.max(0.04, 1 - d.daysLeft / d.cycleDays));
  const tone = status === 'upcoming' ? 'leaf' : 'coral';
  const bar = status === 'upcoming' ? 'bg-leaf-bright' : 'bg-coral';

  return (
    <li className="py-3.5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[14.5px] font-medium leading-snug text-ink">{d.label}</p>
          <p className="num mt-0.5 text-[12.5px] text-muted">{formatDate(d.date)}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Badge tone={tone} dot>{t.status[status]}</Badge>
          <span className="num text-[12.5px] text-sub">{t.hero.daysLeft(d.daysLeft)}</span>
        </div>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-soft" aria-hidden="true">
        <motion.div
          className={`h-full rounded-full ${bar}`}
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${elapsed * 100}%` }}
          transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </li>
  );
}

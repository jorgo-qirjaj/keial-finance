import type { Content } from '../content';

export interface Deadline {
  key: string;
  label: string;
  date: Date;
  daysLeft: number;
}

const DAY = 86_400_000;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Next date on or after `today` that falls on day `dayOfMonth`. */
function nextMonthly(today: Date, dayOfMonth: number) {
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
  return thisMonth >= today ? thisMonth : new Date(today.getFullYear(), today.getMonth() + 1, dayOfMonth);
}

/** Next date on or after `today` for a fixed day each year (month is 0-based). */
function nextYearly(today: Date, month: number, day: number) {
  const thisYear = new Date(today.getFullYear(), month, day);
  return thisYear >= today ? thisYear : new Date(today.getFullYear() + 1, month, day);
}

/** The four recurring filing dates, soonest first, computed from today's date so the list never goes stale. */
export function upcomingDeadlines(t: Content, now = new Date()): Deadline[] {
  const today = startOfDay(now);
  const period = (due: Date) => {
    const p = new Date(due.getFullYear(), due.getMonth() - 1, 1);
    return t.months[p.getMonth()];
  };

  const vat = nextMonthly(today, 14);
  const payroll = nextMonthly(today, 20);
  const profitTax = nextYearly(today, 2, 31);
  const qkb = nextYearly(today, 6, 31);

  return [
    { key: 'vat', label: t.deadlineNames.vat(period(vat)), date: vat },
    { key: 'payroll', label: t.deadlineNames.payroll(period(payroll)), date: payroll },
    { key: 'profitTax', label: t.deadlineNames.profitTax, date: profitTax },
    { key: 'qkb', label: t.deadlineNames.qkb, date: qkb },
  ]
    .map((d) => ({ ...d, daysLeft: Math.round((d.date.getTime() - today.getTime()) / DAY) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function formatDate(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
import { waLink } from '../config';
import { salaryBreakdown, dividendBreakdown, RATES_2026 } from '../lib/tax';
import { formatLek, numberLocale } from '../lib/format';
import { Card, LinkButton, Section, SectionHeader } from './ui';
import SegmentedControl from './arc/segmented-control/segmented-control';
import { Input } from './arc/input/input';
import { Slider } from './arc/slider/slider';
import { AnimatedCounter } from './arc/animated-counter/animated-counter';
import { Tooltip } from './arc/tooltip/tooltip';

type Mode = 'salary' | 'dividend';

const RANGE: Record<Mode, { min: number; max: number; step: number; presets: number[] }> = {
  salary: { min: RATES_2026.minWage, max: 500_000, step: 1_000, presets: [60_000, 80_000, 120_000, 200_000] },
  dividend: { min: 0, max: 20_000_000, step: 50_000, presets: [500_000, 1_000_000, 5_000_000] },
};

interface Segment { key: string; label: string; value: number; color: string }

/** Horizontal stacked bar with a legend: where the money goes. */
function Breakdown({ title, segments, language }: { title: string; segments: Segment[]; language: Language }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div>
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">{title}</p>
      <div className="flex h-3.5 overflow-hidden rounded-full bg-soft">
        {segments.filter((s) => s.value > 0).map((s) => (
          <Tooltip key={s.key} content={`${s.label}: ${formatLek(s.value, language)} ALL`}>
            <span
              tabIndex={0}
              aria-label={`${s.label}: ${formatLek(s.value, language)} ALL`}
              className="h-full transition-[width] duration-300 ease-out first:rounded-l-full last:rounded-r-full outline-offset-2"
              style={{ width: `${(s.value / total) * 100}%`, background: s.color }}
            />
          </Tooltip>
        ))}
      </div>
      <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center justify-between gap-3 text-[14px]">
            <span className="flex min-w-0 items-center gap-2 text-sub">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: s.color }} />
              <span className="truncate">{s.label}</span>
            </span>
            <span className="num shrink-0 text-ink">
              {formatLek(s.value, language)}
              <span className="ml-1.5 text-muted">{Math.round((s.value / total) * 100)}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Kpi({ label, value, language, emphasis = false }: { label: string; value: number; language: Language; emphasis?: boolean }) {
  return (
    <div
      className={`rounded-[12px] p-4 md:p-5 ${emphasis ? 'bg-ink text-white' : 'bg-page text-ink'}`}
      // The Arc counter reads these tokens for its colour, face and size.
      style={{
        ['--foreground' as string]: emphasis ? '#FFFFFF' : '#14213D',
        ['--font-display' as string]: 'var(--font-mono)',
        ['--text-3xl' as string]: 'clamp(24px, 3vw, 30px)',
      }}
    >
      <p className={`text-[13px] ${emphasis ? 'text-white/70' : 'text-muted'}`}>{label}</p>
      <p className="num mt-1 text-[26px] md:text-[30px] font-medium leading-none">
        <AnimatedCounter value={Math.round(value)} locale={numberLocale(language)} />
        <span className={`ml-2 text-[14px] ${emphasis ? 'text-white/60' : 'text-muted'}`}>ALL</span>
      </p>
    </div>
  );
}

export function Calculator({ language }: { language: Language }) {
  const t = content[language].tools;
  const [mode, setMode] = useState<Mode>('salary');
  const [amounts, setAmounts] = useState<Record<Mode, number>>({ salary: 80_000, dividend: 1_000_000 });
  const amount = amounts[mode];
  const range = RANGE[mode];
  const setAmount = (n: number) => setAmounts((a) => ({ ...a, [mode]: Math.max(0, Math.min(n, 9_999_999_999)) }));

  const s = useMemo(() => salaryBreakdown(amounts.salary), [amounts.salary]);
  const d = useMemo(() => dividendBreakdown(amounts.dividend), [amounts.dividend]);
  const fmt = (n: number) => formatLek(n, language);

  const shareText = mode === 'salary'
    ? t.shareSalary(fmt(s.gross), fmt(s.net), fmt(s.employerCost))
    : t.shareDividend(fmt(d.gross), fmt(d.net));

  return (
    <Section id="calculator">
      <SectionHeader title={t.title} sub={t.sub} />

      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          {/* Inputs */}
          <div className="min-w-0 space-y-6 border-b border-rule p-5 md:p-8 lg:border-b-0 lg:border-r">
            <SegmentedControl
              label={t.title}
              options={[{ value: 'salary', label: t.tabSalary }, { value: 'dividend', label: t.tabDividend }]}
              value={mode}
              onValueChange={(v) => setMode(v as Mode)}
              fullWidth
            />
            <Input
              id={`amount-${mode}`}
              label={`${mode === 'salary' ? t.salaryLabel : t.dividendLabel} (ALL)`}
              inputMode="numeric"
              autoComplete="off"
              value={amount ? fmt(amount) : ''}
              onChange={(e) => setAmount(Number(e.target.value.replace(/\D/g, '')) || 0)}
              description={mode === 'salary' && amount > 0 && amount < RATES_2026.minWage ? t.belowMin : undefined}
            />
            <Slider
              label={mode === 'salary' ? t.salaryLabel : t.dividendLabel}
              min={range.min}
              max={range.max}
              step={range.step}
              value={Math.min(Math.max(amount, range.min), range.max)}
              onValueChange={(v) => setAmount(v)}
              format={(v) => fmt(v)}
              showValue={false}
            />
            <div className="flex flex-wrap gap-2">
              {range.presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  aria-pressed={amount === p}
                  className={`num rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                    amount === p ? 'border-ink bg-ink text-white' : 'border-rule bg-white text-sub hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {fmt(p)}
                </button>
              ))}
            </div>
            <p className="text-[13px] leading-relaxed text-muted">{t.disclaimer}</p>
          </div>

          {/* Results */}
          <div className="min-w-0 space-y-7 bg-white p-5 md:p-8">
            {mode === 'salary' ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Kpi label={t.net} value={s.net} language={language} emphasis />
                  <Kpi label={t.employerCost} value={s.employerCost} language={language} />
                </div>
                <Breakdown
                  title={t.breakdown}
                  language={language}
                  segments={[
                    { key: 'net', label: t.net, value: s.net, color: '#4BBF77' },
                    { key: 'tap', label: t.tap, value: s.tap, color: '#E57455' },
                    { key: 'emp', label: `${t.contributions}, ${t.employee.toLowerCase()}`, value: s.socialEmployee + s.healthEmployee, color: '#B9B957' },
                    { key: 'er', label: `${t.contributions}, ${t.employer.toLowerCase()}`, value: s.socialEmployer + s.healthEmployer, color: '#24345A' },
                  ]}
                />
              </>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Kpi label={t.divNet} value={d.net} language={language} emphasis />
                  <Kpi label={t.divTax} value={d.tax} language={language} />
                </div>
                <Breakdown
                  title={t.breakdown}
                  language={language}
                  segments={[
                    { key: 'net', label: t.divNet, value: d.net, color: '#4BBF77' },
                    { key: 'tax', label: t.divTax, value: d.tax, color: '#E57455' },
                  ]}
                />
              </>
            )}
            <div className="border-t border-rule pt-6">
              <LinkButton href={waLink(shareText)} target="_blank" rel="noreferrer" variant="secondary">
                <MessageCircle size={17} strokeWidth={2} className="text-[#1F8F55]" aria-hidden="true" />
                {t.share}
              </LinkButton>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

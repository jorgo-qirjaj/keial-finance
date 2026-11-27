import { useMemo, useState, type ReactNode } from 'react';
import { Language } from '../types';
import { content } from '../content';
import { salaryBreakdown, dividendBreakdown, RATES_2026 } from '../lib/tax';
import { Section, SectionHeader } from './ui';
import SegmentedControl from './arc/segmented-control/segmented-control';
import { Input } from './arc/input/input';

/** Lek amount field: digits only, shown with thousands separators. */
function AmountInput({ id, label, value, onChange, locale, hint }: {
  id: string; label: string; value: number; onChange: (n: number) => void; locale: string; hint?: string;
}) {
  return (
    <Input
      id={id}
      label={`${label} (ALL)`}
      inputMode="numeric"
      autoComplete="off"
      className="num text-[18px]"
      value={value ? value.toLocaleString(locale) : ''}
      onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, '')) || 0)}
      description={hint}
    />
  );
}

function Row({ label, value, strong = false, locale }: { label: string; value: number; strong?: boolean; locale: string }) {
  return (
    <tr className={`border-b border-rule last:border-0 ${strong ? 'font-semibold' : ''}`}>
      <td className="py-2.5 pr-4">{label}</td>
      <td className="num py-2.5 text-right whitespace-nowrap">{value.toLocaleString(locale)} ALL</td>
    </tr>
  );
}

function Ledger({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h4 className="mb-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">{title}</h4>
      <table className="w-full text-[14.5px]"><tbody>{children}</tbody></table>
    </div>
  );
}

export function Calculator({ language }: { language: Language }) {
  const t = content[language].tools;
  const locale = language === 'sq' ? 'sq-AL' : 'en-US';
  const [mode, setMode] = useState<'salary' | 'dividend'>('salary');
  const [salary, setSalary] = useState(80_000);
  const [dividend, setDividend] = useState(1_000_000);

  const s = useMemo(() => salaryBreakdown(salary), [salary]);
  const d = useMemo(() => dividendBreakdown(dividend), [dividend]);

  return (
    <Section id="calculator">
      <SectionHeader title={t.title} sub={t.sub} />

      <div className="grid gap-10 rounded-[8px] border border-rule p-5 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="min-w-0 space-y-6">
          <SegmentedControl
            label={t.title}
            options={[
              { value: 'salary', label: t.tabSalary },
              { value: 'dividend', label: t.tabDividend },
            ]}
            value={mode}
            onValueChange={(v) => setMode(v as 'salary' | 'dividend')}
            fullWidth
          />
          {mode === 'salary' ? (
            <AmountInput
              id="salary"
              label={t.salaryLabel}
              value={salary}
              onChange={(n) => setSalary(Math.min(n, 99_999_999))}
              locale={locale}
              hint={salary > 0 && salary < RATES_2026.minWage ? t.belowMin : undefined}
            />
          ) : (
            <AmountInput
              id="dividend"
              label={t.dividendLabel}
              value={dividend}
              onChange={(n) => setDividend(Math.min(n, 9_999_999_999))}
              locale={locale}
            />
          )}
          <p className="text-[13px] text-muted">{t.disclaimer}</p>
        </div>

        {mode === 'salary' ? (
          <div className="grid min-w-0 gap-8 sm:grid-cols-2">
            <Ledger title={t.employee}>
              <Row locale={locale} label={t.socialEmployee} value={s.socialEmployee} />
              <Row locale={locale} label={t.healthEmployee} value={s.healthEmployee} />
              <Row locale={locale} label={t.tap} value={s.tap} />
              <Row locale={locale} label={t.net} value={s.net} strong />
            </Ledger>
            <Ledger title={t.employer}>
              <Row locale={locale} label={t.socialEmployer} value={s.socialEmployer} />
              <Row locale={locale} label={t.healthEmployer} value={s.healthEmployer} />
              <Row locale={locale} label={t.employerCost} value={s.employerCost} strong />
            </Ledger>
          </div>
        ) : (
          <Ledger title={t.tabDividend}>
            <Row locale={locale} label={t.dividendLabel} value={d.gross} />
            <Row locale={locale} label={t.divTax} value={d.tax} />
            <Row locale={locale} label={t.divNet} value={d.net} strong />
          </Ledger>
        )}
      </div>
    </Section>
  );
}

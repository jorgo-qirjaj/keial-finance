import { Language } from '../types';
import { content } from '../content';
import { Section, SectionHeader } from './ui';

export function Deadlines({ language }: { language: Language }) {
  const t = content[language].deadlines;

  return (
    <Section id="deadlines">
      <SectionHeader title={t.title} />
      <dl className="border-t border-ink/90">
        {t.items.map((d) => (
          <div key={d.title} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-8">
            <dt className="font-semibold">{d.title}</dt>
            <dd className="text-sub">{d.when}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

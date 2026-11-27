import { Language } from '../types';
import { content } from '../content';
import { Section, SectionHeader } from './ui';

export function Services({ language }: { language: Language }) {
  const t = content[language].services;

  return (
    <Section id="services">
      <SectionHeader title={t.title} sub={t.sub} />
      <div className="grid border-t border-ink/90 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((s) => (
          <article key={s.id} className="min-w-0 border-b border-rule py-7 sm:pr-8">
            <h3 className="text-[18px] font-semibold leading-snug">{s.title}</h3>
            <p className="mt-2 text-[15px] text-sub">{s.description}</p>
            <ul className="mt-4 space-y-1.5 text-[14.5px]">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ledger" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

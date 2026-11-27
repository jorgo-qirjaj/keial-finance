import { Language } from '../types';
import { content } from '../content';
import { Section, SectionHeader } from './ui';

export function About({ language }: { language: Language }) {
  const t = content[language].about;

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHeader title={t.title} />
          <p className="-mt-4 max-w-[58ch] text-[17px] text-sub">{t.body}</p>
          <div className="mt-8 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-soft text-[17px] font-semibold text-ink"
            >
              AM
            </span>
            <div>
              <p className="font-semibold">{t.leaderName}</p>
              <p className="text-[14px] text-muted">{t.leaderRole}</p>
            </div>
          </div>
        </div>

        <dl className="grid min-w-0 gap-x-10 sm:grid-cols-2">
          {t.points.map((p) => (
            <div key={p.title} className="border-t border-rule py-5">
              <dt className="font-semibold">{p.title}</dt>
              <dd className="mt-1 text-[15px] text-sub">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

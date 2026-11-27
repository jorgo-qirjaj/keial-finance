import { useEffect, useState } from 'react';
import { Menu, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
import { waLink } from '../config';
import { Logo } from './Logo';
import { Container, LinkButton } from './ui';
import SegmentedControl from './arc/segmented-control/segmented-control';
import { Drawer, DrawerContent, DrawerTrigger } from './arc/drawer/drawer';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LANGS = [
  { value: 'sq', label: 'AL' },
  { value: 'en', label: 'EN' },
];

const SECTIONS = ['services', 'about', 'calculator', 'deadlines', 'contact'] as const;

/** Tracks which section is on screen so the nav can mark it. */
function useActiveSection() {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Header({ language, setLanguage }: HeaderProps) {
  const c = content[language];
  const t = c.nav;
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const links = [
    { id: 'services', label: t.services },
    { id: 'about', label: t.about },
    { id: 'calculator', label: t.resources },
    { id: 'deadlines', label: t.deadlines },
    { id: 'contact', label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <a href="#top" aria-label="KEI-AL Auditing" className="no-underline shrink-0">
          <Logo />
        </a>

        <nav aria-label={t.menu} className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[15px]">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`rounded-full px-3.5 py-2 no-underline transition-colors ${
                    active === l.id ? 'bg-soft text-ink font-medium' : 'text-sub hover:text-ink'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <SegmentedControl
            label={t.language}
            options={LANGS}
            value={language}
            onValueChange={(v) => setLanguage(v as Language)}
          />
          <span className="hidden md:block">
            <LinkButton href={waLink(c.contact.whatsappMessage)} target="_blank" rel="noreferrer" className="h-10 px-4 text-[14px]">
              <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
              {t.cta}
            </LinkButton>
          </span>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-rule text-ink"
              aria-label={t.menu}
            >
              <Menu size={20} strokeWidth={1.75} />
            </DrawerTrigger>
            <DrawerContent
              title={t.menu}
              side="right"
              style={{ ['--drawer-size' as string]: 'min(22rem, calc(100vw - 3rem))' }}
            >
              <nav aria-label={t.menu}>
                <ul className="flex flex-col">
                  {links.map((l) => (
                    <li key={l.id} className="border-b border-rule last:border-0">
                      <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block py-3.5 text-[17px] text-ink no-underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <LinkButton href={waLink(c.contact.whatsappMessage)} target="_blank" rel="noreferrer" variant="whatsapp" className="mt-6 w-full">
                  <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                  {c.hero.ctaPrimary}
                </LinkButton>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </Container>
    </header>
  );
}

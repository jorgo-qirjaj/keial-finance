import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Language } from '../types';
import { content } from '../content';
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

export function Header({ language, setLanguage }: HeaderProps) {
  const t = content[language].nav;
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#services', label: t.services },
    { href: '#about', label: t.about },
    { href: '#calculator', label: t.resources },
    { href: '#deadlines', label: t.deadlines },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="KEI-AL Auditing" className="no-underline">
          <Logo />
        </a>

        <nav aria-label={t.menu} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] text-sub">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="no-underline hover:text-ink transition-colors">{l.label}</a>
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
            <LinkButton href="#contact" className="h-10 px-4 text-[14px]">{t.cta}</LinkButton>
          </span>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-rule text-ink"
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
                    <li key={l.href} className="border-b border-rule last:border-0">
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-3.5 text-[17px] text-ink no-underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <LinkButton href="#contact" onClick={() => setOpen(false)} className="mt-6 w-full">{t.cta}</LinkButton>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </Container>
    </header>
  );
}

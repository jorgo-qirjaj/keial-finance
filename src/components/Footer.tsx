import { Language } from '../types';
import { content } from '../content';
import { NIPT } from '../config';
import { Container } from './ui';
import { Logo } from './Logo';

export function Footer({ language }: { language: Language }) {
  const c = content[language];
  const year = new Date().getFullYear();
  const links = [
    { href: '#services', label: c.nav.services },
    { href: '#about', label: c.nav.about },
    { href: '#calculator', label: c.nav.resources },
    { href: '#deadlines', label: c.nav.deadlines },
    { href: '#contact', label: c.nav.contact },
  ];

  return (
    <footer className="border-t border-rule bg-white">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-sub">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="no-underline hover:text-ink">{l.label}</a></li>
            ))}
            <li><a href="https://www.facebook.com/keialauditing" target="_blank" rel="noreferrer" className="no-underline hover:text-ink">Facebook</a></li>
            <li><a href="https://www.instagram.com/keialauditing" target="_blank" rel="noreferrer" className="no-underline hover:text-ink">Instagram</a></li>
          </ul>
        </nav>
      </Container>
      <div className="border-t border-rule">
        <Container className="flex flex-col gap-1 py-5 text-[12.5px] text-muted md:flex-row md:justify-between">
          <p className="num">© {year} KEI-AL Auditing SH.P.K. · NIPT {NIPT} · Vlorë</p>
          <p>{c.footer.rights}</p>
        </Container>
      </div>
    </footer>
  );
}

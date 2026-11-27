import { Language } from '../types';
import { content } from '../content';
import { Container } from './ui';
import { Logo } from './Logo';

export function Footer({ language }: { language: Language }) {
  const t = content[language];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-soft py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="num text-[13px] text-muted">
          © {year} KEI-AL Auditing SH.P.K. · NIPT L37023201C · Vlorë
        </p>
        <ul className="flex gap-5 text-[14px] text-sub">
          <li><a href="https://www.facebook.com/keialauditing" target="_blank" rel="noreferrer" className="no-underline hover:text-ink">Facebook</a></li>
          <li><a href="https://www.instagram.com/keialauditing" target="_blank" rel="noreferrer" className="no-underline hover:text-ink">Instagram</a></li>
        </ul>
      </Container>
      <Container>
        <p className="mt-4 text-[12px] text-muted">{t.footer.rights}</p>
      </Container>
    </footer>
  );
}

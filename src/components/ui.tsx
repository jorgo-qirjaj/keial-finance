import type { AnchorHTMLAttributes, ReactNode } from 'react';

/** Page width container with the site's side gutter. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-5 md:px-8 ${className}`}>{children}</div>;
}

/** Section wrapper: consistent vertical rhythm and a hairline top rule. */
export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`border-t border-rule py-14 md:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="mb-10 max-w-[60ch]">
      <h2 className="text-[26px] md:text-[30px] font-semibold leading-tight tracking-[-0.01em]">{title}</h2>
      {sub && <p className="mt-2 text-sub">{sub}</p>}
    </header>
  );
}

/** Link styled to match Arc's primary/secondary buttons, for navigation that is not a form action. */
export function LinkButton({
  variant = 'primary',
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'primary' | 'secondary' }) {
  const base =
    'inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[6px] text-[15px] font-medium transition-colors duration-150 no-underline';
  const styles =
    variant === 'primary'
      ? 'bg-ink text-white hover:bg-ink-soft'
      : 'border border-ink/80 text-ink hover:bg-soft';
  return <a className={`${base} ${styles} ${className}`} {...props} />;
}

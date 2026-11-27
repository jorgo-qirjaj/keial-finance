import type { AnchorHTMLAttributes, ReactNode } from 'react';

/** Page width container with the site's side gutter. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub, action }: { eyebrow?: string; title: string; sub?: string; action?: ReactNode }) {
  return (
    <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[62ch]">
        {eyebrow && <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-leaf">{eyebrow}</p>}
        <h2 className="text-[28px] md:text-[34px] font-semibold leading-tight tracking-[-0.015em]">{title}</h2>
        {sub && <p className="mt-2 text-[16.5px] text-sub">{sub}</p>}
      </div>
      {action}
    </header>
  );
}

/** White surface with hairline border and soft shadow. */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[12px] border border-rule bg-card shadow-[var(--shadow-card)] ${className}`}>{children}</div>;
}

type Tone = 'neutral' | 'leaf' | 'coral' | 'ink';
const TONES: Record<Tone, string> = {
  neutral: 'bg-soft text-sub',
  leaf: 'bg-leaf-soft text-leaf',
  coral: 'bg-coral-soft text-[#B24A2E]',
  ink: 'bg-ink text-white',
};

/** Small status pill; always carries a text label, never colour alone. */
export function Badge({ tone = 'neutral', children, dot = false }: { tone?: Tone; children: ReactNode; dot?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-medium ${TONES[tone]}`}>
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

type BtnVariant = 'primary' | 'secondary' | 'light' | 'ghost-light' | 'whatsapp';
const BTN: Record<BtnVariant, string> = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  secondary: 'border border-rule bg-white text-ink hover:border-ink/40 hover:bg-soft',
  light: 'bg-white text-ink hover:bg-soft',
  'ghost-light': 'border border-white/25 text-white hover:bg-white/10',
  whatsapp: 'bg-[#1F8F55] text-white hover:bg-[#197748]',
};

/** Link styled as a button (navigation and outbound actions; the site has no forms). */
export function LinkButton({
  variant = 'primary',
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: BtnVariant }) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[8px] text-[15px] font-medium no-underline transition-colors duration-150 active:translate-y-px ${BTN[variant]} ${className}`}
      {...props}
    />
  );
}

/** The three diagonal-split bars from the KEI-AL logo, used as a quiet background motif. */
export function BarsMotif({ className = '', opacity = 0.12 }: { className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 360 340" className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <clipPath id="b1"><rect x="0" y="40" width="96" height="300" /></clipPath>
        <clipPath id="b2"><rect x="132" y="0" width="96" height="340" /></clipPath>
        <clipPath id="b3"><rect x="264" y="20" width="96" height="320" /></clipPath>
      </defs>
      <g clipPath="url(#b1)"><rect x="0" y="0" width="96" height="340" fill="#DADB72" /><polygon points="0,250 96,200 96,340 0,340" fill="#AFAA52" /></g>
      <g clipPath="url(#b2)"><rect x="132" y="0" width="96" height="340" fill="#4BBF77" /><polygon points="132,220 228,150 228,340 132,340" fill="#357B52" /></g>
      <g clipPath="url(#b3)"><rect x="264" y="0" width="96" height="340" fill="#F49A80" /><polygon points="264,140 360,70 360,340 264,340" fill="#E57455" /></g>
    </svg>
  );
}

interface LogoProps {
  className?: string;
}

/** Vector version of the KEI-AL mark (three bars) with the wordmark. */
export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="24" viewBox="0 0 30 26" aria-hidden="true" className="shrink-0">
        <rect x="0" y="5" width="8" height="21" fill="#C7D36B" />
        <rect x="11" y="0" width="8" height="26" fill="#3F7D52" />
        <rect x="22" y="2.5" width="8" height="23.5" fill="#D7704C" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-semibold text-[17px] tracking-[0.02em] text-ink">KEI-AL</span>
        <span className="text-[10px] tracking-[0.28em] uppercase text-muted mt-1">Auditing</span>
      </span>
    </span>
  );
}

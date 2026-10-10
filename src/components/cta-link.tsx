import Link from 'next/link';

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="cta__arrow">
    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Arrow | label button. Pure CSS (see .cta in globals.css): on hover the left arrow shrinks away, the label slides over it with a tilt and a bouncy pop, and a second arrow springs in on the right.
export function CtaLink({
  href,
  label,
  tone,
  className = '',
  ...rest
}: {
  href: string;
  label: string;
  tone: string;
  className?: string;
  'data-reveal'?: boolean;
}) {
  return (
    <Link href={href} className={`cta text-[15px] font-bold uppercase tracking-[-0.02em] ${className}`} {...rest}>
      <span className={`cta__icon is-default ${tone}`}>
        <Arrow />
      </span>
      <span className={`cta__text ${tone}`}>{label}</span>
      <span className={`cta__icon is-hover ${tone}`}>
        <Arrow />
      </span>
    </Link>
  );
}

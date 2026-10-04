'use client';

import Link from 'next/link';
import { useRef } from 'react';

const GAP = 10;

// Arrow | label button. On hover the two halves split: the label tilts to the left, the arrow slides to the right.
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
  const ref = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Swap distances depend on the rendered widths, so measure on hover.
  const measure = () => {
    if (!ref.current || !arrowRef.current || !labelRef.current) return;
    ref.current.style.setProperty('--arrow-dx', `${labelRef.current.offsetWidth + GAP}px`);
    ref.current.style.setProperty('--label-dx', `${arrowRef.current.offsetWidth + 1}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={measure}
      onFocus={measure}
      className={`group inline-flex items-stretch font-mono text-[11px] uppercase tracking-[0.18em] ${className}`}
      {...rest}
    >
      <span
        ref={arrowRef}
        className={`flex h-11 w-11 items-center justify-center transition-transform will-change-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-[var(--arrow-dx)] group-hover:-translate-y-px group-hover:rotate-2 motion-reduce:transition-none ${tone}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        ref={labelRef}
        className={`ml-px flex items-center px-5 transition-transform will-change-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] [transition-delay:50ms] group-hover:-translate-x-[var(--label-dx)] group-hover:-rotate-2 motion-reduce:transition-none ${tone}`}
      >
        {label}
      </span>
    </Link>
  );
}

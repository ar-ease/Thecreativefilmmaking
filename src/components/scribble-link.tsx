'use client';

import Link from 'next/link';
import { useState } from 'react';

// Hand-drawn replacements for the underline (viewBox 0 0 160 20). A different one is drawn on each hover.
const SCRIBBLES = [
  'M3 12c45-2 95-2 120-3L88 17c30-3 55-8 69-12', // kinked zigzag
  'M3 13C40 9 70 9 100 12c25 3 28-8 18-7-10 1-6 12 12 9 12-2 20-6 27-8', // loop-the-loop
  'M3 11q10-8 20 0t20 0 20 0 20 0 20 0 20 0 14-2', // wave
  'M3 8C50 5 110 5 157 8M14 16C60 13 110 14 150 11', // double line
  'M3 15 22 5 38 16 56 5 72 16 90 5 106 16 124 5 140 16 157 8', // spikes
  'M3 13C50 17 110 16 150 6M150 6l-11-1M150 6l-4 10', // swoosh arrow
];

const stroke = 'absolute inset-0 h-full w-full overflow-visible text-accent transition-[clip-path] ease-[var(--ease-out)] motion-reduce:transition-none';

// Serif label with a hand-drawn underline that wipes away on hover and is replaced by a random scribble, plus a square arrow box.
export function ScribbleLink({ href, label }: { href: string; label: string }) {
  const [i, setI] = useState(0);
  // Swap the path on enter: the scribble is still fully clipped then, so the change is never visible.
  const next = () => setI((n) => (n + 1) % SCRIBBLES.length);

  return (
    <Link href={href} onPointerEnter={next} onFocus={next} className="group inline-flex items-center gap-4 text-ink">
      <span className="relative inline-block pb-3 font-serif text-[32px] leading-none md:text-[40px]">
        {label}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-[0.5em]">
          <svg viewBox="0 0 160 20" preserveAspectRatio="none" fill="none" className={`${stroke} duration-300 [clip-path:inset(-10px)] group-hover:[clip-path:inset(-10px_-10px_-10px_100%)]`}>
            <path d="M3 8c30 6 90 8 154-3" stroke="currentColor" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg viewBox="0 0 160 20" preserveAspectRatio="none" fill="none" className={`${stroke} delay-0 duration-100 [clip-path:inset(-10px_100%_-10px_-10px)] group-hover:delay-[180ms] group-hover:duration-[450ms] group-hover:[clip-path:inset(-10px)]`}>
            <path d={SCRIBBLES[i]} stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </span>
      <span className="flex h-11 w-11 items-center justify-center bg-accent text-ink transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 motion-reduce:transition-none">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Package } from '@content';
import { useScrollReveal } from '../scroll-reveal';

export function Packages({ packages }: { packages: Package[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, '[data-reveal]');

  return (
    <section className="section-pad border-t border-line px-6 md:px-10">
      <div ref={ref} className="mx-auto max-w-[1440px]">
        <h2
          data-reveal
          className="max-w-[16ch] font-display text-[40px] leading-[0.95] tracking-[-0.03em] md:text-[72px]"
        >
          Pick a lane. Change it later.
        </h2>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              data-reveal
              className={`flex flex-col border p-8 md:p-10 ${pkg.mostBooked ? 'border-accent-pink' : 'border-line'}`}
            >
              {pkg.mostBooked && (
                <p className="mb-6 inline-flex w-fit items-center rounded-none bg-accent-pink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                  Most booked
                </p>
              )}
              <p className="font-display text-[26px] leading-tight tracking-[-0.02em] md:text-[32px]">{pkg.name}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{pkg.strap}</p>
              <p className="mt-8 font-mono text-[13px] uppercase tracking-[0.1em] text-paper/80">{pkg.price}</p>
              <ul className="mt-6 flex flex-col gap-3 text-[14px] text-muted">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent">&mdash;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-10 inline-block border px-6 py-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  pkg.mostBooked
                    ? 'border-accent-pink text-accent-pink hover:bg-accent-pink hover:text-ink'
                    : 'border-paper/40 text-paper hover:border-accent hover:text-accent'
                }`}
              >
                Book this
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

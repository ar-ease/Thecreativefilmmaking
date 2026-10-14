'use client';

import { useRef, useState } from 'react';
import type { FaqItem } from '@content';
import { useScrollReveal } from '../scroll-reveal';

export function Faq({ items }: { items: FaqItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(-1);
  useScrollReveal(ref, '[data-reveal]');

  return (
    <section className="pb-12 pt-16 md:pb-16 md:pt-32 border-t border-line px-6 md:px-10">
      <div ref={ref} className="mx-auto max-w-[1440px]">
        <h2
          data-reveal
          className="max-w-[14ch] font-display text-[40px] leading-[0.95] tracking-[-0.03em] md:text-[64px]"
        >
          Questions, answered.
        </h2>

        <div className="mt-8 border-t border-line md:mt-12">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} data-reveal className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-baseline gap-6 py-6 text-left md:gap-8 md:py-6"
                >
                  <span className="w-6 shrink-0 font-mono text-[11px] tracking-[0.08em] text-muted [font-variant-numeric:tabular-nums]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display text-[19px] leading-snug tracking-[-0.01em] md:text-[24px]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-mono text-[20px] leading-none text-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  {/* padding lives on the <p>, not this wrapper, so a closed row collapses to zero height */}
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[56ch] pb-6 pl-11 text-[15px] leading-relaxed text-muted md:pl-14">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState } from 'react';
import type { FaqItem } from '@content';
import { useScrollReveal } from '../scroll-reveal';

export function Faq({ items }: { items: FaqItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(-1);
  useScrollReveal(ref, '[data-reveal]');

  return (
    <section className="section-pad border-t border-line px-6 md:px-10">
      <div ref={ref} className="mx-auto max-w-[1440px]">
        <h2
          data-reveal
          className="max-w-[14ch] font-display text-[40px] leading-[0.95] tracking-[-0.03em] md:text-[64px]"
        >
          Questions, answered.
        </h2>

        <div className="mt-12 md:mt-16">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} data-reveal className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-[18px] leading-snug tracking-[-0.01em] md:text-[22px]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-mono text-[16px] text-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden pb-6">
                    <p className="max-w-[60ch] text-[15px] leading-relaxed text-muted">{item.answer}</p>
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

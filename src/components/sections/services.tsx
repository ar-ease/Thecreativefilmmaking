'use client';

import { useRef, useState } from 'react';
import type { Service } from '@content';
import { useScrollReveal } from '../scroll-reveal';

export function Services({ services }: { services: Service[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  useScrollReveal(ref, '[data-reveal]');

  return (
    <section className="section-pad border-t border-line px-6 md:px-10">
      <div ref={ref} className="mx-auto max-w-[1440px]">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Call us if you need
        </p>

        <div className="mt-8 md:mt-12">
          {services.map((service, i) => {
            const isOpen = open === i;
            return (
              <div key={service.slug} data-reveal className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-6 py-6 text-left md:py-10"
                >
                  <span className="font-mono text-[12px] text-muted">{service.number}</span>
                  <span className="flex-1 font-display text-[28px] leading-tight tracking-[-0.02em] text-paper md:text-[48px]">
                    {service.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`font-mono text-[16px] text-muted transition-transform duration-300 ${
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
                  <div className="min-h-0 overflow-hidden pb-8 md:pb-12">
                    <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:gap-16">
                      <div>
                        <p className="max-w-[48ch] text-[16px] leading-relaxed text-muted md:text-[18px]">
                          {service.body}
                        </p>
                        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70">
                          {service.inclusions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="aspect-video w-full overflow-hidden bg-[#181818]">
                        <video
                          muted
                          loop
                          playsInline
                          autoPlay={isOpen}
                          preload="none"
                          poster={service.clip.poster}
                          src={isOpen ? service.clip.src : undefined}
                          className="block h-full w-full object-cover"
                        />
                      </div>
                    </div>
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

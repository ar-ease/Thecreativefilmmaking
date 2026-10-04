'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Step } from '@content';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const steps_ = steps.length - 1;
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${steps_ * window.innerHeight}`,
      pin: true,
      scrub: true,
      snap: steps_ > 0 ? 1 / steps_ : undefined,
      onUpdate: (self) => setActive(Math.round(self.progress * steps_)),
    });

    return () => st.kill();
  }, [reduced, steps.length]);

  if (reduced) {
    return (
      <section className="section-pad border-t border-line px-6 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">How it works</p>
          <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-2 md:gap-12">
            {steps.map((step) => (
              <div key={step.number}>
                <p className="font-display text-[56px] leading-none tracking-[-0.03em] text-muted/40">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-[32px] leading-tight tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-muted">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden border-t border-line bg-ink px-6 md:px-10">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">How it works</p>

        <div className="relative mt-8 h-px w-full bg-line">
          <span
            className="absolute inset-y-0 left-0 bg-accent"
            style={{ width: `${(active / Math.max(steps.length - 1, 1)) * 100}%`, transition: `width 0.2s ${EASE}` }}
          />
        </div>

        <div className="relative mt-16 min-h-[220px] md:min-h-[320px]">
          {steps.map((step, i) => (
            <div
              key={step.number}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-[opacity,transform] duration-500"
              style={{
                transitionTimingFunction: EASE,
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'translateY(0)' : `translateY(${i < active ? '-' : ''}16px)`,
              }}
            >
              <p className="font-display text-[80px] leading-none tracking-[-0.03em] text-muted/40 md:text-[160px]">
                {step.number}
              </p>
              <h3 className="mt-2 font-display text-[32px] leading-tight tracking-[-0.02em] md:text-[56px]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-muted md:text-[18px]">{step.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-2">
          {steps.map((step, i) => (
            <span
              key={step.number}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i === active ? 'bg-accent' : 'bg-line'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

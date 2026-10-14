'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// "Creative / Film" wordmark. The dot of the i is a little photo with a hinged door that swings open as the footer scrolls in.
export function FilmWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const door = el?.querySelector('[data-door]');
    if (!el || !door) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return gsap.set(door, { rotateY: 90 });
      gsap.fromTo(
        door,
        { rotateY: 0 },
        { rotateY: 90, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'max', scrub: 0.6 } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-label="The Creative Film" className="select-none [container-type:inline-size] md:translate-x-[12%] md:-translate-y-8">
      <div
        aria-hidden="true"
        className="font-display font-bold tracking-[-0.05em] text-paper"
      >
        <p className="text-[9cqw] leading-none">The Creative</p>
        {/* headings are uppercase (globals.css), so the photo "dot" sits above the capital I's cap height */}
        <p className="mt-[12cqw] text-[41cqw] leading-[0.8]">
          F
          <span className="relative inline-block">
            {'ı'}
            <span className="absolute bottom-[0.8em] left-[0.04em] aspect-square w-[0.14em] [perspective:0.6em]">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny still */}
              <img src="/video/hero-01.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <span
                data-door
                className="absolute inset-0 origin-right bg-paper [clip-path:polygon(0_8%,100%_0,100%_100%,0_92%)]"
              />
            </span>
          </span>
          lm
        </p>
      </div>
    </div>
  );
}

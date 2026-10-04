'use client';

import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Fades/blurs in every `selector` match inside `containerRef` the first time it scrolls into view. */
export function useScrollReveal(containerRef: RefObject<Element | null>, selector: string) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = container.querySelectorAll(selector);
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 28, filter: 'blur(10px)' });
    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: container, start: 'top 82%', once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [containerRef, selector]);
}

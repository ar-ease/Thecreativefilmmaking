'use client';

import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ref.current = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      ref.current = null;
    };
  }, []);

  return <LenisContext.Provider value={ref}>{children}</LenisContext.Provider>;
}

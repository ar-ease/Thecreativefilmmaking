import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Props = {
  label: string;
  name: string;
  duration?: number;
  onDone: () => void;
};

export function IntroLoader({ label, name, duration = 1500, onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
      }
    };
    raf = requestAnimationFrame(tick);
    // rAF is throttled in background tabs; never let the loader outstay its welcome.
    const failsafe = setTimeout(() => {
      setProgress(100);
      setExiting(true);
    }, duration + 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [duration]);

  useEffect(() => {
    if (!exiting) return;
    const el = containerRef.current;
    if (!el) {
      onDone();
      return;
    }
    // Curtain lifts off the top, leaving the hero to rise in from below.
    gsap.to(el, { yPercent: -100, duration: 0.9, delay: 0.18, ease: 'power4.inOut', onComplete: onDone });
  }, [exiting, onDone]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[95] overflow-hidden bg-[#050505] text-paper"
      aria-hidden="true"
    >
      {/* Paint floods up from the bottom; the drippy lip rides on top of the fill. */}
      <div className="absolute inset-0" style={{ transform: `translateY(${100 - progress}%)` }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-full h-[min(18vh,120px)] w-full text-accent"
        >
          <path
            fill="currentColor"
            d="M0 120V70c60 10 90-20 150-10s80 30 120 10 60-30 110-20 70 20 120 0 70-10 120 5 50-35 100-25 60 55 80 25 60-40 110-15 90 20 140 5 70-20 120 0 80 10 100 0V120z"
          />
        </svg>
        <div className="absolute inset-0 bg-accent" />
      </div>

      <p className="absolute inset-0 grid place-items-center font-serif text-[clamp(44px,9vw,104px)] font-light leading-[0.9] tracking-tight">
        {name}
      </p>
      <p className="absolute bottom-8 left-6 right-6 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] [font-variant-numeric:tabular-nums]">
        <span>{label}</span>
        <span>{progress}%</span>
      </p>
      <div className="absolute inset-x-0 top-full h-[10vh] rounded-b-[50%_100%] bg-[#050505]" />
    </div>
  );
}

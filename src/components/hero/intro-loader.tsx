import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Props = {
  label: string;
  name: string;
  duration?: number;
  onDone: () => void;
};

function Bracket({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 60"
      className="h-[60px] w-3 flex-none text-paper"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path d="M11 1H1v58h10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

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

  const chars = Math.round((progress / 100) * label.length);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[95] grid place-items-center bg-[#050505] p-6 text-paper"
      aria-hidden="true"
    >
      <div className="flex w-[min(230px,100%)] flex-col items-center gap-3">
        <div className="flex h-[60px] w-full items-center text-paper">
          <Bracket flip />
          <svg
            viewBox="0 0 42 42"
            className="mx-1 h-[30px] w-[30px] animate-spin [animation-duration:2s] [animation-timing-function:linear]"
            aria-hidden="true"
          >
            <circle cx="21" cy="6" r="4.5" fill="currentColor" />
            <circle cx="34" cy="28.5" r="4.5" fill="currentColor" />
            <circle cx="8" cy="28.5" r="4.5" fill="currentColor" />
          </svg>
          <Bracket />
          <span className="w-4 flex-none" />
          <Bracket flip />
          <span
            className="block overflow-hidden whitespace-nowrap font-mono text-[11px] font-light uppercase leading-tight"
            style={{ width: `${chars}ch` }}
          >
            {label}
          </span>
          <Bracket />
        </div>

        <div className="flex w-full items-baseline justify-between font-mono text-[10px] uppercase leading-none tracking-[0.12em] [font-variant-numeric:tabular-nums]">
          <p>{name}</p>
          <p className="text-accent">[{progress}%]</p>
        </div>
        <div className="h-px w-full overflow-hidden bg-[color-mix(in_srgb,var(--paper)_22%,transparent)]">
          <span
            className="block h-full w-full origin-left bg-paper transition-transform duration-[120ms] ease-linear"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 top-full h-[10vh] rounded-b-[50%_100%] bg-[#050505]" />
    </div>
  );
}

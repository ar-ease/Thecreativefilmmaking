'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Hero as HeroContent } from '@content';
import { IntroLoader } from './intro-loader';

// Thin hand-drawn icons (viewBox 0 0 32 32) for the trust row.
const TRUST = [
  {
    title: 'Pro-grade gear',
    icon: 'M3 11c0-1 1-2 2-2h3l2-3h8l2 3h5c1 0 2 1 2 2v13c0 1-1 2-2 2H5c-1 0-2-1-2-2Zm13 3a5 5 0 1 0 .1 0Z',
  },
  {
    title: 'Industry-standard tools',
    icon: 'M3 8h26M3 16h26M3 24h26M9 5v6M20 13v6M14 21v6',
  },
  {
    title: 'Human-made, AI-assisted',
    icon: 'M13 6c1 6 3 9 9 10-6 1-8 4-9 10-1-6-3-9-9-10 6-1 8-4 9-10ZM25 3v7M21.5 6.5h7',
  },
];

type Phase = 'loading' | 'landing' | 'ready';

type Props = {
  content: HeroContent;
  siteName: string;
};

const SESSION_KEY = 'tcf-intro-seen';
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const RISE = 'power4.out';

function shouldBypassIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function Hero({ content, siteName }: Props) {
  const [phase, setPhase] = useState<Phase | null>(null);
  const ref = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const trustRef = useRef<HTMLUListElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  // Headline decorations (smiley, lightning bolt, ring, badge) come in once the headline has settled.
  const [decoOn, setDecoOn] = useState(false);
  useEffect(() => {
    if (phase === 'loading' || phase === null) return;
    const t = setTimeout(() => setDecoOn(true), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const bypass = shouldBypassIntro();
    // Set synchronously so the first painted frame is already in the right state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(bypass ? 'ready' : 'loading');
    document.documentElement.dataset.intro = bypass ? 'done' : 'loading';
    return () => {
      delete document.documentElement.dataset.intro;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'landing') return;
    document.documentElement.dataset.intro = 'done';
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {}
    const t = setTimeout(() => setPhase('ready'), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  // If the loader's animationend never arrives (throttled tab), move on anyway.
  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(() => setPhase('landing'), 3500);
    return () => clearTimeout(t);
  }, [phase]);

  // Entrance: staggered eyebrow/line/cue/intro reveal, once, the first time we leave "loading".
  useEffect(() => {
    if (phase === 'loading' || phase === null) return;
    if (played.current) return;
    played.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lines = linesRef.current.filter(Boolean);

    gsap
      .timeline({ delay: 0.12 })
      .to(scrimRef.current, { opacity: 1, duration: 1, ease: EASE }, 0)
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1, ease: RISE }, 0.1)
      .to(lines, { y: 0, duration: 1.1, ease: RISE, stagger: 0.09 }, 0.18)
      .to(trustRef.current, { opacity: 1, y: 0, duration: 0.9, ease: RISE }, 0.55);
  }, [phase]);

  // Play the single accent clip once the entrance has settled.
  useEffect(() => {
    if (phase !== 'ready') return;
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('connection' in navigator && (navigator.connection as { saveData?: boolean }).saveData) return;
    v.play().catch(() => {});
  }, [phase]);

  return (
    <section
      ref={ref}
      className="relative isolate grid min-h-[100svh] overflow-hidden px-6 text-paper md:px-10"
      aria-labelledby="hero-statement"
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        poster="/video/tcfvid-poster.jpg"
        src="/video/tcfvid.mp4"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div
        ref={scrimRef}
        className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/75 via-ink/35 to-ink/80 opacity-0 motion-reduce:opacity-100"
        aria-hidden="true"
      />

      {phase === 'loading' && (
        <IntroLoader label={content.loaderLabel} name={siteName} onDone={() => setPhase('landing')} />
      )}

      <div className="relative z-[2] flex min-h-[100svh] flex-col items-center pb-[max(24px,env(safe-area-inset-bottom))] pt-24 md:pt-28">
        {/* eyebrow + headline are one group, centred in the space between nav and cue */}
        <div className="my-auto flex flex-col items-center">
          <p
            ref={eyebrowRef}
            className="m-0 translate-y-8 whitespace-pre-line text-center font-serif text-[32px] font-medium leading-tight text-paper/80 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 md:text-[clamp(28px,6.2svh,46px)]"
          >
            {content.eyebrow}
          </p>

          <div data-on={decoOn} className="group relative mt-3 w-fit md:mt-4">
            <h1
              id="hero-statement"
              className="relative z-[1] m-0 max-w-[22ch] text-center text-[clamp(2.75rem,12vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.01em] md:text-[clamp(3rem,min(8vw,15svh),7.5rem)] md:leading-[0.88]"
            >
              {content.lines.map((line, i) => {
                const isSerif = i === content.lines.length - 1;
                return (
                  <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                    <span
                      ref={(el) => {
                        linesRef.current[i] = el;
                      }}
                      className={`block translate-y-[130%] will-change-transform motion-reduce:translate-y-0 ${
                        isSerif ? 'font-serif font-light' : 'font-display font-bold'
                      }`}
                    >
                      {line}
                    </span>
                  </span>
                );
              })}
            </h1>

            {/* Hover decorations: smiley, star, hand-drawn ring under the last line. */}
            <svg
              viewBox="0 0 48 48"
              className="pointer-events-none absolute scale-0 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[on=true]:scale-100 group-data-[on=true]:opacity-100 motion-reduce:transition-none left-7 -top-7 z-[3] h-14 w-14 origin-center group-data-[on=true]:-rotate-12 md:left-8 md:-top-11 md:h-20 md:w-20"
              aria-hidden="true"
            >
              <circle cx="24" cy="24" r="24" className="fill-accent" />
              <g fill="none" stroke="#fde047" strokeWidth="3" strokeLinecap="round">
                <g className="[transform-box:fill-box] origin-center group-data-[on=true]:animate-[blink_2.2s_ease-in-out_0.6s_infinite] motion-reduce:animate-none">
                  <path d="M15 17v6M33 17v6" />
                </g>
                <path d="M12 28c3 8 21 8 24 0" />
              </g>
            </svg>
            <svg
              viewBox="0 0 40 40"
              className="pointer-events-none absolute scale-0 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[on=true]:scale-100 group-data-[on=true]:opacity-100 motion-reduce:transition-none right-0 top-[45%] z-[3] h-12 w-12 origin-center md:-right-6 md:h-[4.5rem] md:w-[4.5rem]"
              aria-hidden="true"
            >
              <g transform="rotate(-16 20 20)">
                <path d="M20 1c8-2 12 4 17 8s4 12 2 19-8 12-16 11S6 35 3 26 2 12 9 6c4-3 7-4 11-5Z" fill="#2f6bff" />
                <path d="M23 6 11 22h8l-3 12 13-17h-8Z" fill="#fde047" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
              </g>
            </svg>
            <svg
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -inset-x-[4%] bottom-[-1%] z-[2] h-[36%] w-[108%] -rotate-1 overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M62 38.5 C 30 39, 1 31, 1 20 C 1 8, 24 1.5, 50 1.5 C 78 1.5, 99 9, 99 20 C 99 31, 80 38, 55 39 C 48 39.3, 42 39.5, 36 39.2"
                fill="none"
                stroke="#fde047"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="opacity-0 transition-[stroke-dashoffset] duration-[2600ms] ease-[cubic-bezier(0.45,0,0.3,1)] [stroke-dasharray:2000] [stroke-dashoffset:2000] group-data-[on=true]:opacity-100 group-data-[on=true]:[stroke-dashoffset:0] motion-reduce:transition-none"
              />
            </svg>
          </div>
        </div>
        <ul
          ref={trustRef}
          className="mt-6 flex translate-y-8 flex-col items-center gap-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 md:mt-8 md:flex-row md:gap-0"
        >
          {TRUST.map((t) => (
            <li key={t.title} className="flex items-center gap-2.5 text-paper/85 md:px-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-paper/20">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="shrink-0 text-paper/55" aria-hidden="true">
                <path d={t.icon} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-display text-[11px] font-medium uppercase leading-tight tracking-[0.14em]">{t.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

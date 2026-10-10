'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Hero as HeroContent } from '@content';
import { IntroLoader } from './intro-loader';

const CUE_SQUIGGLES = [
  'M2 6c10-8 20 6 30-2s20 6 30-2 20 6 26-1',
  'M2 5c6-4 10 4 16 0s10 4 16 0 10 4 16 0 10 4 16 0 10 4 6 1',
  'M2 6c14-9 26 9 40 0s28 7 46-2',
] as const;

type Phase = 'loading' | 'landing' | 'ready';

type Props = {
  content: HeroContent;
  siteName: string;
};

const SESSION_KEY = 'tcf-intro-seen';
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const [cueHover, setCueHover] = useState(0);
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
      .to(eyebrowRef.current, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.7, ease: EASE }, 0.1)
      .to(lines, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, ease: EASE, stagger: 0.08 }, 0.18)
      .to(cueRef.current, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.6, ease: EASE }, 0.5);
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
            className="m-0 translate-y-2 whitespace-pre-line text-center font-serif text-[32px] font-medium leading-tight text-paper/80 opacity-0 blur-md motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-none md:text-[clamp(28px,6.2svh,46px)]"
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
                  <span
                    key={line}
                    ref={(el) => {
                      linesRef.current[i] = el;
                    }}
                    className={`block translate-y-[0.12em] opacity-0 blur-md will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-none ${
                      isSerif ? 'font-serif font-normal not-italic' : 'font-display font-bold'
                    }`}
                  >
                    {line}
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

            <div
              className="absolute -right-3 top-12 z-[3] flex scale-75 items-center gap-2.5 whitespace-nowrap pointer-events-none origin-bottom-left rounded-none bg-yellow-300 px-3.5 py-2 font-serif text-[15px] font-normal uppercase leading-none tracking-[-0.01em] text-ink opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[on=true]:-rotate-6 group-data-[on=true]:scale-100 group-data-[on=true]:opacity-100 motion-reduce:transition-none shadow-[0_8px_20px_rgba(0,0,0,0.25)] md:-right-6 md:top-20 md:px-5 md:py-3 md:text-[20px]"
            >
              <svg
                viewBox="0 0 44 44"
                className="-my-7 -ml-8 h-14 w-14 shrink-0 overflow-visible -rotate-6 drop-shadow-[0_6px_4px_rgba(0,0,0,0.5)] md:-my-9 md:-ml-10 md:h-[4.5rem] md:w-[4.5rem]"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="clap-body" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3a3a3a" />
                    <stop offset="1" stopColor="#0b0b0b" />
                  </linearGradient>
                  <linearGradient id="clap-arm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#4a4a4a" />
                    <stop offset="1" stopColor="#141414" />
                  </linearGradient>
                  <clipPath id="clap-arm-clip">
                    <rect x="4" y="8" width="36" height="9" rx="1.5" />
                  </clipPath>
                </defs>
                <rect x="4" y="17" width="36" height="22" rx="2" fill="url(#clap-body)" />
                <rect x="4" y="17" width="36" height="2.5" fill="#000" opacity="0.5" />
                <path d="M9 25h26M9 30h18M9 35h22" stroke="#fde047" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
                <path d="M5 38.5h34" stroke="#fff" strokeWidth="0.8" opacity="0.18" />
                <g className="[transform-box:view-box] [transform-origin:4px_17px] group-data-[on=true]:animate-[clap_4.5s_ease-in-out_infinite] motion-reduce:animate-none">
                  <rect x="4" y="8" width="36" height="9" rx="1.5" fill="url(#clap-arm)" />
                  <g clipPath="url(#clap-arm-clip)" fill="#fef9c3">
                    <path d="M8 17l5-9h5l-5 9ZM20 17l5-9h5l-5 9ZM32 17l5-9h5l-5 9Z" />
                  </g>
                  <rect x="4" y="8" width="36" height="2" rx="1" fill="#fff" opacity="0.28" />
                </g>
              </svg>
              The Creative Film
            </div>
          </div>
        </div>

        <div
          ref={cueRef}
          onMouseEnter={() => setCueHover((n) => n + 1)}
          className="mt-6 flex translate-y-2 flex-col items-center gap-2 opacity-0 blur-md motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-none md:mt-8"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3">
            <span className="font-serif text-[16px] italic text-paper md:text-[18px]">Scroll to explore</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-paper">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 1v12M2 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <svg
            key={cueHover}
            width="90"
            height="10"
            viewBox="0 0 90 10"
            fill="none"
            className={`text-accent ${cueHover ? 'animate-[squiggle-draw_0.4s_var(--ease-out)_both] motion-reduce:animate-none' : ''}`}
          >
            <path
              d={CUE_SQUIGGLES[cueHover % CUE_SQUIGGLES.length]}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

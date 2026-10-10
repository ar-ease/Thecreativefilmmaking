'use client';

import { CtaLink } from '../cta-link';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../scroll-reveal';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, '[data-reveal]');

  // Underline sketches in left→right as the heading scrolls into view (scrubbed, rewinds on scroll up).
  useLayoutEffect(() => {
    const line = ref.current?.querySelector<SVGSVGElement>('[data-underline]');
    if (!line || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      line,
      { clipPath: 'inset(-20% 100% -20% 0)' },
      {
        clipPath: 'inset(-20% 0% -20% 0)',
        ease: 'none',
        scrollTrigger: { trigger: line, start: 'top 90%', end: 'top 55%', scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  const introRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const chipRef = useRef<HTMLSpanElement>(null);

  const moveChip = (e: React.MouseEvent<HTMLButtonElement>) => {
    const chip = chipRef.current;
    if (!chip) return;
    const r = e.currentTarget.getBoundingClientRect();
    chip.style.left = `${e.clientX - r.left}px`;
    chip.style.top = `${e.clientY - r.top}px`;
  };

  const toggleMute = () => {
    const v = introRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="section-pad relative overflow-hidden border-t border-line bg-ink px-6 text-paper md:px-10">
      <div ref={ref} className="mx-auto max-w-[1440px]">
        <div data-reveal className="relative text-center">
          {/* background artwork: two line-drawn film doodles, nothing else */}
          <svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            className="pointer-events-none absolute -left-2 -top-10 w-[22vw] max-w-[260px] -rotate-12 text-paper/25 md:-top-16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="12" y="44" width="96" height="62" rx="3" />
            <path d="M12 44l8-22 96 12-4 10M32 28l10 14M54 31l10 14M76 34l10 14M12 62h96" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            className="pointer-events-none absolute -bottom-10 -right-2 w-[20vw] max-w-[240px] rotate-6 text-paper/25 md:-bottom-14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M60 10C25 8 8 40 14 70s40 44 68 36 34-48 20-70S78 6 52 14" />
            <circle cx="60" cy="60" r="16" />
            <path d="M60 44v-8M60 84v8M44 60h-8M84 60h8" />
          </svg>
          <h2 className="relative">
            <span className="block text-[clamp(3rem,9vw,8rem)] font-bold lowercase leading-[0.9] tracking-[-0.04em]">
              quiet moments,
            </span>
            <span className="relative mx-auto mt-2 block w-fit font-serif text-[clamp(3rem,9vw,8rem)] italic leading-[1] tracking-[-0.02em]">
              loud memories.
              <svg data-underline viewBox="0 0 400 24" preserveAspectRatio="none" className="mt-1 h-5 w-full overflow-visible text-paper md:h-7" aria-hidden="true">
                <path
                  d="M4 16C80 8 150 10 220 6c-30 6-10 12 30 10 50-3 100-6 146-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h2>
        </div>

        <div data-reveal className="mx-auto mt-10 w-full max-w-[1040px] -rotate-1 bg-[#d8cfc0] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:mt-12 md:p-5">
        <div className="group relative aspect-video w-full overflow-hidden bg-[#181818]">
          {/* ponytail: placeholder clip, swap src/poster for the real intro */}
          <video
            ref={introRef}
            src="/video/tcfvid.mp4"
            poster="/video/tcfvid-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="block h-full w-full object-cover"
          />
          {/* Whole window is the button; the icon chip follows the cursor. */}
          <button
            type="button"
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            onClick={toggleMute}
            onMouseMove={moveChip}
            className="absolute inset-0 cursor-none focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-paper"
          >
            <span
              ref={chipRef}
              className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
              </svg>
            </span>
          </button>
        </div>
        </div>

        <div data-reveal className="mt-8 flex items-start justify-center md:mt-10">
          <CtaLink href="/work" label="See our work" tone="bg-accent text-ink" />
        </div>
      </div>
    </section>
  );
}

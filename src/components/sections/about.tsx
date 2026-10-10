'use client';

import { useRef } from 'react';
import { ScribbleLink } from '../scribble-link';
import { useScrollReveal } from '../scroll-reveal';

const SERVICES = [
  {
    title: 'Campaign',
    tagline: 'Big ideas, shot to stick in your mind.',
    bg: 'bg-[#1a35f5]',
    tilt: 'md:-rotate-3 hover:md:-rotate-[1.5deg]!',
    src: '/video/hero-01.mp4',
    poster: '/video/hero-01.jpg',
  },
  {
    title: 'Video',
    tagline: 'Your story, in pictures.',
    bg: 'bg-accent-pink',
    tilt: 'md:-translate-y-[1.4vw] hover:md:rotate-0!',
    src: '/video/hero-02.mp4',
    poster: '/video/hero-02.jpg',
  },
  {
    title: 'Social',
    tagline: 'Content that makes you stop scrolling.',
    bg: 'bg-accent',
    tilt: 'md:rotate-3 hover:md:rotate-[1.5deg]!',
    src: '/video/hero-03.mp4',
    poster: '/video/hero-03.jpg',
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, '[data-reveal]');

  return (
    <section className="section-pad border-t border-line-on-paper bg-paper px-6 text-ink md:px-10">
      <div ref={ref} className="mx-auto max-w-[1440px] text-center">
        <p data-reveal className="font-serif text-[18px] italic text-ink/70 md:text-[24px]">
          Services
        </p>
        <h2
          data-reveal
          className="mt-2 text-[44px] uppercase leading-[0.95] tracking-[-0.03em] md:text-[96px]"
        >
          <span className="font-display font-bold">What we </span>
          <span className="font-serif font-normal">do</span>
        </h2>

        <div className="group/row mt-12 flex flex-col items-center gap-12 md:mt-16 md:mx-auto md:max-w-[min(62vw,980px)] md:flex-row md:items-center md:justify-center md:gap-0">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              data-reveal
              className="relative flex w-full max-w-[380px] justify-center md:z-[1] md:w-[34%] md:max-w-none md:hover:z-10"
            >
              <figure
                className={`flex w-full flex-col p-3 pb-6 text-center text-paper shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-transform duration-[550ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform motion-reduce:transition-none md:p-3.5 md:pb-6 md:group-hover/row:scale-[0.94] md:hover:scale-[1.1]! ${s.bg} ${s.tilt}`}
              >
                {/* ponytail: placeholder clips reuse the hero reels, swap src/poster per service */}
                <video
                  src={s.src}
                  poster={s.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="aspect-[4/5] w-full bg-ink object-cover"
                />
                <figcaption className="mt-5">
                  <p className="font-display text-[44px] font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-[clamp(30px,3.4vw,56px)]">
                    {s.title}
                  </p>
                  <p className="mx-auto mt-2 max-w-[20ch] font-serif text-[20px] leading-[1.05] md:text-[clamp(15px,1.35vw,22px)]">
                    {s.tagline}
                  </p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-14 flex justify-center md:mt-14">
          <ScribbleLink href="/services" label="Discover more" />
        </div>
      </div>
    </section>
  );
}

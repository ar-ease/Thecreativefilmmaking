'use client';

import { Fragment, useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../scroll-reveal';

gsap.registerPlugin(ScrollTrigger);

/* ponytail: copy lives here, move to @content if it needs editing outside code. */
const HEADLINE = 'we shoot the feel, not just the frame';
const BODY =
  'Stories travel further than ever. We shoot weddings, brands and music that feel as good on a phone screen as they do in a dark room.';

/** Where each non-word item sits in the line: index = number of words before it. */
const DECOR: Record<number, 'thumb' | 'loop' | 'cursor' | 'phone' | 'curve'> = {
  2: 'thumb',
  4: 'loop',
  5: 'cursor',
  7: 'curve',
};

/** Deterministic pseudo-random in [-1, 1] so server and client agree. */
const rand = (i: number, salt: number) => Math.sin(i * 12.9898 + salt * 78.233) * 2 * Math.cos(i * 3.1 + salt) * 0.5;
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const STROKE = { fill: 'none', strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Sticker({ bg, ink, children }: { bg: string; ink: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
      <path
        d="M50 4c14-2 22 8 34 12s14 18 12 32-4 22-14 34-26 14-40 12S14 86 8 70 2 38 10 24 36 6 50 4Z"
        fill={bg}
      />
      <g stroke={ink} {...STROKE}>
        {children}
      </g>
    </svg>
  );
}

const DECOR_NODE = {
  thumb: (
    <Sticker bg="var(--accent)" ink="#fde047">
      <path d="M36 50V72q0 4 4 4h22q8 0 9-8l3-14q1-8-7-8H52l2-12q0-8-6-8-4 0-5 6l-3 14Z" />
      <path d="M36 50H28v26h8M50 60h18M49 68h16" />
      <path d="M72 18l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
    </Sticker>
  ),
  cursor: (
    <Sticker bg="#fbd5ec" ink="#2f4bff">
      <path d="M30 28l6 50 12-12 10 20 9-4-10-20 17-2Z" />
      <circle cx="24" cy="26" r="4" />
      <circle cx="78" cy="40" r="4" />
      <path d="M40 18l4 8 8 4-8 4-4 8-4-8-8-4 8-4Z" />
    </Sticker>
  ),
  phone: (
    <Sticker bg="#e4f7b0" ink="#9b2457">
      <rect x="30" y="22" width="30" height="50" rx="6" transform="rotate(-18 45 47)" />
      <path d="M44 66c8 0 16 4 20 12M60 60c6 2 12 8 12 16" />
      <path d="M62 14l-3 8M72 20l-6 6M76 30l-8 2" />
    </Sticker>
  ),
  loop: (
    <svg viewBox="0 0 270 100" className="h-full w-full overflow-visible" aria-hidden="true">
      <g stroke="currentColor" {...STROKE} strokeWidth={3}>
        <path data-draw pathLength={1} d="M16 76C20 40 45 18 75 18C100 18 138 36 134 56C131 74 112 80 100 70C88 58 92 36 108 24C125 8 165 0 200 18C222 30 236 52 243 73" />
        <path data-head d="M223 60L243 73L245 49" />
      </g>
    </svg>
  ),
  curve: (
    <svg viewBox="0 0 120 60" className="h-full w-full overflow-visible" aria-hidden="true">
      <g stroke="currentColor" {...STROKE} strokeWidth={4}>
        <path data-draw pathLength={1} d="M4 54C20 12 70 0 116 24" />
        <path data-head d="M100 25L116 24L107 11" />
      </g>
    </svg>
  ),
} as const;

const DECOR_BOX: Record<keyof typeof DECOR_NODE, string> = {
  thumb: 'h-[0.95em] w-[0.95em] -mx-[0.2em] -translate-y-[0.35em] -rotate-6',
  cursor: 'h-[0.95em] w-[0.95em] -mx-[0.2em] translate-y-[0.3em] rotate-6',
  phone: 'h-[0.95em] w-[0.95em] -mx-[0.2em] -translate-y-[0.4em] rotate-3',
  loop: 'h-[0.74em] w-[2em] -mx-[1em] -translate-y-[0.3em]',
  curve: 'h-[0.55em] w-[1.1em] -mx-[0.55em] -translate-y-[0.3em]',
};

export function ScrollStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  useScrollReveal(outroRef, '[data-reveal]');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    section.dataset.scrub = '';
    const letters = Array.from(track.querySelectorAll<HTMLElement>('[data-letter]'));
    const stickers = Array.from(track.querySelectorAll<HTMLElement>('[data-decor]'));
    let base: number[] = [];
    let widths: number[] = [];
    let sBase: number[] = [];
    let sWidths: number[] = [];
    let trackW = 0;
    let vw = 0;
    let em = 16;
    let lead = 0; // 0→1 while the section scrolls up into view, before it pins
    let prog = 0;
    let lastP = 0;
    const drawn: number[] = []; // 0→1 how much of each arrow is drawn

    const measure = () => {
      gsap.set([...letters, ...stickers, track], { clearProps: 'transform' });
      vw = window.innerWidth;
      em = parseFloat(getComputedStyle(track).fontSize);
      trackW = track.scrollWidth;
      base = letters.map((l) => l.offsetLeft);
      widths = letters.map((l) => l.offsetWidth);
      sBase = stickers.map((el) => el.offsetLeft);
      sWidths = stickers.map((el) => el.offsetWidth);
    };

    const render = (p: number) => {
      prog = p;
      const s = vw * (1 - 0.5 * lead); // headline starts peeking in from the right
      // Eases in and out: p**1.4 hit full speed right at pin release, so the track stopped dead (the "shutter").
      const x = s - smooth(0, 1, p) * (s + trackW - vw * 0.92); // stops with the last word fully in view
      track.style.transform = `translate3d(${x}px,0,0)`;
      letters.forEach((l, i) => {
        // Only letters still arriving on the right are scattered; once placed they stay straight.
        const d = (x + base[i] + widths[i] / 2 - vw / 2) / (vw / 2);
        const s = smooth(0.35, 1.1, d) * (1 - smooth(0.7, 1, p)); // the last word lands straight
        l.style.transform = s
          ? `translate3d(0,${rand(i, 1) * em * 0.9 * s}px,0) rotate(${rand(i, 2) * 22 * s}deg)`
          : '';
      });
      stickers.forEach((el, i) => {
        if (!el.querySelector('[data-draw]')) el.style.rotate = `${Math.sin(p * 18 + i) * 8}deg`;
        const d = (x + sBase[i] + sWidths[i] / 2 - vw / 2) / (vw / 2);
        const draws = el.querySelectorAll<SVGPathElement>('[data-draw]');
        if (draws.length) {
          // Arrows are scrubbed by scroll. Forward only ever adds to the drawing (so it stays);
          // backward only ever takes away, starting while the arrow is still on screen.
          const fwd = p > lastP + 1e-4;
          const back = p < lastP - 1e-4;
          let t = drawn[i] ?? 0;
          if (fwd) t = Math.max(t, 1 - smooth(0.45, 1, d));
          else if (back) t = Math.min(t, 1 - smooth(-0.9, 0.45, d));
          drawn[i] = t;
          draws.forEach((path) => {
            path.style.strokeDashoffset = `${1 - t}`;
            path.style.opacity = t > 0.001 ? '1' : '0'; // round caps would paint a dot on a zero-length dash
          });
          el.querySelectorAll<SVGPathElement>('[data-head]').forEach((h) => {
            h.style.opacity = `${smooth(0.9, 1, t)}`;
          });
          return;
        }
        el.style.scale = `${0.4 + 0.6 * (1 - smooth(0.4, 1, d))}`;
      });
      lastP = p;
    };

    stickers.forEach((el) => {
      el.querySelectorAll<SVGPathElement>('[data-draw]').forEach((p) => {
        p.style.strokeDasharray = '1';
        p.style.strokeDashoffset = '1';
        p.style.opacity = '0';
      });
      el.querySelectorAll<SVGPathElement>('[data-head]').forEach((h) => (h.style.opacity = '0'));
    });
    measure();
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${(trackW - vw * 0.42) * 0.85}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onRefreshInit: measure,
      onUpdate: (self) => render(self.progress),
    });
    const pre = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'top top',
      onRefresh: (self) => {
        lead = self.progress;
        render(prog);
      },
      onUpdate: (self) => {
        lead = self.progress;
        render(prog);
      },
    });
    render(0);
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      st.kill();
      pre.kill();
      delete section.dataset.scrub;
      gsap.set([...letters, ...stickers, track], { clearProps: 'all' });
    };
  }, []);

  // Outro: underline sketches in with scroll, heart sticker pops in (and back out) with scroll.
  useLayoutEffect(() => {
    const outro = outroRef.current;
    const line = outro?.querySelector<SVGSVGElement>('[data-underline]');
    const pop = outro?.querySelector<HTMLElement>('[data-pop]');
    const flash = outro?.querySelector<SVGGElement>('[data-flash]');
    if (!outro || !line || !pop || !flash) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { clipPath: 'inset(-20% 100% -20% 0)' }, // wipes left→right like a pen stroke
        {
          clipPath: 'inset(-20% 0% -20% 0)',
          ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 90%', end: 'top 60%', scrub: true },
        },
      );
      // Camera pops in, then fires its flash; scrolling back rewinds both.
      gsap
        .timeline({ scrollTrigger: { trigger: line, start: 'top 70%', toggleActions: 'play none none reverse' } })
        .fromTo(pop, { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, ease: 'back.out(2.2)', duration: 0.6 })
        .fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.06 }, '+=0.1')
        .to(flash, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    }, outro);
    return () => ctx.revert();
  }, []);

  const words = HEADLINE.split(' ');

  return (
    <div className="relative z-10 bg-paper text-ink">
      <section
        ref={sectionRef}
        className="group relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 data-[scrub]:block data-[scrub]:p-0"
        aria-labelledby="scroll-statement"
      >
        <h2
          id="scroll-statement"
          ref={trackRef}
          aria-label={HEADLINE}
          className="m-0 flex max-w-[16ch] flex-wrap justify-center text-center text-[clamp(3rem,10vw,3.5rem)] font-bold lowercase leading-[0.95] tracking-[-0.04em] group-data-[scrub]:absolute group-data-[scrub]:left-0 group-data-[scrub]:top-[42%] group-data-[scrub]:max-w-none group-data-[scrub]:-translate-y-1/2 group-data-[scrub]:flex-nowrap group-data-[scrub]:whitespace-nowrap group-data-[scrub]:text-[clamp(5rem,14vw,13rem)] group-data-[scrub]:will-change-transform"
        >
          {words.map((w, wi) => (
            <Fragment key={wi}>
              {DECOR[wi] && (
                <span
                  data-decor
                  aria-hidden="true"
                  className={`hidden shrink-0 group-data-[scrub]:inline-block ${DECOR_BOX[DECOR[wi]]} ${
                    DECOR[wi] === 'loop' || DECOR[wi] === 'curve' ? '' : 'will-change-transform'
                  }`}
                >
                  {DECOR_NODE[DECOR[wi]]}
                </span>
              )}
              <span aria-hidden="true" className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0">
                {[...w].map((c, ci) => (
                  <span key={ci} data-letter className="inline-block will-change-transform">
                    {c}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </h2>

        <p className="mx-auto mt-8 max-w-[34ch] text-center text-[18px] leading-snug md:text-[22px] group-data-[scrub]:absolute group-data-[scrub]:inset-x-6 group-data-[scrub]:bottom-[14svh] group-data-[scrub]:mt-0">
          {BODY}
        </p>
      </section>

      <div ref={outroRef} className="section-pad px-6 text-center md:px-10">
        <p data-reveal className="mx-auto max-w-[12ch] text-[clamp(3rem,9vw,8rem)] font-bold lowercase leading-[0.9] tracking-[-0.04em]">
          a studio built for the feel,
        </p>
        <div data-reveal className="relative mx-auto mt-2 w-fit">
          <p className="m-0 font-serif text-[clamp(3rem,9vw,8rem)] italic leading-[1] tracking-[-0.02em]">
            from script to screen.
          </p>
          <svg data-underline viewBox="0 0 400 24" preserveAspectRatio="none" className="mt-1 h-5 w-full overflow-visible md:h-7" aria-hidden="true">
            <path
              d="M4 16C80 8 150 10 220 6c-30 6-10 12 30 10 50-3 100-6 146-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span data-pop className="absolute -right-6 -top-10 h-20 w-20 rotate-6 md:-right-14 md:-top-20 md:h-36 md:w-36" aria-hidden="true">
            <Sticker bg="var(--accent)" ink="#fde047">
              <rect x="20" y="36" width="60" height="40" rx="7" />
              <path d="M38 36l4-8h16l4 8" />
              <circle cx="50" cy="56" r="11" />
              <g data-flash opacity="0">
                <circle cx="50" cy="56" r="7" fill="#fff" stroke="none" />
                <path d="M72 24l4-8M82 30l8-4M86 42l8 2M14 22l-6-6M24 14l-2-8" stroke="#fff" />
              </g>
            </Sticker>
          </span>
        </div>
      </div>
    </div>
  );
}

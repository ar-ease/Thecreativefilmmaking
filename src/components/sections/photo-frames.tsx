'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScribbleLink } from '../scribble-link';

gsap.registerPlugin(ScrollTrigger, InertiaPlugin);

/* ponytail: stills reuse the hero posters, swap `src` for real photos when they exist.
   `pos` is the md+ scatter (percent of the stage). */
const W = 'md:w-[28%]';
/* Each frame carries its own die-cut sticker. `side` is the photo corner it straddles. */
const FRAMES = [
  { src: '/video/hero-02.jpg', sticker: 'script', aria: 'storyboard', side: 'right', pos: 'md:left-[8%] md:top-[0%]', tag: '-rotate-[10deg]' },
  { src: '/video/hero-01.jpg', sticker: 'shoot', aria: 'no filler, all feel', side: 'left', pos: 'md:left-[64%] md:top-[11.2%]', tag: 'rotate-[8deg]' },
  { src: '/video/hero-03.jpg', sticker: 'sound', aria: 'sound design', side: 'right', pos: 'md:left-[16%] md:top-[31.3%]', tag: '-rotate-[12deg]' },
  { src: '/video/hero-04.jpg', sticker: 'grade', aria: 'graded by hand', side: 'right', pos: 'md:left-[60%] md:top-[43.75%]', tag: '-rotate-[6deg]' },
  { src: '/video/tcfvid-poster.jpg', sticker: 'screen', aria: 'AI usage', side: 'left', pos: 'md:left-[12%] md:top-[62.5%]', tag: 'rotate-[6deg]' },
] as const;

const SHADOW = { filter: 'drop-shadow(0 0.2em 0.3em rgba(0,0,0,0.2))' } as const;
const INK = '#14110f';
const NAVY = '#1d2a6b';

/** Die-cut backing: the silhouette filled and stroked white, so every sticker gets the same thick printed edge. */
function Cut({ d, fill, edge = '#fff' }: { d: string; fill: string; edge?: string }) {
  return (
    <>
      <path d={d} fill={edge} stroke={edge} strokeWidth="14" strokeLinejoin="round" />
      <path d={d} fill={fill} />
    </>
  );
}

/* Five different silhouettes, one per crew job: storyboard card, clapper stamp, octagon badge, grading chart, swallowtail ribbon. */
const STICKERS: Record<(typeof FRAMES)[number]['sticker'], ReactNode> = {
  script: (
    <svg viewBox="0 0 270 72" className="block h-auto w-[5.4em] overflow-visible" style={SHADOW} aria-hidden="true">
      <Cut d="M6 8H222L264 36L222 64H6Z" fill="#fde047" />
      <path d="M6 8H44V64H6Z" fill="#ff4fa6" />
      <path d="M44 8H60V64H44Z" fill="#b9bcc2" />
      <path d="M222 8L264 36L222 64Z" fill="#f1cf9b" />
      <path d="M247 25L264 36L247 47Z" fill={INK} />
      <path d="M60 17H222M60 55H222" stroke="#e8b923" strokeWidth="3" />
      <text x="140" y="46" textAnchor="middle" fontSize="28" fontWeight="900" letterSpacing="-1" fill={NAVY}>storyboard</text>
    </svg>
  ),
  shoot: (
    <svg viewBox="0 0 200 130" className="block h-auto w-[3.8em] overflow-visible" style={SHADOW} aria-hidden="true">
      <g stroke="#0f766e" strokeWidth="13" strokeLinejoin="round" paintOrder="stroke" fill="#ccfbf1">
        <rect x="82" y="16" width="36" height="22" />
        <path d="M82 16l3-9 33 6-1 3Z" />
        <text x="100" y="78" textAnchor="middle" fontSize="36" fontWeight="900" strokeWidth="14">NO FILLER.</text>
        <text x="100" y="114" textAnchor="middle" fontSize="36" fontWeight="900" strokeWidth="14">ALL FEEL.</text>
      </g>
      <path d="M90 16l3-8M100 16l3-7M110 16l3-6" stroke="#0f766e" strokeWidth="3" />
    </svg>
  ),
  sound: (
    <svg viewBox="0 0 220 170" className="block h-auto w-[4.2em] overflow-visible" style={SHADOW} aria-hidden="true">
      {/* white die-cut layer first, then the colour on top */}
      <g fill="#fff" stroke="#fff" strokeLinejoin="round" strokeLinecap="round">
        <path d="M46 92C46 22 174 22 174 92" fill="none" strokeWidth="30" />
        <rect x="26" y="78" width="44" height="64" strokeWidth="14" />
        <rect x="150" y="78" width="44" height="64" strokeWidth="14" />
      </g>
      <path d="M46 92C46 22 174 22 174 92" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <rect x="26" y="78" width="44" height="64" fill="#f2601a" />
      <rect x="150" y="78" width="44" height="64" fill="#f2601a" />
      <path d="M38 92v40M158 92v40" stroke={INK} strokeWidth="5" />
      <text
        x="110" y="158" textAnchor="middle" fontSize="31" fontWeight="900" letterSpacing="-1"
        fill={INK} stroke="#fff" strokeWidth="13" strokeLinejoin="round" paintOrder="stroke"
      >
        sound design
      </text>
    </svg>
  ),
  grade: (
    <svg viewBox="0 0 220 112" className="block h-auto w-[4.4em] overflow-visible" style={SHADOW} aria-hidden="true">
      <Cut d="M6 6H214V78L184 106H6Z" fill="#2f4bff" />
      {['#0f4c4a', '#f2601a', '#e9d8b4', '#8a3b5c', '#ffb3d9'].map((c, i) => (
        <rect key={c} x={6 + i * 41.6} y="6" width="41.6" height="52" fill={c} />
      ))}
      <text x="18" y="88" fontSize="25" fill="#fff" fontFamily="var(--font-serif), Georgia, serif">graded by hand</text>
    </svg>
  ),
  screen: (
    <svg viewBox="0 0 200 128" className="block h-auto w-[3.8em] overflow-visible" style={SHADOW} aria-hidden="true">
      {/* same die-cut text stamp as the green one: pale fill, thick dark edge painted behind the letters */}
      <g fill="#efe7ff" stroke="#4a1fa8" strokeWidth="14" strokeLinejoin="round" paintOrder="stroke">
        <path d="M142 6C144 18 150 24 162 26C150 28 144 34 142 46C140 34 134 28 122 26C134 24 140 18 142 6Z" />
        <text x="100" y="66" textAnchor="middle" fontSize="50" fontWeight="900" letterSpacing="-1">AI</text>
        <text x="100" y="114" textAnchor="middle" fontSize="50" fontWeight="900" letterSpacing="-1">USAGE.</text>
      </g>
    </svg>
  ),
};

export function PhotoFrames() {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      const w = window.innerWidth;
      const distance = 200 * (w >= 992 ? 1 : w >= 480 ? 0.5 : 0.3);

      gsap.utils.toArray<HTMLElement>('[data-frame]').forEach((frame, i) => {
        const photo = frame.querySelector('[data-photo]');
        const img = frame.querySelector('img');
        const label = frame.querySelector('[data-label]');

        // Opens like a shutter from the bottom, photo settles from a light zoom, sticker slaps on last.
        // Quick but soft: short durations on gentle out-curves, small zoom, mild overshoot, so it reads at a glance.
        gsap
          .timeline({ scrollTrigger: { trigger: frame, start: 'top 88%', once: true } })
          .fromTo(photo, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power3.out' })
          .fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, 0)
          .fromTo(label, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' }, 0.45);

        // Scroll parallax (extrafazant.nl): even frames drift down, odd ones up at 0.6x, scrubbed across the whole stage.
        gsap.to(frame, {
          y: distance * (i % 2 === 0 ? 1 : -0.6),
          ease: 'none',
          scrollTrigger: { trigger: stage, start: 'clamp(top bottom)', end: 'clamp(bottom top)', scrub: true, invalidateOnRefresh: true },
        });
      });

      // Momentum hover (extrafazant.nl): touching a photo or a sticker throws THAT element along the cursor's
      // own velocity, plus a spin from which side it was hit; InertiaPlugin then glides it back to rest with overshoot.
      // Photo and sticker are separate targets, so each reacts on its own.
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      let lastX = 0;
      let lastY = 0;
      let dx = 0;
      let dy = 0;
      let seen = false;
      let raf = 0;
      const track = (e: MouseEvent) => {
        if (!seen) {
          seen = true;
          lastX = e.clientX;
          lastY = e.clientY;
          return;
        }
        if (raf) return;
        const { clientX: x, clientY: y } = e;
        raf = requestAnimationFrame(() => {
          dx = x - lastX;
          dy = y - lastY;
          lastX = x;
          lastY = y;
          raf = 0;
        });
      };
      stage.addEventListener('mousemove', track);

      const vel = gsap.utils.clamp(-1080, 1080);
      const spin = gsap.utils.clamp(-60, 60);
      // `k` scales the throw: the sticker gets a bigger, looser one so it visibly bounces on its own beat.
      const throwIt = (target: HTMLElement, e: MouseEvent, k = 1, delay = 0) => {
        const r = target.getBoundingClientRect();
        const px = e.clientX - (r.left + r.width / 2);
        const py = e.clientY - (r.top + r.height / 2);
        const torque = (px * dy - py * dx) / (Math.hypot(px, py) || 1);
        gsap.to(target, {
          delay,
          inertia: {
            x: { velocity: vel(dx * 30 * k), end: 0 },
            y: { velocity: vel(dy * 30 * k), end: 0 },
            rotation: { velocity: spin(torque * 20 * k), end: 0 },
            resistance: 200 / k,
          },
        });
      };
      stage.querySelectorAll<HTMLElement>('[data-frame]').forEach((frame) => {
        const photo = frame.querySelector<HTMLElement>('[data-photo]');
        const label = frame.querySelector<HTMLElement>('[data-label]');
        if (!photo || !label) return;
        // Hit the photo: it bounces, and its sticker bounces too, but as its own separate throw a beat later.
        const onPhoto = (e: MouseEvent) => {
          throwIt(photo, e);
          throwIt(label, e, 1.6, 0.06);
        };
        // Hit the sticker directly: only the sticker moves.
        const onLabel = (e: MouseEvent) => throwIt(label, e, 1.3);
        photo.addEventListener('mouseenter', onPhoto);
        label.addEventListener('mouseenter', onLabel);
        cleanups.push(() => {
          photo.removeEventListener('mouseenter', onPhoto);
          label.removeEventListener('mouseenter', onLabel);
          gsap.killTweensOf([photo, label], 'x,y,rotation');
        });
      });
      cleanups.push(() => {
        stage.removeEventListener('mousemove', track);
        cancelAnimationFrame(raf);
      });
    }, stage);
    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative z-10 overflow-hidden bg-paper pb-0 text-ink" aria-label="From script to screen">
      <div
        ref={stageRef}
        className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 pb-16 pt-0 md:relative md:block md:h-[140vw] md:gap-0 md:px-10 md:pb-0 md:pt-0"
      >
        {FRAMES.map((f, i) => (
          <figure
            key={f.sticker}
            data-frame
            className={`relative m-0 w-[78%] md:absolute ${W} ${f.pos} ${i % 2 ? 'self-end' : 'self-start'}`}
          >
            <div data-photo className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- plain stills, scaled by GSAP */}
              <img src={f.src} alt="" loading="lazy" className="block aspect-[4/5] h-auto w-full object-cover" />
            </div>
            <figcaption
              data-label
              aria-label={f.aria}
              className={`absolute -bottom-[7%] whitespace-nowrap text-[clamp(1.75rem,3.8vw,3.8rem)] ${
                f.side === 'right' ? '-right-[10%]' : '-left-[10%]'
              } ${f.tag}`}
            >
              <span aria-hidden="true">{STICKERS[f.sticker]}</span>
            </figcaption>
          </figure>
        ))}
        <div className="self-end md:absolute md:bottom-[9.8%] md:right-[28%] md:origin-bottom-right md:scale-[1.3]">
          <ScribbleLink href="/contact" label="Contact now" />
        </div>
      </div>
    </section>
  );
}

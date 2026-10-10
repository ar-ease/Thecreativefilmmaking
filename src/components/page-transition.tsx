'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useLenis } from './smooth-scroll';

const labelFor = (path: string) =>
  path === '/' ? 'Home' : (path.split('/').filter(Boolean).pop() ?? '').replace(/-/g, ' ');

/** Curtain that rises from the bottom over the old page, then lifts off the top to reveal the new one. */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const pending = useRef(false);
  const pathRef = useRef(pathname);

  useEffect(() => {
    gsap.set(panel.current, { visibility: 'hidden' });
  }, []);

  useEffect(() => {
    pathRef.current = pathname;
    if (!pending.current) return;
    pending.current = false;
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const main = document.getElementById('main');
    const H = window.innerHeight * 1.12;
    gsap
      .timeline()
      .to(text.current, { opacity: 0, y: -24, duration: 0.35, ease: 'power2.in' }, 0.1)
      .to(panel.current, { y: -H, duration: 0.9, ease: 'power4.inOut' }, 0.25)
      .fromTo(main, { y: H * 0.18 }, { y: 0, duration: 1.1, ease: 'power4.out', clearProps: 'transform' }, 0.3)
      .set(panel.current, { visibility: 'hidden' });
  }, [pathname, lenis]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      if (!a || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === pathRef.current || pending.current) return;

      e.preventDefault();
      e.stopPropagation();
      pending.current = true;
      if (text.current) text.current.textContent = labelFor(url.pathname);
      const H = window.innerHeight * 1.12;
      gsap
        .timeline()
        .set(panel.current, { visibility: 'visible', y: H })
        .set(text.current, { opacity: 0, y: 40 })
        .to(panel.current, { y: 0, duration: 0.8, ease: 'power4.inOut' })
        .to(text.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.4)
        .add(() => router.push(url.pathname + url.search + url.hash), '-=0.1');
      // Never leave the curtain stuck if navigation fails.
      setTimeout(() => {
        if (!pending.current) return;
        pending.current = false;
        gsap.to(panel.current, { y: -H, duration: 0.6, ease: 'power3.inOut' });
      }, 4000);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return (
    <div
      ref={panel}
      aria-hidden="true"
      className="pointer-events-none invisible fixed inset-0 z-[90] grid place-items-center bg-ink"
    >
      <p
        ref={text}
        className="font-display text-[clamp(2.5rem,9vw,7rem)] font-bold uppercase leading-none tracking-[-0.01em] text-paper"
      />
      <div className="absolute inset-x-0 bottom-full h-[10vh] rounded-t-[50%_100%] bg-ink" />
      <div className="absolute inset-x-0 top-full h-[10vh] rounded-b-[50%_100%] bg-ink" />
    </div>
  );
}

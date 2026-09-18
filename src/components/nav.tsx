'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mailHref, site, whatsappHref } from '@content';
import { Logo } from './logo';
import { useLenis } from './smooth-scroll';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/studio', label: 'Studio' },
] as const;

const label = 'font-mono text-[11px] uppercase tracking-[0.18em]';

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis.current?.stop();
    else lenis.current?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, lenis]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled && !open
            ? 'border-b border-line bg-ink/70 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10"
        >
          <Logo />

          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? 'page' : undefined}
                className={`${label} text-paper/80 transition-colors duration-300 hover:text-accent aria-[current=page]:text-paper`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`${label} border border-paper/40 px-5 py-3 text-paper transition-colors duration-300 hover:border-accent hover:text-accent`}
            >
              Book a call
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`${label} relative z-[80] py-2 text-paper md:hidden`}
          >
            {open ? 'Close ×' : 'Menu'}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[75] flex flex-col bg-ink px-6 pb-8 pt-28 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-6">
          {[...LINKS, { href: '/contact', label: 'Book a call' }].map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
              className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <Link
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="font-display text-[40px] leading-none tracking-[-0.02em] text-paper"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={`mt-auto flex flex-col gap-4 border-t border-line pt-6 ${label} text-muted`}>
          <a href={whatsappHref} tabIndex={open ? 0 : -1} className="hover:text-accent">
            WhatsApp
          </a>
          <a href={mailHref} tabIndex={open ? 0 : -1} className="hover:text-accent">
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}

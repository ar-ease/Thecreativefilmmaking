'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mailHref, site, whatsappHref } from '@content';
import { Logo } from './logo';
import { useLenis } from './smooth-scroll';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/studio', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
] as const;

const label = 'font-mono text-[11px] uppercase tracking-[0.18em]';
const navLabel = 'font-display text-[13px] font-bold uppercase tracking-[0.01em]';

/** Three distinct hand-drawn squiggles so each nav link gets its own underline character. */
const SQUIGGLES = [
  'M1 5.5c3-4.5 6 3.5 9.5-.5s6.5-4 10-.5 6 4.5 12.5 1',
  'M1 5c1.8-2.6 3.6 2.6 5.4 0s3.6-2.6 5.4 0 3.6 2.6 5.4 0 3.6-2.6 5.4 0 3.6 2.6 5.4 0 3.6-2.6 5.4 0',
  'M1 6c4-6 12 6 16 0s8-6 16 0',
] as const;

/** Nav link with a hand-drawn squiggle that draws itself in under the label on hover. */
function SquiggleLink({
  href,
  label: text,
  active,
  variant = 0,
}: {
  href: string;
  label: string;
  active: boolean;
  variant?: number;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`${navLabel} group relative inline-block rounded-sm px-4 py-2 text-ink transition-colors duration-300 hover:text-accent`}
    >
      {text}
      <svg
        width="34"
        height="9"
        viewBox="0 0 34 9"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[calc(100%-9px)] h-[9px] w-[34px] -translate-x-1/2 text-accent opacity-0 [clip-path:inset(0_100%_0_0)] transition-[clip-path,opacity] duration-[220ms] ease-[var(--ease-out)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none"
      >
        <path
          d={SQUIGGLES[variant % SQUIGGLES.length]}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

// The button grows by a fixed 12x6px on hover; scale factors depend on its rendered size.
const growTo = (e: React.SyntheticEvent<HTMLElement>) => {
  const el = e.currentTarget;
  el.style.setProperty('--sx', String((el.offsetWidth + 12) / el.offsetWidth));
  el.style.setProperty('--sy', String((el.offsetHeight + 6) / el.offsetHeight));
};

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);

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
      <header className="fixed inset-x-0 top-0 z-[70]">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10"
        >
          <Logo />

          <div className="hidden items-center gap-1 rounded-none bg-paper p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:flex">
            {LINKS.map((l, i) => (
              <SquiggleLink key={l.href} href={l.href} label={l.label} active={pathname === l.href} variant={i} />
            ))}
          </div>

          <Link
            href="/contact"
            onPointerEnter={growTo}
            onFocus={growTo}
            className={`${navLabel} nav-contact hidden bg-transparent text-ink md:inline-grid`}
          >
            <span className="nav-contact__bg" />
            <span className="nav-contact__inner">
              <span className="nav-contact__dots" aria-hidden="true">
                <i />
                <i className="is-first" />
                <i className="is-second" />
                <i className="is-third" />
              </span>
              <span className="nav-contact__texts">
                <span className="nav-contact__text is-default">Contact</span>
                <span aria-hidden="true" className="nav-contact__text is-hover">Contact</span>
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`${navLabel} relative z-[80] rounded-none bg-paper px-4 py-2 text-ink shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:hidden`}
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
          {[...LINKS, { href: '/contact', label: 'Contact' }].map((l, i) => (
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
                className="font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-paper"
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

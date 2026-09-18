'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Hero as HeroContent } from '@content';
import { IntroLoader } from './intro-loader';
import styles from './hero.module.css';

type Phase = 'loading' | 'landing' | 'ready';

type Props = {
  content: HeroContent;
  siteName: string;
  locationTag: string;
  workHref: string;
  workLabel: string;
};

const SESSION_KEY = 'tcf-intro-seen';

function shouldBypassIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function Hero({ content, siteName, locationTag, workHref, workLabel }: Props) {
  const [phase, setPhase] = useState<Phase | null>(null);
  const ref = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (phase !== 'ready' || !ref.current) return;
    const canPlay =
      window.matchMedia('(hover: hover) and (min-width: 768px)').matches &&
      !('connection' in navigator && (navigator.connection as { saveData?: boolean }).saveData);
    if (!canPlay) return;
    ref.current.querySelectorAll<HTMLVideoElement>('video[data-src]').forEach((v) => {
      v.src = v.dataset.src!;
      v.play().catch(() => {});
    });
  }, [phase]);

  return (
    <section
      ref={ref}
      className={styles.hero}
      data-phase={phase ?? 'loading'}
      aria-labelledby="hero-statement"
    >
      {phase === 'loading' && (
        <IntroLoader
          label={content.loaderLabel}
          name={siteName}
          onDone={() => setPhase('landing')}
        />
      )}

      <div className={styles.stage}>
        <h1 id="hero-statement" className={styles.statement}>
          {content.lines.map((line, i) => (
            <span key={line} className={styles.line} style={{ '--i': i } as React.CSSProperties}>
              {line}
            </span>
          ))}
        </h1>

        <div className={styles.tiles} aria-hidden="true">
          {content.tiles.map((tile, i) => (
            <figure
              key={tile.slot}
              className={styles.tile}
              data-slot={tile.slot}
              style={{ '--i': i } as React.CSSProperties}
            >
              <video
                muted
                loop
                playsInline
                preload="none"
                poster={tile.poster}
                data-src={tile.src}
                tabIndex={-1}
              />
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.introRow}>
        <p className={styles.location}>{locationTag}</p>
        <p className={styles.intro}>{content.intro}</p>
        <Link href={workHref} className={styles.workLink}>
          {workLabel}
        </Link>
      </div>
    </section>
  );
}

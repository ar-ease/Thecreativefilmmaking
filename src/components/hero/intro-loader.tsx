import { useEffect, useRef, useState } from 'react';
import styles from './hero.module.css';

type Props = {
  label: string;
  name: string;
  duration?: number;
  onDone: () => void;
};

function Bracket({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 60"
      className={styles.bracket}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path d="M11 1H1v58h10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IntroLoader({ label, name, duration = 1500, onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
      }
    };
    raf = requestAnimationFrame(tick);
    // rAF is throttled in background tabs; never let the loader outstay its welcome.
    const failsafe = setTimeout(() => {
      setProgress(100);
      setExiting(true);
    }, duration + 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [duration]);

  const chars = Math.round((progress / 100) * label.length);

  return (
    <div
      className={styles.loader}
      data-exiting={exiting}
      aria-hidden="true"
      onAnimationEnd={() => {
        if (done.current) return;
        done.current = true;
        onDone();
      }}
    >
      <div className={styles.loaderStage}>
        <div className={styles.loaderGraphic}>
          <Bracket flip />
          <svg viewBox="0 0 42 42" className={styles.loaderDots} aria-hidden="true">
            <circle cx="21" cy="6" r="4.5" fill="currentColor" />
            <circle cx="34" cy="28.5" r="4.5" fill="currentColor" />
            <circle cx="8" cy="28.5" r="4.5" fill="currentColor" />
          </svg>
          <Bracket />
          <span className={styles.loaderGap} />
          <Bracket flip />
          <span className={styles.loaderLabel} style={{ width: `${chars}ch` }}>
            {label}
          </span>
          <Bracket />
        </div>

        <div className={styles.loaderStatus}>
          <p>{name}</p>
          <p>[{progress}%]</p>
        </div>
        <div className={styles.loaderTrack}>
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}

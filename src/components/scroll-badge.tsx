const PATH_ID = 'scroll-badge-ring';

export function ScrollBadge({ label, className = '' }: { label: string; className?: string }) {
  const repeated = Array.from({ length: 3 }, () => label).join(' • ') + ' • ';

  return (
    <div
      className={`relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-accent/20 text-ink ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path id={PATH_ID} d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" fill="none" />
        </defs>
        <text className="fill-current font-mono text-[8px] uppercase tracking-[0.2em]">
          <textPath href={`#${PATH_ID}`}>{repeated}</textPath>
        </text>
      </svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 20.5 12 23c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </span>
    </div>
  );
}

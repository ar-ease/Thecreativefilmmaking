export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const loop = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex w-max animate-[marquee_26s_linear_infinite] items-center gap-10 motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span
            key={i}
            className="shrink-0 font-mono text-[12px] uppercase tracking-[0.18em] text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

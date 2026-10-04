'use client';

import Link from 'next/link';
import { CtaLink } from '../cta-link';
import { useRef } from 'react';
import type { Project } from '@content';
import { ScrollBadge } from '../scroll-badge';
import { useScrollReveal } from '../scroll-reveal';

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, '[data-reveal]');
  const [featured, ...rest] = projects;

  return (
    <section className="section-pad relative overflow-hidden border-t border-line bg-ink px-6 text-paper md:px-10">
      <div ref={ref} className="mx-auto max-w-[1440px]">
        <div data-reveal className="text-center">
          <p className="font-serif text-[18px] italic text-paper/70 md:text-[20px]">
            Not to miss, worth sharing. Here&rsquo;s a taste of what we make.
          </p>
          <h2 className="mt-2 text-[40px] uppercase leading-[0.95] tracking-[-0.03em] md:text-[72px]">
            <span className="font-display font-bold">Recent</span>{' '}
            <span className="font-serif font-normal normal-case">work</span>
          </h2>
        </div>

        {featured && (
          <Link
            data-reveal
            href={`/work/${featured.slug}`}
            className="group relative mt-12 block aspect-video w-full overflow-hidden border-4 border-accent-coral md:mt-16"
          >
            <video
              muted
              loop
              playsInline
              preload="none"
              poster={featured.film.poster}
              className="block h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              onMouseEnter={(e) => {
                const v = e.currentTarget;
                if (!v.src) v.src = featured.film.src;
                v.play().catch(() => {});
              }}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 text-[32px] font-bold uppercase leading-none tracking-[-0.02em] text-paper md:bottom-8 md:left-8 md:text-[56px]">
              {featured.client}
            </p>
          </Link>
        )}

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-between gap-8 md:mt-12">
          <CtaLink href="/work" label="See our work" tone="bg-accent-pink text-ink" />

          <ScrollBadge label="This is how we scroll" className="ml-auto hidden md:flex" />
        </div>

        {rest.length > 0 && (
          <div className="mt-16 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden">
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                data-reveal
                className="group relative aspect-[4/5] w-[min(78vw,340px)] shrink-0 cursor-pointer overflow-hidden bg-[#181818] md:aspect-[3/4] md:w-[min(32vw,460px)]"
              >
                <video
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={project.film.poster}
                  className="block h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  onMouseEnter={(e) => {
                    const v = e.currentTarget;
                    if (!v.src) v.src = project.film.src;
                    v.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/70">
                    {project.tag} &middot; {project.year}
                  </p>
                  <p className="mt-2 font-display text-[22px] leading-tight tracking-[-0.02em] md:text-[26px]">
                    {project.client}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

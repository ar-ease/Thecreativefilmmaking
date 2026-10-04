'use client';

import Image from 'next/image';
import { CtaLink } from '../cta-link';
import { useRef } from 'react';
import type { Capability, CraftBlock } from '@content';
import { useScrollReveal } from '../scroll-reveal';

type Props = {
  craft: CraftBlock[];
  capabilities: Capability[];
};

export function About({ craft, capabilities }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, '[data-reveal]');

  return (
    <section className="section-pad border-t border-line-on-paper bg-paper px-6 text-ink md:px-10">
      <div ref={ref} className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-2 md:items-center md:gap-10">
        <div data-reveal className="relative mx-auto aspect-[4/5] w-full max-w-[420px] md:mx-0">
          <figure className="absolute inset-0 overflow-hidden rotate-[-4deg] border-8 border-paper bg-paper shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <Image
              src="/video/tcfvid-poster.jpg"
              alt="TODO: real behind-the-scenes photo of a shoot day"
              fill
              sizes="(min-width: 768px) 420px, 80vw"
              className="object-cover"
            />
          </figure>
          <figure className="absolute inset-x-10 inset-y-14 overflow-hidden rotate-[5deg] border-8 border-paper bg-paper shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
            <Image
              src="/video/hero-01.jpg"
              alt="TODO: real photo from on location"
              fill
              sizes="(min-width: 768px) 260px, 50vw"
              className="object-cover"
            />
          </figure>
          <span className="absolute -right-4 -top-4 rotate-[8deg] rounded-none bg-accent-pink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
            On location
          </span>
        </div>

        <div>
          <p data-reveal className="font-serif text-[18px] italic text-ink/70 md:text-[20px]">
            Who we are
          </p>
          <h2
            data-reveal
            className="mt-2 max-w-[14ch] text-[40px] uppercase leading-[0.95] tracking-[-0.03em] md:text-[72px]"
          >
            <span className="block font-display font-bold">The eye behind</span>
            <span className="block font-serif font-normal normal-case">the camera</span>
          </h2>
          <p data-reveal className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-ink/70 md:text-[18px]">
            No agency layers, no account manager relaying your notes. You talk directly to the person
            behind the camera — from the first call to the final cut.
          </p>
          <CtaLink data-reveal href="/studio" label="More about us" tone="bg-accent text-paper" className="mt-10" />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1440px] md:mt-28">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {craft.map((block) => (
            <div key={block.title} data-reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{block.title}</p>
              <p className="mt-4 text-[20px] leading-snug tracking-[-0.01em] md:text-[26px]">{block.body}</p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-line-on-paper pt-8 md:mt-24"
        >
          {capabilities.map((cap) => (
            <p key={cap.label} className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
              {cap.label} <span className="text-ink">{cap.value}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

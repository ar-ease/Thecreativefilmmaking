import { EmailCapture } from '@/components/email-capture';
import { Hero } from '@/components/hero/hero';
import { featuredProject, hero, site } from '@content';

export default function Home() {
  return (
    <>
      <Hero
        content={hero}
        siteName={site.name}
        locationTag={`${site.location.town} · ${site.location.region}`}
        workHref={`/work/${featuredProject.slug}`}
        workLabel="See the work"
      />

      {/* TODO(phase-3): sections 3–9 replace this holding block */}
      <section className="section-pad px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="max-w-md">
            <h2 className="font-display text-[30px] leading-[0.95] tracking-[-0.03em] md:text-[56px]">
              Know when we premiere.
            </h2>
            <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
              New films, behind-the-scenes and booking windows. One email a month from Balurghat.
            </p>
            <EmailCapture className="mt-12" />
          </div>
        </div>
      </section>
    </>
  );
}

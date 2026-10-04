import { About } from '@/components/sections/about';
import { EmailCapture } from '@/components/email-capture';
import { Hero } from '@/components/hero/hero';
import { Faq } from '@/components/sections/faq';
import { FeaturedWork } from '@/components/sections/featured-work';
import { Packages } from '@/components/sections/packages';
import { ProcessSteps } from '@/components/sections/process-steps';
import { Services } from '@/components/sections/services';
import {
  capabilities,
  craft,
  faq,
  hero,
  packages,
  process as processSteps,
  projects,
  services,
  site,
} from '@content';

export default function Home() {
  return (
    <>
      <Hero content={hero} siteName={site.name} />

      <About craft={craft} capabilities={capabilities} />
      <FeaturedWork projects={projects} />
      <ProcessSteps steps={processSteps} />
      <Services services={services} />
      <Packages packages={packages} />
      <Faq items={faq} />

      <section className="section-pad border-t border-line px-6 md:px-10">
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

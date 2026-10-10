import { About } from '@/components/sections/about';
import { Hero } from '@/components/hero/hero';
import { ScrollStatement, StudioOutro } from '@/components/sections/scroll-statement';
import { Faq } from '@/components/sections/faq';
import { FeaturedWork } from '@/components/sections/featured-work';
import {
  faq,
  hero,
  site,
} from '@content';

export default function Home() {
  return (
    <>
      <Hero content={hero} siteName={site.name} />

      <ScrollStatement />
      <FeaturedWork />
      <About />
      <StudioOutro />
      <Faq items={faq} />
    </>
  );
}

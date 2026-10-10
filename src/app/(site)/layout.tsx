import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { PageTransition } from '@/components/page-transition';

export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <PageTransition />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

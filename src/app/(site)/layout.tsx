import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';

export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

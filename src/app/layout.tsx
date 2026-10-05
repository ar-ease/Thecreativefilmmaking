import type { Metadata } from 'next';
import { Grain } from '@/components/grain';
import { SmoothScroll } from '@/components/smooth-scroll';
import { site } from '@content';
import { sans, serif } from './fonts';
import './globals.css';

const DESCRIPTION =
  'We make stories worth feeling. Brand films, social reels and food & product content for cafés, restaurants and local brands across North Bengal.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: DESCRIPTION,
  openGraph: {
    title: site.name,
    description: DESCRIPTION,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: '/brand/tcf-logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'TCF — The Creative Film',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: DESCRIPTION,
    images: ['/brand/tcf-logo-banner.png'],
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.18em] focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Grain />
      </body>
    </html>
  );
}

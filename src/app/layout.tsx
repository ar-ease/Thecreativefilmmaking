import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://thecreativefilm.com';
const DESCRIPTION =
  'We make stories worth feeling. Brand films, social reels and food & product content for cafés, restaurants and local brands across North Bengal.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Creative Film',
    template: '%s — The Creative Film',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'The Creative Film',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'The Creative Film',
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
    title: 'The Creative Film',
    description: DESCRIPTION,
    images: ['/brand/tcf-logo-banner.png'],
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

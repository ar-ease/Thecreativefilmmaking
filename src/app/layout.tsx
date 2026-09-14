import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'The Creative Film',
  description:
    'We make stories worth feeling. TCF is in production — leave your email and be first to know when we premiere.',
  openGraph: {
    title: 'The Creative Film',
    description:
      'We make stories worth feeling. TCF is in production — leave your email and be first to know when we premiere.',
    url: 'https://thecreativefilm.com',
    siteName: 'The Creative Film',
    images: [
      {
        url: '/tcf-logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'TCF — The Creative Film',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Creative Film',
    description:
      'We make stories worth feeling. TCF is in production — leave your email and be first to know when we premiere.',
    images: ['/tcf-logo-banner.png'],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

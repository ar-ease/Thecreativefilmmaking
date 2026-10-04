import localFont from 'next/font/local';
import { Geist_Mono, Instrument_Serif } from 'next/font/google';

/**
 * Single source of truth for the type system: Switzer for headlines and body copy,
 * Instrument Serif mixed word-by-word into big headlines for contrast, Geist Mono for
 * labels/index numbers/timecode only. To move to licensed replacements (Swizzy for
 * display, PP Neue Montreal Mono for mono), change the `src`/loader below — nothing
 * outside this file needs to change.
 */

export const display = localFont({
  variable: '--font-switzer',
  display: 'swap',
  src: [
    { path: '../fonts/switzer/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/switzer/Switzer-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/switzer/Switzer-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/switzer/Switzer-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const serif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

export const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

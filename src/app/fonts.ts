import localFont from 'next/font/local';

/**
 * Single source of truth for the type system: Helvetica Now (variable) for everything,
 * Serrif (variable, compressed) as the display serif mixed into big headlines via
 * `font-serif`. Labels/index numbers (`font-mono`) also resolve to Helvetica Now.
 */

export const sans = localFont({
  variable: '--font-helvetica-now',
  display: 'swap',
  src: '../fonts/helvetica-now/HelveticaNowVar.woff2',
  weight: '100 900',
});

export const serif = localFont({
  variable: '--font-serrif',
  display: 'swap',
  src: '../fonts/serrif/SerrifCompressedUprightsVF.woff2',
  weight: '100 900',
});

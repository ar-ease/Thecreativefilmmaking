import Link from 'next/link';
import { instagramHref, mailHref, site, whatsappHref, youtubeHref } from '@content';
import { EmailCapture } from './email-capture';

const label = 'font-mono text-[11px] uppercase tracking-[0.18em]';

export function Footer() {
  return (
    <footer className="border-t border-line px-6 pb-10 pt-[72px] md:px-10 md:pt-[160px]">
      <div className="mx-auto max-w-[1440px]">
        <p className="max-w-[14ch] font-display text-[40px] leading-[0.95] tracking-[-0.03em] md:text-[88px]">
          Let&rsquo;s make something worth feeling.
        </p>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col gap-3 md:col-span-7">
            <a
              href={mailHref}
              className="w-fit font-display text-[30px] leading-tight tracking-[-0.02em] text-paper transition-colors duration-300 hover:text-accent md:text-[40px]"
            >
              {site.email}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-display text-[30px] leading-tight tracking-[-0.02em] text-paper transition-colors duration-300 hover:text-accent md:text-[40px]"
            >
              WhatsApp us
            </a>
            <ul className={`mt-6 flex gap-8 ${label} text-muted`}>
              <li>
                <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  Instagram
                </a>
              </li>
              <li>
                <a href={youtubeHref} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Link href="/subscribe" className={`${label} text-muted transition-colors hover:text-accent`}>
              Know when we premiere &rarr;
            </Link>
            <EmailCapture variant="compact" className="mt-4" />
          </div>
        </div>

        <div className={`mt-16 flex flex-col gap-2 border-t border-line pt-6 ${label} text-muted md:mt-24 md:flex-row md:justify-between`}>
          <p>
            &copy; 2026 {site.name} / {site.location.town}, {site.location.state}
          </p>
          <Link href="/privacy" className="hover:text-accent">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

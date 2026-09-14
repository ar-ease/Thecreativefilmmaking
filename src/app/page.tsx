import Image from 'next/image';
import { EmailCapture } from '@/components/email-capture';

export default function Home() {
  return (
    <main className="bg-grain relative flex min-h-dvh flex-col overflow-hidden bg-[#141312] text-[#f5f1ea]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.6)_contrast(1.05)]"
      >
        <source src="/tcfvid.mp4" type="video/mp4" />
      </video>

      {/* cinematic grade — grounds the footage in a neutral tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141312]/40 via-[#141312]/20 to-[#141312]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#141312_98%)]" />

      <div className="relative z-10 flex min-h-dvh flex-col px-6 sm:px-10">
        <header className="animate-fade-up flex items-center justify-between py-8">
          <div className="flex items-center rounded-full bg-[#f5f1ea] px-4 py-2">
            <Image
              src="/tcf-logo.svg"
              alt="TCF"
              width={1080}
              height={1080}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </div>
          <span className="hidden font-body text-[14px] uppercase tracking-[0.25em] text-[#f5f1ea]/45 sm:inline">
            The Creative Film
          </span>
        </header>

        <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-10 py-16 text-center">
          <h1
            className="animate-fade-up max-w-3xl text-balance font-display text-[clamp(2rem,9vw,5.5rem)] leading-[1.1] font-normal italic"
            style={{ animationDelay: '120ms' }}
          >
            We make stories
            <br className="hidden sm:block" /> worth feeling.
          </h1>

          <p
            className="animate-fade-up max-w-md text-balance font-body text-[15px] leading-relaxed text-[#f5f1ea]/60"
            style={{ animationDelay: '260ms' }}
          >
            <span className="uppercase tracking-wide text-[#F5C518]">TCF is coming soon</span>
            <br />
            For enquiries, collaborations, or anything else, submit your email and we&rsquo;ll get
            back to you.
          </p>

          <div
            className="animate-fade-up flex w-full flex-col items-center gap-3"
            style={{ animationDelay: '400ms' }}
          >
            <EmailCapture />
          </div>
        </div>

        <footer
          className="animate-fade-up flex flex-col items-center justify-between gap-2 border-t border-white/5 py-6 font-body text-[11px] text-[#f5f1ea]/35 sm:flex-row"
          style={{ animationDelay: '520ms' }}
        >
          <span>&copy; {new Date().getFullYear()} thecreativefilm</span>
          <a
            href="mailto:hello@thecreativefilm.com"
            className="transition-colors duration-200 hover:text-[#f5f1ea]/60"
          >
            hello@thecreativefilm.com
          </a>
          <span className="uppercase tracking-[0.2em]">In production</span>
        </footer>
      </div>
    </main>
  );
}

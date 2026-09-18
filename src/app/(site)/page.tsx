import { EmailCapture } from '@/components/email-capture';

// Temporary holding page so the mailing-list capture stays live between
// Phase 0 and Phase 3. Replaced by the real home page in Phase 3.
export default function Home() {
  return (
    <section className="flex min-h-dvh flex-col justify-center px-6 py-32 md:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="max-w-md">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Balurghat · North Bengal
          </p>
          <h1 className="font-display text-[40px] leading-[0.95] tracking-[-0.03em] md:text-[56px]">
            Know when we premiere.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
            New films, behind-the-scenes and booking windows. One email a month from Balurghat.
          </p>
          <EmailCapture className="mt-12" />
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { EmailCapture } from '@/components/email-capture';

// Temporary holding page so the mailing-list capture stays live between
// Phase 0 and Phase 3. Replaced by the real home page in Phase 3.
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Image
          src="/brand/tcf-logo.svg"
          alt="The Creative Film"
          width={1080}
          height={1080}
          priority
          className="mb-16 h-10 w-auto invert"
        />
        <h1 className="font-display text-[40px] leading-[0.95] tracking-[-0.03em] md:text-[56px]">
          Know when we premiere.
        </h1>
        <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
          New films, behind-the-scenes and booking windows. One email a month from Balurghat.
        </p>
        <EmailCapture className="mt-12" />
      </div>
    </main>
  );
}

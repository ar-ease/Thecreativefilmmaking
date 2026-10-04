import Image from 'next/image';
import Link from 'next/link';

export function Logo({ className = 'h-11 md:h-14' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="The Creative Film — home"
      className="inline-flex shrink-0 items-center mix-blend-difference"
    >
      <Image
        src="/brand/tcf-logo.svg"
        alt=""
        width={1080}
        height={1080}
        priority
        className={`w-auto invert ${className}`}
      />
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export function Logo({ className = 'h-6' }: { className?: string }) {
  return (
    <Link href="/" aria-label="The Creative Film — home" className="inline-flex shrink-0">
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

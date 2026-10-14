import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { instagramHref, mailHref, site, whatsappHref, youtubeHref } from '@content';

// Written to match what the site actually does: no cookies, analytics or trackers; the only personal data
// collected is the email from <EmailCapture> (sent via Resend, see api/waitlist) and whatever people send us
// directly. Update this page (and UPDATED) if that changes — e.g. adding analytics or a contact form.
const UPDATED = '12 October 2026';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${site.name} handles your personal data: what we collect, why, who we share it with and your rights under India's DPDP Act, 2023.`,
  alternates: { canonical: '/privacy' },
  openGraph: { title: `Privacy policy — ${site.name}`, url: '/privacy' },
};

const label = 'font-mono text-[11px] uppercase tracking-[0.18em]';
const link = 'text-paper underline decoration-paper/30 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent';

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a href={href} className={link} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
      {children}
    </a>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-accent">
          {item}
        </li>
      ))}
    </ul>
  );
}

const Email = () => <A href={mailHref}>{site.email}</A>;

const SUMMARY = [
  { title: 'No tracking', body: 'No cookies, no analytics, no ad pixels. We don’t follow you around the web.' },
  { title: 'Only what you give us', body: 'We get your email only if you type it into our form or write to us.' },
  { title: 'Never sold', body: 'Your details are used to reply to you, and that’s it. We don’t sell or rent them.' },
];

const SECTIONS: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          {site.name} (&ldquo;TCF&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a film studio based in {site.location.town},{' '}
          {site.location.state}, India. We run <A href={site.url}>{site.url.replace('https://', '')}</A>.
        </p>
        <p>
          For the personal data described here, we are the <em>data fiduciary</em> under India&rsquo;s Digital Personal
          Data Protection Act, 2023 (the &ldquo;DPDP Act&rdquo;): we decide why and how it is used.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: (
      <>
        <List
          items={[
            <>
              <strong className="font-medium text-paper">Your email address</strong>, if you submit it through the
              form on this site.
            </>,
            <>
              <strong className="font-medium text-paper">What you send us directly</strong>: your name, number,
              business details and anything else you choose to share when you email us or message us on WhatsApp.
            </>,
            <>
              <strong className="font-medium text-paper">Basic technical logs</strong> kept by our hosting provider
              when you load a page, such as IP address, browser type and time of request. These are used for security
              and keeping the site running, not to identify you.
            </>,
          ]}
        />
        <p>
          That&rsquo;s all. This site sets no cookies and uses no analytics, advertising pixels, session recording
          or fingerprinting. Our fonts are served from our own server, so no third-party font service sees your visit.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    body: (
      <>
        <List
          items={[
            'To reply to your enquiry and, if we work together, to plan, shoot and deliver your project.',
            'To send a one-time confirmation when you join our list, and occasional updates about new work or launches.',
            'To keep the site secure and working.',
          ]}
        />
        <p>
          We rely on your consent, which you give by submitting your email or contacting us, and on the
          &ldquo;legitimate uses&rdquo; the DPDP Act allows, such as handling a request you&rsquo;ve made. You can
          withdraw consent at any time (see <A href="#your-rights">Your rights</A>). Withdrawing doesn&rsquo;t
          affect anything we did before.
        </p>
      </>
    ),
  },
  {
    id: 'who-we-share-it-with',
    title: 'Who we share it with',
    body: (
      <>
        <p>
          We never sell or rent your data, and we don&rsquo;t share it for advertising. We use a few trusted services to
          run the studio. They process data only on our instructions:
        </p>
        <List
          items={[
            <>
              <strong className="font-medium text-paper">Resend</strong>: delivers the confirmation email and our
              internal notification when you submit the form.
            </>,
            <>
              <strong className="font-medium text-paper">Google (Gmail)</strong>: our team inbox, where enquiries and
              sign-up notifications arrive.
            </>,
            <>
              <strong className="font-medium text-paper">Vercel</strong>: hosts this website and keeps the technical
              logs mentioned above.
            </>,
            <>
              <strong className="font-medium text-paper">WhatsApp (Meta)</strong>: only if you choose to message us
              there.
            </>,
          ]}
        />
        <p>
          We may also disclose data if Indian law requires it, for example to comply with a court order or a lawful
          request from a government authority.
        </p>
      </>
    ),
  },
  {
    id: 'where-its-stored',
    title: 'Where it’s stored',
    body: (
      <p>
        Some of these providers store or process data on servers outside India, including in the United States. The
        DPDP Act permits this except to countries the Government of India specifically restricts, and we&rsquo;ll stop
        using any provider in a country that becomes restricted.
      </p>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    body: (
      <List
        items={[
          'Mailing list: until you unsubscribe or ask us to delete it.',
          'Enquiries that don’t become a project: deleted within 12 months of our last conversation.',
          'Client records (contracts, invoices, project communication): as long as Indian tax and accounting law requires, then deleted.',
          'Hosting logs: kept by Vercel for a short period under its own retention policy.',
        ]}
      />
    ),
  },
  {
    id: 'people-in-our-films',
    title: 'People in our films',
    body: (
      <>
        <p>
          Our work often features real people: owners, staff and customers. We film people only with their
          permission, and we ask for a signed release before anyone identifiable appears as a main subject in published
          work.
        </p>
        <p>
          If you appear in something we&rsquo;ve published and want it reviewed, blurred or taken down, email <Email />{' '}
          with a link and the timestamp. We&rsquo;ll review it with our client and respond promptly.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under the DPDP Act you can ask us to:</p>
        <List
          items={[
            'Tell you what personal data we hold about you and how we’ve used it.',
            'Correct, complete or update it.',
            'Erase it, unless we must keep it by law.',
            'Stop using it, by withdrawing your consent at any time.',
            'Let someone you nominate exercise these rights for you in case of death or incapacity.',
          ]}
        />
        <p>
          To do any of these, email <Email /> from the address you used with us (so we can confirm it&rsquo;s you). To
          leave the mailing list, just reply &ldquo;unsubscribe&rdquo; to any email we send. We aim to respond within
          30 days. If you&rsquo;re not satisfied with our response, you can complain to the Data Protection Board of
          India.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        This site isn&rsquo;t meant for anyone under 18, and we don&rsquo;t knowingly collect their data. If a child
        appears in a film we make, we get consent from their parent or guardian first. If you believe a child has sent
        us personal data, email <Email /> and we&rsquo;ll delete it.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        The site is served only over HTTPS, access to our inboxes is limited to the people who need it, and we use
        providers with strong security practices. No system is perfectly secure. If a breach ever affects your data,
        we&rsquo;ll tell you and the Data Protection Board of India as the law requires.
      </p>
    ),
  },
  {
    id: 'other-sites',
    title: 'Other sites',
    body: (
      <p>
        We link to <A href={instagramHref}>Instagram</A>, <A href={youtubeHref}>YouTube</A> and{' '}
        <A href={whatsappHref}>WhatsApp</A>. Once you leave this site, those services&rsquo; own privacy policies apply.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If we change how we handle data, we&rsquo;ll update this page and the date at the top. If a change is
        significant and you&rsquo;re on our mailing list, we&rsquo;ll email you before it takes effect.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact & grievances',
    body: (
      <>
        <p>
          Questions, requests or complaints about your data go to our grievance contact. We&rsquo;ll acknowledge your
          message and resolve it as quickly as we can.
        </p>
        <address className="not-italic">
          <p className="text-paper">{site.founder.name}</p>
          <p>{site.name}</p>
          <p>
            {site.location.town}, {site.location.state}, India
          </p>
          <p className="mt-2">
            <Email />
          </p>
        </address>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="px-6 pb-16 pt-32 md:px-10 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <header className="max-w-[18ch]">
          <p className={`${label} text-muted`}>Legal / Privacy</p>
          <h1 className="mt-6 font-display text-[48px] leading-[0.95] tracking-[-0.03em] md:text-[96px]">
            Privacy, <span className="font-serif font-light tracking-[-0.02em] text-accent">plainly.</span>
          </h1>
        </header>
        <p className="mt-8 max-w-[56ch] text-[17px] leading-relaxed text-paper/70 md:mt-12 md:text-[20px]">
          We make films, not data products. This page explains, in plain words, what little personal data this site
          handles and what we do with it.
        </p>
        <p className={`mt-6 ${label} text-muted`}>Last updated {UPDATED}</p>

        <ul className="mt-16 grid gap-px border border-line bg-line md:mt-24 md:grid-cols-3">
          {SUMMARY.map((s, i) => (
            <li key={s.title} className="bg-ink p-6 md:p-8">
              <p className={`${label} text-accent`}>{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-4 font-display text-[24px] leading-tight tracking-[-0.02em] md:text-[28px]">{s.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/70">{s.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <nav aria-label="On this page" className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className={`${label} text-muted`}>On this page</p>
              <ol className="mt-6 flex flex-col gap-3 text-[15px]">
                {SECTIONS.map((s, i) => (
                  <li key={s.id} className="flex gap-4">
                    <span className={`${label} w-6 shrink-0 pt-[3px] text-muted [font-variant-numeric:tabular-nums]`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <a href={`#${s.id}`} className="text-paper/70 transition-colors duration-300 hover:text-accent">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="md:col-span-8">
            {SECTIONS.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="scroll-mt-32 border-t border-line py-12 first:pt-0 first:border-t-0 md:py-16"
              >
                <div className="flex items-baseline gap-6 md:gap-8">
                  <span className={`${label} w-6 shrink-0 text-accent [font-variant-numeric:tabular-nums]`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2
                    id={`${s.id}-title`}
                    className="font-display text-[28px] leading-[1.05] tracking-[-0.02em] md:text-[40px]"
                  >
                    {s.title}
                  </h2>
                </div>
                <div className="mt-6 flex max-w-[64ch] flex-col gap-4 pl-12 text-[16px] leading-relaxed text-paper/70 md:mt-8 md:pl-14 md:text-[17px]">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

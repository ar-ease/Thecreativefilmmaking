import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Force Node.js runtime — Resend SDK uses Node APIs not available on Edge
export const runtime = 'nodejs';

const FROM_ADDRESS = 'The Creative Film <hello@thecreativefilm.com>';
const NOTIFY_ADDRESS = 'hello@thecreativefilm.com';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  // Fail fast with a clear error if the env var is missing in production
  if (!apiKey) {
    console.error('[waitlist] RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { email } = body as { email?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  try {
    // Run both sends in parallel — faster and independent of each other
    await Promise.all([
      // 1. Confirmation to the subscriber
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: 'Thanks for connecting with us',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#141312;color:#f5f1ea;">
            <p style="font-size:22px;font-style:italic;margin:0 0 16px;">We make stories worth feeling.</p>
            <p style="font-size:15px;color:#f5f1ea99;line-height:1.6;margin:0 0 24px;">
              Thanks for reaching out. We'll get back to you soon.
            </p>
            <p style="font-size:13px;color:#f5f1ea55;margin:0;">
              The Creative Film team &nbsp;&middot;&nbsp;
              <a href="mailto:hello@thecreativefilm.com" style="color:#f5f1ea55;">hello@thecreativefilm.com</a>
            </p>
          </div>
        `,
      }),

      // 2. Internal notification to TCF inbox
      resend.emails.send({
        from: FROM_ADDRESS,
        to: NOTIFY_ADDRESS,
        subject: `New sign-up: ${email}`,
        html: `<p><strong>${email}</strong> just submitted the TCF contact form.</p>`,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[waitlist] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}

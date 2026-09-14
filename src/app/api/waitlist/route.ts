import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  try {
    // 1. Send a confirmation to the subscriber
    await resend.emails.send({
      from: 'The Creative Film <hello@thecreativefilm.com>',
      to: email,
      subject: 'Thanks for connecting with us',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#141312;color:#f5f1ea;">
          <p style="font-size:22px;font-style:italic;margin:0 0 16px;">We make stories worth feeling.</p>
          <p style="font-size:15px;color:#f5f1ea99;line-height:1.6;margin:0 0 24px;">
            Thanks for reaching out. We'll get back to you soon.
          </p>
          <p style="font-size:13px;color:#f5f1ea55;margin:0;">
            — The Creative Film team &nbsp;·&nbsp;
            <a href="mailto:hello@thecreativefilm.com" style="color:#f5f1ea55;">hello@thecreativefilm.com</a>
          </p>
        </div>
      `,
    });

    // 2. Notify the TCF inbox about the new sign-up
    await resend.emails.send({
      from: 'TCF Waitlist <hello@thecreativefilm.com>',
      to: 'hello@thecreativefilm.com',
      subject: `New waitlist sign-up: ${email}`,
      html: `<p><strong>${email}</strong> just joined the TCF waitlist.</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[waitlist] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}

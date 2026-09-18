'use client';

import { useId, useState, type SubmitEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  variant?: 'compact' | 'full';
  className?: string;
};

export function EmailCapture({ variant = 'full', className = '' }: Props) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting' || status === 'success') return;

    setStatus('submitting');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const isFull = variant === 'full';

  if (status === 'success') {
    return (
      <div className={`w-full ${className}`} role="status" aria-live="polite">
        <p className={`font-display italic text-paper ${isFull ? 'text-[30px] leading-tight' : 'text-[17px]'}`}>
          You&rsquo;re on the list.
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          We&rsquo;ll write when we premiere.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Join the TCF mailing list"
      noValidate={false}
      className={`w-full ${className}`}
    >
      <label
        htmlFor={id}
        className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
      >
        Email
      </label>

      <div className="group flex items-end gap-4 border-b border-line transition-colors duration-300 focus-within:border-accent">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="you@example.com"
          disabled={status === 'submitting'}
          className={`w-full min-w-0 bg-transparent pb-3 text-paper placeholder:text-muted/60 focus:outline-none disabled:opacity-60 ${
            isFull ? 'text-[17px]' : 'text-[16px]'
          }`}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === 'submitting'}
          className="shrink-0 pb-3 text-paper transition-colors duration-300 hover:text-accent disabled:opacity-60"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M3 10h14M11 4l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p
        className="mt-3 min-h-[1.25rem] font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        role="status"
        aria-live="polite"
      >
        {status === 'error' && 'Something went wrong. Try again.'}
        {status === 'submitting' && 'Sending…'}
        {status === 'idle' && isFull && 'One email a month. No spam.'}
      </p>
    </form>
  );
}

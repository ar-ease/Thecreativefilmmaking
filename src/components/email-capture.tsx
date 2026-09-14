'use client';

import { useState, type SubmitEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== 'idle') return;
    // TODO: wire to the waitlist API once it exists.
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 550);
  }

  return (
    <div className="relative w-full max-w-md">
      {/* form layer */}
      <form
        onSubmit={handleSubmit}
        aria-hidden={status === 'success'}
        className={`group relative w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          status === 'success'
            ? 'pointer-events-none scale-[0.98] opacity-0 blur-sm'
            : 'opacity-100'
        }`}
        aria-label="Join the TCF waitlist"
      >
        {/* outer shell */}
        <div className="relative rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10 backdrop-blur-md transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-focus-within:shadow-[0_0_28px_-6px_rgba(255,67,1,0.5)] group-focus-within:ring-[#FF4301]/50">
          {/* inner core */}
          <div className="relative flex items-center gap-2 rounded-[calc(1.75rem-0.375rem)] bg-[#2F2519]/60 pl-5 pr-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <label htmlFor="tcf-waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="tcf-waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@domain.com"
              disabled={status !== 'idle'}
              className="h-14 w-full min-w-0 bg-transparent font-body text-[15px] text-[#f5f1ea] placeholder:text-[#f5f1ea]/35 focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label="Join the waitlist"
              disabled={status !== 'idle'}
              className="group/btn relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF4301] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              {/* arrow — idle */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`absolute transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 ${
                  status === 'idle'
                    ? 'scale-100 rotate-0 opacity-100'
                    : 'scale-50 -rotate-45 opacity-0'
                }`}
              >
                <path
                  d="M3 13 13 3M13 3H5M13 3V11"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* checkmark — submitting / success */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`absolute transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  status === 'idle'
                    ? 'scale-50 rotate-45 opacity-0'
                    : 'scale-100 rotate-0 opacity-100'
                }`}
              >
                <path
                  d="M3 8.5 6.5 12 13 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={status !== 'idle' ? 'animate-draw-check' : ''}
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* success layer */}
      {status === 'success' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="relative flex h-11 w-11 items-center justify-center">
            <span className="animate-ring-pulse absolute inset-0 rounded-full border border-[#FF4301]" />
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4301]/12 ring-1 ring-[#FF4301]/40">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8.5 6.5 12 13 4"
                  stroke="#FF4301"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-draw-check"
                />
              </svg>
            </span>
          </div>

          <div
            className="animate-rise-in flex flex-col items-center gap-1 text-center"
            style={{ animationDelay: '120ms' }}
          >
            <p className="font-display text-lg italic text-[#f5f1ea]">You&rsquo;re in.</p>
            <p className="text-sm text-[#f5f1ea]/50">We&rsquo;ll be in touch soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}

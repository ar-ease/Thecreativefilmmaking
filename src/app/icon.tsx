import { ImageResponse } from 'next/og';

// Larger canvas for a crisper render in all contexts
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f5f1ea',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Match the squircle shape of the header logo pill
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            color: '#141312',
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: '-2px',
            fontFamily: 'sans-serif',
          }}
        >
          TCF.
        </span>
      </div>
    ),
    { ...size },
  );
}

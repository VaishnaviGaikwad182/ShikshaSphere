import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
      aria-label="ShikshaSphere Logo"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
        fill="url(#logo-gradient)"
      />
      <path
        d="M172.4,98.67,142,122.3V82a6,6,0,0,0-12,0v40.3L99.6,98.67a6,6,0,0,0-9.2,7.66l32,42.67a6,6,0,0,0,9.2,0l32-42.67a6,6,0,1,0-9.2-7.66Z"
        fill="url(#logo-gradient)"
      />
      <path
        d="M128,156a6,6,0,0,0-6,6v18a6,6,0,0,0,12,0V162A6,6,0,0,0,128,156Z"
        fill="url(#logo-gradient)"
      />
    </svg>
  ),
};

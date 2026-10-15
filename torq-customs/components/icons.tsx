import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...p }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...p}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: P) => (
  <Base {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRight = (p: P) => (
  <Base {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </Base>
);

export const ArrowLeft = (p: P) => (
  <Base {...p}>
    <path d="M19.5 12h-15M10.5 6l-6 6 6 6" />
  </Base>
);

export const Plus = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const Minus = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const Close = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Menu = (p: P) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h10" />
  </Base>
);

export const Check = (p: P) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const ChevronDown = (p: P) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

/** Shopping bag */
export const Bag = (p: P) => (
  <Base {...p}>
    <path d="M5.5 8.5h13l-1 11.5h-11z" />
    <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
  </Base>
);

export const Trash = (p: P) => (
  <Base {...p}>
    <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" />
  </Base>
);

/** Layers — LODs */
export const Layers = (p: P) => (
  <Base {...p}>
    <path d="m12 4 8 4.5-8 4.5-8-4.5z" />
    <path d="m4 12.5 8 4.5 8-4.5" />
    <path d="m4 16.5 8 4.5 8-4.5" opacity={0.5} />
  </Base>
);

/** Rev gauge — same idea as the logo mark */
export const Gauge = (p: P) => (
  <Base {...p}>
    <path d="M6.3 17.7a8 8 0 1 1 11.4 0" />
    <path d="m12 13.5 4-4.5" />
    <circle cx="12" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
  </Base>
);

export const Wrench = (p: P) => (
  <Base {...p}>
    <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5" />
    <path d="M14.5 6.5 17 4l3 3-2.5 2.5" />
  </Base>
);

export const Box = (p: P) => (
  <Base {...p}>
    <path d="m12 3.5 8 4v9l-8 4-8-4v-9z" />
    <path d="m4 7.5 8 4 8-4M12 11.5v9" />
  </Base>
);

export const Shield = (p: P) => (
  <Base {...p}>
    <path d="M12 3.5 19 6v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const Bolt = (p: P) => (
  <Base {...p}>
    <path d="M13 3 5.5 13.5H12L11 21l7.5-10.5H12z" />
  </Base>
);

export const Terminal = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
    <path d="m7.5 10 2.5 2-2.5 2M12.5 14.5h4" />
  </Base>
);

export const Refresh = (p: P) => (
  <Base {...p}>
    <path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9M4.5 12a7.5 7.5 0 0 1 13.2-4.9" />
    <path d="M18 3.5v3.8h-3.8M6 20.5v-3.8h3.8" />
  </Base>
);

export const User = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c1-3.5 3.8-5.5 7-5.5s6 2 7 5.5" />
  </Base>
);

export const Lock = (p: P) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </Base>
);

export const Sun = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </Base>
);

export const Moon = (p: P) => (
  <Base {...p}>
    <path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z" />
  </Base>
);

export const Ruler = (p: P) => (
  <Base {...p}>
    <path d="m4 15.5 11.5-11.5 4.5 4.5L8.5 20z" />
    <path d="m8 11.5 2 2M10.5 9l1.5 1.5M13 6.5l2 2" />
  </Base>
);

export const Discord = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M19.3 5.4A16.6 16.6 0 0 0 15.2 4l-.5 1a15.3 15.3 0 0 0-5.4 0l-.5-1a16.5 16.5 0 0 0-4.1 1.4C2.1 9.3 1.4 13.2 1.7 17a16.7 16.7 0 0 0 5 2.6l1.1-1.7a10.8 10.8 0 0 1-1.7-.8l.4-.3a11.9 11.9 0 0 0 11 0l.4.3c-.6.3-1.1.6-1.7.8l1.1 1.7a16.6 16.6 0 0 0 5-2.6c.4-4.4-.7-8.2-3-11.6ZM8.7 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
  </svg>
);

export const Search = (p: P) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Base>
);

export const Cart = (p: P) => (
  <Base {...p}>
    <path d="M3.5 4.5h2l2.2 10.5h10.3l2-7.5H6.6" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="17" cy="19" r="1.3" />
  </Base>
);

export const LogIn = (p: P) => (
  <Base {...p}>
    <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    <path d="M10 8l4 4-4 4M14 12H4" />
  </Base>
);

export const ImageIcon = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m4 17 5-4.5 3.5 3 3-2.5L20 17" />
  </Base>
);

export const Crown = (p: P) => (
  <Base {...p}>
    <path d="M4 8.5 8 12l4-6 4 6 4-3.5-1.5 9h-13z" />
  </Base>
);

export const Users = (p: P) => (
  <Base {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3 19c.8-3.2 3.2-5 6-5s5.2 1.8 6 5" />
    <path d="M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.3c1.8.6 3 2.2 3.5 4.7" />
  </Base>
);

export const ChevronLeft = (p: P) => (
  <Base {...p}>
    <path d="m15 6-6 6 6 6" />
  </Base>
);

export const ChevronRight = (p: P) => (
  <Base {...p}>
    <path d="m9 6 6 6-6 6" />
  </Base>
);

export const Car = (p: P) => (
  <Base {...p}>
    <path d="M3.5 15.5v-3l2-4.5a2 2 0 0 1 1.8-1.2h9.4a2 2 0 0 1 1.8 1.2l2 4.5v3a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" />
    <path d="M3.5 12.5h17" />
    <circle cx="7.5" cy="16.5" r="1.7" />
    <circle cx="16.5" cy="16.5" r="1.7" />
  </Base>
);

export const YouTube = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12ZM9.8 15.3V8.7l6 3.3-6 3.3Z" />
  </svg>
);

export const TikTok = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3.1c-1.4.1-2.6-.3-3.9-1.1v5.6c0 4.6-4.4 6.9-7.8 5.1-2.9-1.5-3.5-5.6-1-7.9 1.1-1 2.6-1.4 4-1.2v3.2c-.4-.1-.8-.2-1.2-.1-1.6.2-2.4 2-1.3 3.2.9 1 2.8.8 3.3-.6.1-.4.2-.8.2-1.2V3h3.8Z" />
  </svg>
);

export const Instagram = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </Base>
);

/* ── Payment method badges (38×24) ─────────────────────────────────────── */

const PAY = "h-6 w-auto rounded-[3px]";

export const VisaIcon = ({ className = PAY }: { className?: string }) => (
  <svg viewBox="0 0 38 24" className={className} role="img" aria-label="Visa">
    <rect width="38" height="24" rx="3" fill="#fff" />
    <text x="19" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontStyle="italic" fontWeight="700" letterSpacing="0.5" fill="#1a1f71">
      VISA
    </text>
  </svg>
);

export const MastercardIcon = ({ className = PAY }: { className?: string }) => (
  <svg viewBox="0 0 38 24" className={className} role="img" aria-label="Mastercard">
    <rect width="38" height="24" rx="3" fill="#fff" />
    <circle cx="15" cy="12" r="7" fill="#eb001b" />
    <circle cx="23" cy="12" r="7" fill="#f79e1b" />
    <path d="M19 6.6a7 7 0 0 1 0 10.8 7 7 0 0 1 0-10.8Z" fill="#ff5f00" />
  </svg>
);

export const PaypalIcon = ({ className = PAY }: { className?: string }) => (
  <svg viewBox="0 0 38 24" className={className} role="img" aria-label="PayPal">
    <rect width="38" height="24" rx="3" fill="#fff" />
    <text x="19" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fontStyle="italic">
      <tspan fill="#003087">Pay</tspan>
      <tspan fill="#009cde">Pal</tspan>
    </text>
  </svg>
);

export const ApplePayIcon = ({ className = PAY }: { className?: string }) => (
  <svg viewBox="0 0 38 24" className={className} role="img" aria-label="Apple Pay">
    <rect width="38" height="24" rx="3" fill="#fff" />
    <path d="M11.3 8.9c.3-.4.5-.9.45-1.45-.43.02-.96.29-1.27.66-.28.32-.53.84-.46 1.34.48.04.97-.24 1.28-.55Zm.44.7c-.7-.04-1.3.4-1.63.4-.34 0-.85-.38-1.4-.37-.72.01-1.39.42-1.76 1.07-.75 1.3-.2 3.22.53 4.28.36.52.78 1.1 1.34 1.08.53-.02.73-.34 1.37-.34.64 0 .82.34 1.38.33.57-.01.93-.53 1.28-1.05.4-.6.57-1.18.58-1.21-.01-.01-1.11-.43-1.12-1.69-.01-1.05.86-1.56.9-1.58-.49-.72-1.26-.8-1.53-.82Z" fill="#000" />
    <text x="30" y="15.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="600" fill="#000">
      Pay
    </text>
  </svg>
);

export const GooglePayIcon = ({ className = PAY }: { className?: string }) => (
  <svg viewBox="0 0 52 24" className={className} role="img" aria-label="Google Pay">
    <rect width="52" height="24" rx="3" fill="#fff" />
    <text x="5" y="16" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700">
      <tspan fill="#4285f4">G</tspan>
      <tspan fill="#ea4335">o</tspan>
      <tspan fill="#fbbc04">o</tspan>
      <tspan fill="#4285f4">g</tspan>
      <tspan fill="#34a853">l</tspan>
      <tspan fill="#ea4335">e</tspan>
    </text>
    <text x="35" y="16" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="600" fill="#5f6368">
      Pay
    </text>
  </svg>
);

export const TebexWordmark = ({ className = "h-4 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 70 20" className={className} role="img" aria-label="Tebex">
    <text x="0" y="15" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="800" letterSpacing="-0.3" fill="currentColor">
      tebex
    </text>
  </svg>
);

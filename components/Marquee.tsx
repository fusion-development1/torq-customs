import { SITE } from "@/lib/site";

function Spark() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 text-black/70" aria-hidden>
      <path d="M6 0c.4 3.3 2.7 5.6 6 6-3.3.4-5.6 2.7-6 6-.4-3.3-2.7-5.6-6-6 3.3-.4 5.6-2.7 6-6Z" fill="currentColor" />
    </svg>
  );
}

/** The strip that scrolls across the very top of the page. */
export function Marquee() {
  // Four copies → two identical halves, wide enough to never show a gap.
  const items = [...SITE.marquee, ...SITE.marquee];
  const half = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-7 pr-7">
          <span className="whitespace-nowrap">{t}</span>
          <Spark />
        </span>
      ))}
    </div>
  );

  return (
    <div className="group relative z-50 h-9 overflow-hidden bg-brand-500 text-white">
      <p className="sr-only">{SITE.marquee.join(" · ")}</p>
      <div
        className="flex h-full w-max animate-marquee items-center text-[11px] font-bold uppercase tracking-[0.18em] group-hover:[animation-play-state:paused]"
        aria-hidden
      >
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

import { ImageIcon } from "./icons";
import { BrandGlyph } from "./Logo";

/**
 * Where a product photo goes. Shown until the Tebex package has an image —
 * looks like an empty camera frame, not a broken image.
 */
export function ImagePlaceholder({
  label = "Product image",
  hint = "16:10 · 1920 × 1200",
  compact = false,
  className = ""
}: {
  label?: string;
  hint?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`hatch grain relative grid h-full w-full place-items-center overflow-hidden bg-panel2 ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 50% 35%, rgba(255,255,255,0.05), transparent 70%)" }}
      />
      {!compact && (
        <>
          {/* viewfinder corners */}
          {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
            (c) => (
              <span key={c} aria-hidden className={`absolute h-4 w-4 border-white/15 ${c}`} />
            )
          )}
          <BrandGlyph className="absolute bottom-3.5 right-4 h-auto w-7 opacity-[0.12]" />
        </>
      )}
      <div className="relative flex flex-col items-center gap-2 text-center text-zinc-600">
        <ImageIcon className={compact ? "h-4 w-4" : "h-7 w-7"} />
        {!compact && (
          <>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{label}</span>
            {hint && <span className="text-[10px] tabular-nums tracking-wide text-zinc-600">{hint}</span>}
          </>
        )}
      </div>
    </div>
  );
}

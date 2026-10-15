import Image from "next/image";
import lockup from "@/public/brand/torq-logo.png";
import qGlyph from "@/public/brand/torq-q.png";
import wordmark from "@/public/brand/torq-wordmark.png";

/**
 * TORQ Customs brand marks, cut out of the original logo (brand/torq-logo-source.png):
 *  - lockup:   TORQ + — CUSTOMS —
 *  - wordmark: TORQ only (header)
 *  - glyph:    the Q (favicon, watermarks)
 */
export const LOGO = { lockup, wordmark, glyph: qGlyph };

export function Logo({
  variant = "wordmark",
  className = "",
  priority = false
}: {
  variant?: "wordmark" | "lockup";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "lockup" ? lockup : wordmark;
  return (
    <a href="/" aria-label="TORQ Customs — home" className="group inline-flex shrink-0 items-center">
      <Image
        src={src}
        alt="TORQ Customs"
        priority={priority}
        sizes="240px"
        className={`w-auto transition duration-300 group-hover:brightness-125 ${className}`}
      />
    </a>
  );
}

/** Faint brand mark used as a watermark on placeholders and backdrops. */
export function BrandGlyph({ className = "" }: { className?: string }) {
  return <Image src={qGlyph} alt="" aria-hidden sizes="120px" className={`pointer-events-none select-none ${className}`} />;
}

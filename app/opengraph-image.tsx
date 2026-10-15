import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/brand/torq-logo.png")).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(60% 55% at 50% 42%, rgba(255,255,255,0.09), transparent 70%), radial-gradient(55% 50% at 50% 112%, rgba(229,22,47,0.6), transparent 72%)",
          color: "#fff",
          fontFamily: "sans-serif"
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={760} height={197} alt="" />
        <div style={{ marginTop: 44, fontSize: 30, color: "#d4d4d8", letterSpacing: 1 }}>{SITE.tagline}</div>
        <div
          style={{
            marginTop: 26,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a1a1aa"
          }}
        >
          <span>Standalone</span>
          <div style={{ width: 7, height: 7, background: "#e5162f", transform: "rotate(45deg)" }} />
          <span>Instant delivery</span>
          <div style={{ width: 7, height: 7, background: "#e5162f", transform: "rotate(45deg)" }} />
          <span>Tebex checkout</span>
        </div>
      </div>
    ),
    size
  );
}

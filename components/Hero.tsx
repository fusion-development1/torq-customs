import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";
import type { TopCustomer } from "@/lib/types";
import { ArrowRight, Crown, Discord, Instagram, TikTok, YouTube } from "./icons";
import { LOGO } from "./Logo";

export function Hero({
  image,
  topCustomer,
  discordOnline
}: {
  image: string | null;
  topCustomer: TopCustomer | null;
  discordOnline: number | null;
}) {
  const socials = [
    { href: SITE.socials.youtube, label: "YouTube", Icon: YouTube },
    { href: SITE.socials.tiktok, label: "TikTok", Icon: TikTok },
    { href: SITE.socials.instagram, label: "Instagram", Icon: Instagram }
  ].filter((s) => s.href);

  return (
    <section id="top" className="relative -mt-[72px] flex min-h-[640px] items-end overflow-hidden sm:h-[calc(100svh-36px)] sm:max-h-[920px]">
      {/* ---------- background ---------- */}
      <div className="grain absolute inset-0">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className={`h-full w-full object-cover ${SITE.heroMonochrome ? "grayscale contrast-[1.15] brightness-[0.62]" : "brightness-[0.7]"}`}
          />
        ) : (
          <HeroBackdrop />
        )}
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-night via-night/70 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

      {/* ---------- content ---------- */}
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-12 pt-36 sm:px-6 sm:pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <h1 className="animate-fade-up">
            <Image
              src={LOGO.lockup}
              alt="TORQ Customs"
              priority
              sizes="(min-width: 1024px) 620px, 90vw"
              className="h-auto w-[clamp(280px,44vw,620px)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            />
            <span
              className="mt-5 block animate-fade-up font-display text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-tight tracking-tight text-white/85"
              style={{ animationDelay: "120ms" }}
            >
              Built to be driven.
            </span>
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-zinc-300 sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            Quality lore-friendly add-on vehicles for FiveM — detailed interiors, tuned handling and
            proper LODs. Delivered instantly to your Cfx.re account.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
            <a href="#featured" className="btn-white px-7 py-3.5 text-[15px]">
              Browse vehicles
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={SITE.discord} target="_blank" rel="noreferrer" className="btn-outline px-7 py-3.5 text-[15px]">
              <Discord className="h-4 w-4" />
              Join Discord
            </a>
          </div>
        </div>

        <div className="flex animate-fade-up flex-col gap-3 lg:items-end" style={{ animationDelay: "420ms" }}>
          {socials.length > 0 && (
            <div className="flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-black/40 text-zinc-300 backdrop-blur-md transition hover:border-white/30 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {topCustomer && (
              <div className="flex items-center gap-3.5 rounded-lg border border-white/10 bg-black/45 px-4 py-3.5 backdrop-blur-md">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/[0.06] text-amber-300">
                  <Crown className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">Top customer</p>
                  <p className="truncate text-sm font-semibold text-white">{topCustomer.name}</p>
                  <p className="text-xs text-zinc-400">
                    Total: <span className="tabular-nums text-zinc-200">{formatPrice(topCustomer.total, topCustomer.currency)}</span>
                  </p>
                </div>
              </div>
            )}
            <a
              href={SITE.discord}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3.5 rounded-lg border border-white/10 bg-black/45 px-4 py-3.5 backdrop-blur-md transition hover:border-white/25"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#5865F2]/15 text-[#8f99ff]">
                <Discord className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">Join Discord</p>
                <p className="text-sm font-semibold text-white">Join our community</p>
                <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                  {discordOnline != null ? (
                    <>
                      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                      <span className="tabular-nums text-zinc-200">{discordOnline}</span> online now
                    </>
                  ) : (
                    <>
                      News, drops & support
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Shown until a real photo is dropped into public/hero.jpg. */
function HeroBackdrop() {
  return (
    <div className="relative h-full w-full bg-[#0b0b0d]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 78% 30%, rgba(255,255,255,0.13), transparent 70%), radial-gradient(40% 50% at 92% 85%, rgba(229,22,47,0.16), transparent 70%)"
        }}
      />
      {/* light streaks */}
      <div aria-hidden className="absolute inset-0 overflow-hidden opacity-60">
        {[18, 34, 47, 63, 71].map((top, i) => (
          <span
            key={top}
            className="absolute right-[-10%] h-px origin-right"
            style={{
              top: `${top}%`,
              width: `${55 + i * 7}%`,
              transform: `rotate(${-8 + i * 1.5}deg)`,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.05 + i * 0.02}) 60%, rgba(255,255,255,${0.12 + i * 0.03}))`
            }}
          />
        ))}
      </div>
      {/* oversized ghost wordmark */}
      <Image
        src={LOGO.wordmark}
        alt=""
        aria-hidden
        sizes="80vw"
        className="pointer-events-none absolute -right-[6vw] top-[44%] h-auto w-[78vw] -translate-y-1/2 select-none opacity-[0.045] lg:w-[64vw]"
      />
    </div>
  );
}

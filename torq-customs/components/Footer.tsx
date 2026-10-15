import { SITE } from "@/lib/site";
import {
  ApplePayIcon,
  Discord,
  GooglePayIcon,
  Instagram,
  MastercardIcon,
  PaypalIcon,
  TebexWordmark,
  TikTok,
  VisaIcon,
  YouTube
} from "./icons";
import { Logo } from "./Logo";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Store",
    links: [
      ["Featured", "/#featured"],
      ["Why TORQ", "/#why"],
      ["FAQ", "/#faq"]
    ]
  },
  {
    title: "Support",
    links: [
      ["Discord", SITE.discord],
      ["Cfx.re Portal", "https://portal.cfx.re/assets/granted-assets"],
      [SITE.email, `mailto:${SITE.email}`]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Terms of service", "/terms"],
      ["Refund policy", "/refunds"],
      ["Privacy policy", "/privacy"]
    ]
  }
];

export function Footer() {
  const socials = [
    { href: SITE.discord, label: "Discord", Icon: Discord },
    { href: SITE.socials.youtube, label: "YouTube", Icon: YouTube },
    { href: SITE.socials.tiktok, label: "TikTok", Icon: TikTok },
    { href: SITE.socials.instagram, label: "Instagram", Icon: Instagram }
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo variant="lockup" className="h-11" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">{SITE.tagline}. Standalone, optimised, delivered instantly.</p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-md border border-line text-zinc-400 transition hover:border-white/25 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => {
                  const external = href.startsWith("http");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external && { target: "_blank", rel: "noreferrer" })}
                        className="break-all text-sm text-zinc-400 transition hover:text-white"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-line pt-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <VisaIcon />
            <MastercardIcon />
            <PaypalIcon />
            <ApplePayIcon />
            <GooglePayIcon />
          </div>
          <p className="flex items-center gap-1.5 text-xs text-zinc-500">
            Payments secured by
            <a href="https://www.tebex.io" target="_blank" rel="noreferrer" className="text-zinc-300 transition hover:text-white">
              <TebexWordmark />
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-center text-xs text-zinc-600 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Not affiliated with Rockstar Games, Take-Two Interactive or Cfx.re.</p>
        </div>
      </div>
    </footer>
  );
}

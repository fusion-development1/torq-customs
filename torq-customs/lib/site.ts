// Everything brand-related lives here. Change it once, it changes everywhere.
export const SITE = {
  name: "TORQ Customs",
  short: "TORQ",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://torqcustoms.com",
  tagline: "Quality lore-friendly cars for FiveM",
  description:
    "Quality lore-friendly add-on vehicles for FiveM. Detailed interiors, tuned handling, full mod kits and instant delivery to your Cfx.re account.",
  email: "support@torqcustoms.com",
  currency: "EUR",

  // TODO: real links before launch
  discord: "https://discord.gg/your-invite",
  /** Server ID with "Server Widget" enabled (Discord → Server Settings → Widget). Shows the live online count. */
  discordGuildId: "",
  socials: {
    youtube: "https://youtube.com/@torqcustoms",
    tiktok: "https://tiktok.com/@torqcustoms",
    instagram: "https://instagram.com/torqcustoms"
  },

  /** Drop a photo at public/hero.jpg and it becomes the hero background. */
  heroImage: "/hero.jpg",
  /** Render the hero photo in black & white. */
  heroMonochrome: true,

  /** The scrolling strip at the very top. */
  marquee: [
    "Welcome to TORQ Customs",
    "Quality lore-friendly cars",
    "Instant delivery to your Cfx.re account",
    "Standalone — ESX · QBCore · QBox",
    "Full tuning & liveries",
    "Free updates",
    "Join our Discord"
  ]
} as const;

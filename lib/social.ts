import "server-only";
import { DEMO_PURCHASES, DEMO_TOP_CUSTOMER } from "./demo";
import { SITE } from "./site";
import { tebexToken } from "./tebex";
import type { Purchase, TopCustomer } from "./types";

/**
 * Real social proof only.
 *
 * Recent purchases and the top customer come from the Tebex Plugin API, which
 * needs the store's secret key (TEBEX_SECRET_KEY, server-side only). Without it
 * the popup and the card simply don't render. Placeholder data is used only in
 * demo mode, when the store isn't connected to Tebex at all.
 */

interface TebexPayment {
  amount: string | number;
  date: string;
  status?: string;
  currency?: { iso_4217?: string };
  player?: { name?: string };
  packages?: { id: number; name: string }[];
}

async function fetchPayments(): Promise<TebexPayment[] | null> {
  const secret = process.env.TEBEX_SECRET_KEY?.trim();
  if (!secret) return null;
  try {
    const res = await fetch("https://plugin.tebex.io/payments?limit=100", {
      headers: { "X-Tebex-Secret": secret, Accept: "application/json" },
      next: { revalidate: 120 }
    });
    if (!res.ok) {
      console.error("[social] Tebex payments request failed:", res.status);
      return null;
    }
    const json = await res.json();
    const list: TebexPayment[] = Array.isArray(json) ? json : json?.data ?? [];
    return list.filter((p) => !p.status || p.status.toLowerCase() === "complete");
  } catch (err) {
    console.error("[social] Tebex payments unavailable:", err);
    return null;
  }
}

export interface SocialData {
  purchases: Purchase[];
  topCustomer: TopCustomer | null;
  discordOnline: number | null;
}

export async function getSocialData(): Promise<SocialData> {
  const [payments, discordOnline] = await Promise.all([
    tebexToken() ? fetchPayments() : Promise.resolve(null),
    getDiscordOnline()
  ]);

  if (!tebexToken()) {
    return { purchases: DEMO_PURCHASES, topCustomer: DEMO_TOP_CUSTOMER, discordOnline };
  }
  if (!payments?.length) return { purchases: [], topCustomer: null, discordOnline };

  const purchases: Purchase[] = payments
    .filter((p) => p.player?.name && p.packages?.length)
    .slice(0, 12)
    .map((p) => ({
      buyer: p.player!.name!,
      productId: p.packages![0].id ?? null,
      product: p.packages![0].name
    }));

  // Top customer of the current month (falls back to everything we fetched).
  const now = new Date();
  const thisMonth = payments.filter((p) => {
    const d = new Date(p.date);
    return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth();
  });
  const pool = thisMonth.length ? thisMonth : payments;
  const totals = new Map<string, number>();
  for (const p of pool) {
    const name = p.player?.name;
    if (!name) continue;
    totals.set(name, (totals.get(name) ?? 0) + Number(p.amount || 0));
  }
  const top = [...totals.entries()].sort((a, b) => b[1] - a[1])[0];
  const currency = pool[0]?.currency?.iso_4217 ?? SITE.currency;

  return {
    purchases,
    topCustomer: top ? { name: top[0], total: top[1], currency } : null,
    discordOnline
  };
}

/** Live online count from the Discord server widget (must be enabled). */
async function getDiscordOnline(): Promise<number | null> {
  const id = SITE.discordGuildId.trim();
  if (!id) return null;
  try {
    const res = await fetch(`https://discord.com/api/guilds/${id}/widget.json`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { presence_count?: number };
    return typeof json.presence_count === "number" ? json.presence_count : null;
  } catch {
    return null;
  }
}

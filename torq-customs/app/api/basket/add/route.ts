import { NextRequest, NextResponse } from "next/server";
import { TEBEX_BASE, tebexToken } from "@/lib/tebex";

interface Body {
  ident: string;
  items: { id: number; qty: number }[];
}

/**
 * Makes the authenticated basket match the cart exactly, then returns the
 * Tebex checkout link. The basket is reused between attempts, so anything left
 * on it from a previous try is removed first.
 */
export async function POST(req: NextRequest) {
  const token = tebexToken();
  if (!token) return NextResponse.json({ error: "Store is not connected to Tebex yet." }, { status: 503 });

  const { ident, items } = (await req.json()) as Body;
  if (!ident || !/^[\w-]+$/.test(ident)) {
    return NextResponse.json({ error: "Missing basket." }, { status: 400 });
  }
  if (!items?.length) return NextResponse.json({ error: "Cart is empty." }, { status: 400 });

  const getRes = await fetch(`${TEBEX_BASE}/accounts/${token}/baskets/${ident}`, {
    headers: { Accept: "application/json" },
    cache: "no-store"
  });
  if (!getRes.ok) {
    return NextResponse.json({ error: "Basket not found.", needsAuth: true }, { status: 401 });
  }
  const existing = ((await getRes.json()).data?.packages ?? []) as { id: number }[];

  for (const p of existing) {
    await fetch(`${TEBEX_BASE}/baskets/${ident}/packages/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ package_id: p.id })
    });
  }

  for (const item of items) {
    const res = await fetch(`${TEBEX_BASE}/baskets/${ident}/packages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ package_id: item.id, quantity: Math.max(1, Math.floor(item.qty)) })
    });
    if (!res.ok) {
      const text = await res.text();
      const needsAuth = /login|auth/i.test(text);
      return NextResponse.json(
        { error: `Could not add package ${item.id}.`, needsAuth },
        { status: needsAuth ? 401 : 502 }
      );
    }
  }

  let checkoutUrl: string | null = null;
  try {
    const finalRes = await fetch(`${TEBEX_BASE}/accounts/${token}/baskets/${ident}`, {
      headers: { Accept: "application/json" },
      cache: "no-store"
    });
    if (finalRes.ok) {
      const links = (await finalRes.json()).data?.links;
      if (typeof links?.checkout === "string") checkoutUrl = links.checkout;
    }
  } catch {
    /* client falls back to the canonical URL */
  }

  return NextResponse.json({ ok: true, checkoutUrl });
}

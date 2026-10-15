import { NextRequest, NextResponse } from "next/server";
import { TEBEX_BASE, tebexToken } from "@/lib/tebex";

/**
 * Fallback for when the browser can't create the basket itself (blocked by an
 * extension). Creates a basket and returns the Cfx.re login URL.
 * Never send `ip_address` — it's a privileged field and Tebex answers 422.
 */
export async function POST(req: NextRequest) {
  const token = tebexToken();
  if (!token) return NextResponse.json({ error: "Store is not connected to Tebex yet." }, { status: 503 });

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;

  const basketRes = await fetch(`${TEBEX_BASE}/accounts/${token}/baskets`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      complete_url: `${origin}/?purchase=success`,
      cancel_url: `${origin}/?purchase=cancelled`,
      complete_auto_redirect: true
    })
  });
  if (!basketRes.ok) {
    return NextResponse.json({ error: "Could not create a basket." }, { status: 502 });
  }
  const ident = (await basketRes.json()).data.ident as string;
  const returnUrl = `${origin}/?cfx=${ident}`;

  const authRes = await fetch(
    `${TEBEX_BASE}/accounts/${token}/baskets/${ident}/auth?returnUrl=${encodeURIComponent(returnUrl)}`,
    { headers: { Accept: "application/json" } }
  );
  let authUrl: string | null = null;
  if (authRes.ok) {
    const providers = (await authRes.json()) as { url?: string }[];
    authUrl = providers?.[0]?.url ?? null;
  }

  return NextResponse.json({ ident, authUrl });
}

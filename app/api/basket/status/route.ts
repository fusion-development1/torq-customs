import { NextRequest, NextResponse } from "next/server";
import { TEBEX_BASE, tebexToken } from "@/lib/tebex";

/** Has the player behind this basket logged in with Cfx.re yet? */
export async function GET(req: NextRequest) {
  const token = tebexToken();
  const ident = req.nextUrl.searchParams.get("ident");
  if (!token || !ident || !/^[\w-]+$/.test(ident)) {
    return NextResponse.json({ authenticated: false });
  }

  const res = await fetch(`${TEBEX_BASE}/accounts/${token}/baskets/${ident}`, {
    headers: { Accept: "application/json" },
    cache: "no-store"
  });
  if (!res.ok) return NextResponse.json({ authenticated: false });

  const data = (await res.json()).data as { username: string | null; username_id: number | null };
  return NextResponse.json({ authenticated: data.username_id != null, username: data.username ?? null });
}

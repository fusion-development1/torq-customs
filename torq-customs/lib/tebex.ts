// Subset of the Tebex Headless API we use. Docs: https://docs.tebex.io/developers/headless-api

export const TEBEX_BASE = "https://headless.tebex.io/api";

export function tebexToken(): string | null {
  const t = process.env.NEXT_PUBLIC_TEBEX_TOKEN?.trim();
  return t ? t : null;
}

export interface TebexPackage {
  id: number;
  name: string;
  description: string;
  image: string | null;
  media?: { type: string; url: string }[];
  type: "single" | "subscription";
  base_price: number;
  total_price: number;
  currency: string;
  discount: number;
  disable_quantity: boolean;
  category: { id: number; name: string };
}

export interface TebexCategory {
  id: number;
  name: string;
  order: number;
  packages: TebexPackage[];
}

export async function fetchTebexCategories(token: string): Promise<TebexCategory[]> {
  const res = await fetch(`${TEBEX_BASE}/accounts/${token}/categories?includePackages=1`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 600 }
  });
  if (!res.ok) throw new Error(`Tebex categories request failed: ${res.status}`);
  const json = (await res.json()) as { data: TebexCategory[] };
  return json.data
    .filter((c) => c.packages?.length)
    .sort((a, b) => a.order - b.order);
}

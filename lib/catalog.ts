import { DEMO_CATEGORIES, DEMO_PRODUCTS } from "./demo";
import { slugify } from "./format";
import { fetchTebexCategories, tebexToken, type TebexPackage } from "./tebex";
import type { Category, Product } from "./types";

export interface Catalog {
  source: "tebex" | "demo";
  categories: Category[];
  products: Product[];
  /** Tebex is configured but could not be reached. */
  unavailable?: boolean;
}

/** Strip anything executable from Tebex HTML before rendering it. */
function cleanHtml(html: string) {
  return html
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

function plain(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function firstSentence(text: string, max = 120) {
  const s = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}

function fromTebex(pkg: TebexPackage, used: Set<string>): Product {
  let slug = slugify(pkg.name) || String(pkg.id);
  if (used.has(slug)) slug = `${slug}-${pkg.id}`;
  used.add(slug);

  const gallery = (pkg.media ?? []).filter((m) => m.type === "image").map((m) => m.url);
  const categoryName = (pkg.category?.name ?? "Vehicles").replace(/[[\]]/g, "");

  return {
    id: pkg.id,
    slug,
    name: pkg.name,
    tagline: firstSentence(plain(pkg.description ?? "")),
    category: categoryName,
    categorySlug: slugify(categoryName),
    price: pkg.total_price,
    basePrice: pkg.discount > 0 ? pkg.total_price + pkg.discount : undefined,
    currency: pkg.currency,
    image: pkg.image,
    gallery: gallery.length ? gallery : pkg.image ? [pkg.image] : [],
    descriptionHtml: cleanHtml(pkg.description ?? ""),
    disableQty: pkg.disable_quantity
  };
}

export async function getCatalog(): Promise<Catalog> {
  const token = tebexToken();
  if (!token) {
    return { source: "demo", categories: DEMO_CATEGORIES, products: DEMO_PRODUCTS };
  }
  try {
    const cats = await fetchTebexCategories(token);
    const used = new Set<string>();
    const products = cats.flatMap((c) => c.packages.map((p) => fromTebex(p, used)));
    const categories = cats.map((c) => {
      const name = c.name.replace(/[[\]]/g, "");
      return { slug: slugify(name), name };
    });
    // Featured = the three priciest packages (bundles and flagships float up).
    [...products]
      .filter((p) => p.price > 0)
      .sort((a, b) => b.price - a.price)
      .slice(0, 3)
      .forEach((p) => (p.featured = true));
    return { source: "tebex", categories, products };
  } catch (err) {
    // Never show placeholder products on a live store — they can't be bought.
    console.error("[catalog] Tebex unavailable:", err);
    return { source: "tebex", categories: [], products: [], unavailable: true };
  }
}

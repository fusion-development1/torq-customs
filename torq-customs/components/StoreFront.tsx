"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Category, Product, Purchase } from "@/lib/types";
import { Activity } from "./Activity";
import { CategoryNav, type NavItem } from "./CategoryNav";
import { Heading } from "./Heading";
import { Search } from "./icons";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

export function StoreFront({
  products,
  categories,
  purchases,
  demo,
  unavailable,
  children
}: {
  products: Product[];
  categories: Category[];
  purchases: Purchase[];
  demo: boolean;
  unavailable?: boolean;
  /** Static sections rendered below the catalog (features, FAQ…). */
  children?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  // Shareable product links: /?product=<slug>
  const open = useCallback((p: Product) => {
    setSelected(p);
    const url = new URL(window.location.href);
    url.searchParams.set("product", p.slug);
    window.history.replaceState({}, "", url);
  }, []);
  const close = useCallback(() => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("product");
    window.history.replaceState({}, "", url);
  }, []);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("product");
    const p = slug && products.find((x) => x.slug === slug);
    if (p) setSelected(p);
  }, [products]);

  const q = query.trim().toLowerCase();
  const match = (p: Product) => !q || `${p.name} ${p.category} ${p.tagline}`.toLowerCase().includes(q);

  const featured = useMemo(() => products.filter((p) => p.featured).slice(0, 3), [products]);
  const sections = useMemo(
    () =>
      categories
        .map((c) => ({ ...c, items: products.filter((p) => p.categorySlug === c.slug) }))
        .filter((c) => c.items.length > 0),
    [categories, products]
  );

  const navItems = useMemo<NavItem[]>(
    () => [
      ...(featured.length ? [{ id: "featured", label: "Featured" }] : []),
      ...sections.map((s) => ({ id: `cat-${s.slug}`, label: s.name, count: s.items.length })),
      { id: "faq", label: "FAQ" }
    ],
    [featured.length, sections]
  );

  const visible = sections.map((s) => ({ ...s, items: s.items.filter(match) })).filter((s) => s.items.length);

  return (
    <>
      <CategoryNav items={navItems} query={query} setQuery={setQuery} />

      {/* mobile search */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:hidden">
        <label className="relative block">
          <span className="sr-only">Search vehicles</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicles…"
            className="h-11 w-full rounded-md border border-line bg-panel pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/30"
          />
        </label>
      </div>

      {unavailable && (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="rounded-xl border border-line bg-panel px-6 py-20 text-center text-zinc-400">
            The garage is restocking — the catalog couldn&apos;t be loaded. Try again in a minute.
          </div>
        </div>
      )}

      {!q && featured.length > 0 && (
        <section id="featured" className="scroll-mt-36">
          <div className="mx-auto max-w-7xl px-4 pb-4 pt-14 sm:px-6 sm:pt-20">
            <Heading eyebrow="Top picks" title="Featured" sub="The cars everyone is driving right now." />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} featured onOpen={open} />
              ))}
            </div>
          </div>
        </section>
      )}

      {q && visible.length === 0 && (
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="rounded-xl border border-line bg-panel py-20 text-center">
            <p className="text-zinc-400">Nothing matches “{query}”.</p>
            <button type="button" onClick={() => setQuery("")} className="btn-outline mt-5">
              Clear search
            </button>
          </div>
        </div>
      )}

      {visible.map((s) => (
        <section key={s.slug} id={`cat-${s.slug}`} className="scroll-mt-36">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
            <Heading title={s.name} sub={`${s.items.length} ${s.slug === "bundles" ? "bundle" : "vehicle"}${s.items.length === 1 ? "" : "s"}`} />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {s.items.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={open} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {demo && (
        <p className="mx-auto max-w-7xl px-4 pb-4 text-center text-xs text-zinc-600 sm:px-6">
          Preview mode — product images, names and prices come from Tebex once the store is connected.
        </p>
      )}

      {children}

      <ProductModal product={selected} onClose={close} />
      <Activity purchases={purchases} products={products} onOpen={open} />
    </>
  );
}

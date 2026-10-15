"use client";

import { useEffect, useState } from "react";
import { Search } from "./icons";

export interface NavItem {
  id: string;
  label: string;
  count?: number;
}

/** Sticky section tabs with scroll-spy and search. */
export function CategoryNav({
  items,
  query,
  setQuery
}: {
  items: NavItem[];
  query: string;
  setQuery: (v: string) => void;
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-150px 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="sticky top-[72px] z-30 border-y border-line bg-night/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6">
        <nav className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto py-2.5" aria-label="Sections">
          {items.map((it) => {
            const on = active === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => go(it.id)}
                className={`relative flex shrink-0 items-center gap-1.5 rounded-md px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] transition ${
                  on ? "bg-white/[0.06] text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {it.label}
                {typeof it.count === "number" && (
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] tabular-nums text-zinc-500">{it.count}</span>
                )}
                {on && <span className="absolute inset-x-3 -bottom-[11px] h-0.5 rounded-full bg-brand-500" />}
              </button>
            );
          })}
        </nav>
        <label className="relative hidden w-60 shrink-0 sm:block">
          <span className="sr-only">Search vehicles</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicles…"
            className="h-9 w-full rounded-md border border-line bg-panel pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
          />
        </label>
      </div>
    </div>
  );
}

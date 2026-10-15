"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { Check } from "./icons";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function ProductCard({
  product: p,
  featured = false,
  onOpen
}: {
  product: Product;
  featured?: boolean;
  onOpen: (p: Product) => void;
}) {
  const cart = useCart();
  const [flash, setFlash] = useState(false);
  const inCart = cart.has(p.id);
  const off = p.basePrice && p.basePrice > p.price ? Math.round((1 - p.price / p.basePrice) * 100) : 0;

  const onAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) return cart.open();
    cart.add(p);
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);
  };

  return (
    <article
      onClick={() => onOpen(p)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen(p))}
      tabIndex={0}
      role="button"
      aria-label={`${p.name} — view details`}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-panel transition duration-300 hover:-translate-y-1 ${
        featured ? "border-white/15 hover:border-white/35" : "border-line hover:border-white/20"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-night">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <ImagePlaceholder className="transition duration-700 group-hover:scale-[1.04]" />
        )}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-panel to-transparent" />

        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="tag">{p.category}</span>
        </div>
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {featured && <span className="rounded-md bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-black">Top pick</span>}
          {p.isNew && <span className="rounded-md bg-brand-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">New</span>}
          {off > 0 && <span className="rounded-md bg-amber-400 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-black">−{off}%</span>}
        </div>

        <span className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto w-max translate-y-2 rounded-md bg-black/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View details
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-white">{p.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">{p.tagline}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold tabular-nums text-white">
              {p.price === 0 ? "Free" : formatPrice(p.price, p.currency)}
            </span>
            {off > 0 && (
              <span className="text-sm tabular-nums text-zinc-600 line-through">{formatPrice(p.basePrice!, p.currency)}</span>
            )}
          </div>
          <button
            type="button"
            onClick={onAdd}
            className={`flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-semibold transition active:scale-95 ${
              flash || inCart
                ? "bg-white text-black"
                : "bg-white/[0.04] text-white ring-1 ring-inset ring-white/15 hover:bg-white hover:text-black"
            }`}
          >
            {(flash || inCart) && <Check className="h-4 w-4" />}
            {flash ? "Added" : inCart ? "In cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

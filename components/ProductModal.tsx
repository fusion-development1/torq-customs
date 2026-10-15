"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { Bolt, Check, ChevronLeft, ChevronRight, Close, Lock, Refresh, Shield } from "./icons";
import { ImagePlaceholder } from "./ImagePlaceholder";

const PERKS = [
  { Icon: Bolt, text: "Instant delivery to your Cfx.re Portal" },
  { Icon: Shield, text: "Standalone — ESX, QBCore, QBox" },
  { Icon: Refresh, text: "Free updates and fixes" },
  { Icon: Lock, text: "Secure checkout by Tebex" }
];

/** What a product looks like when you click it. */
export function ProductModal({ product: p, onClose }: { product: Product | null; onClose: () => void }) {
  const cart = useCart();
  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [p?.id]);

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActive((i) => i + 1);
      if (e.key === "ArrowLeft") setActive((i) => Math.max(0, i - 1));
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [p, onClose]);

  if (!p) return null;

  // Real gallery from Tebex, or four empty frames to show where images go.
  const images: (string | null)[] = p.gallery.length ? p.gallery : p.image ? [p.image] : [null, null, null, null];
  const idx = Math.min(active, images.length - 1);
  const current = images[idx];
  const off = p.basePrice && p.basePrice > p.price ? Math.round((1 - p.price / p.basePrice) * 100) : 0;
  const inCart = cart.has(p.id);
  // The cart drawer sits under the modal, so close the modal first.
  const buy = () => {
    onClose();
    if (inCart) cart.open();
    else cart.add(p);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={p.name}>
      <div onClick={onClose} className="absolute inset-0 animate-fade-in bg-black/80 backdrop-blur-sm" />

      <div className="relative flex max-h-[94vh] w-full max-w-6xl animate-pop-in flex-col overflow-hidden rounded-t-2xl border border-line bg-panel sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-md bg-black/60 text-white backdrop-blur transition hover:bg-black/85"
        >
          <Close className="h-5 w-5" />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[58%_1fr]">
        {/* ---------- gallery ---------- */}
        <div className="border-line bg-night p-3 sm:p-4 lg:col-start-1 lg:row-start-1 lg:border-r">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black">
            {current ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={current} src={current} alt={p.name} className="h-full w-full animate-fade-in object-cover" />
            ) : (
              <ImagePlaceholder key={idx} label={`Image ${idx + 1} of ${images.length}`} className="animate-fade-in" />
            )}
            <div className="absolute left-3 top-3 flex gap-1.5">
              <span className="tag">{p.category}</span>
              {p.isNew && <span className="rounded-md bg-brand-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">New</span>}
            </div>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => setActive(idx - 1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md bg-black/60 text-white backdrop-blur transition hover:bg-black/85 disabled:opacity-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  disabled={idx === images.length - 1}
                  onClick={() => setActive(idx + 1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md bg-black/60 text-white backdrop-blur transition hover:bg-black/85 disabled:opacity-0"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[11px] tabular-nums text-zinc-300 backdrop-blur">
                  {idx + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-md border transition sm:w-28 ${
                    i === idx ? "border-white" : "border-line opacity-55 hover:opacity-100"
                  }`}
                >
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <ImagePlaceholder compact />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------- info ---------- */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="px-5 pb-6 pt-5 sm:px-7 sm:pt-7 lg:sticky lg:top-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">{p.category}</p>
            <h2 className="mt-2 pr-10 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-white">
              {p.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.tagline}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold tabular-nums text-white">
                {p.price === 0 ? "Free" : formatPrice(p.price, p.currency)}
              </span>
              {off > 0 && (
                <>
                  <span className="text-base tabular-nums text-zinc-600 line-through">{formatPrice(p.basePrice!, p.currency)}</span>
                  <span className="rounded-md bg-amber-400 px-2 py-0.5 text-xs font-bold text-black">−{off}%</span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-zinc-600">One licence per Cfx.re account · VAT added at checkout</p>

            <button
              type="button"
              onClick={buy}
              className={`mt-5 hidden w-full lg:flex ${inCart ? "btn-outline" : "btn-white"} py-3.5`}
            >
              {inCart ? (
                <>
                  <Check className="h-4 w-4" /> In your cart — view cart
                </>
              ) : (
                "Add to cart"
              )}
            </button>

            <ul className="mt-6 grid gap-2 rounded-lg border border-line bg-night/60 p-4 text-sm text-zinc-300">
              {PERKS.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-brand-400" />
                  {text}
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* ---------- description ---------- */}
        <div className="border-t border-line px-5 pb-8 pt-6 sm:px-7 lg:col-start-1 lg:row-start-2 lg:border-r lg:border-t-0 lg:bg-night lg:pt-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Description</p>
          <div className="rich mt-3" dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />
        </div>
        </div>

          {/* mobile sticky buy bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line bg-panel px-5 py-4 lg:hidden">
            <span className="font-display text-2xl font-bold tabular-nums text-white">
              {p.price === 0 ? "Free" : formatPrice(p.price, p.currency)}
            </span>
            <button type="button" onClick={buy} className={inCart ? "btn-outline" : "btn-white"}>
              {inCart ? "View cart" : "Add to cart"}
            </button>
          </div>
      </div>
    </div>
  );
}

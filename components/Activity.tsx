"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, Purchase } from "@/lib/types";
import { Close } from "./icons";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * Bottom-left "recently purchased" popup. Fed with real Tebex payments
 * (see lib/social.ts) — buyer + the product they actually bought.
 * No timestamps, no counters.
 */
export function Activity({
  purchases,
  products,
  onOpen
}: {
  purchases: Purchase[];
  products: Product[];
  onOpen: (p: Product) => void;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  useEffect(() => {
    if (dismissed || purchases.length === 0) return;
    const SHOW = 6000;
    const FADE = 500;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const gap = () => 14000 + Math.random() * 12000;

    const cycle = () => {
      setVisible(true);
      timers.push(
        setTimeout(() => {
          setVisible(false);
          timers.push(
            setTimeout(() => {
              setIndex((i) => i + 1);
              timers.push(setTimeout(cycle, gap()));
            }, FADE)
          );
        }, SHOW)
      );
    };
    // First pop once the visitor scrolls past the hero (or after a while),
    // so it never sits on top of the hero buttons.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      window.removeEventListener("scroll", onScroll);
      timers.push(setTimeout(cycle, 1200));
    };
    const onScroll = () => window.scrollY > window.innerHeight * 0.6 && start();
    window.addEventListener("scroll", onScroll, { passive: true });
    timers.push(setTimeout(start, 15000));
    onScroll();
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed, purchases.length]);

  if (dismissed || purchases.length === 0) return null;

  const item = purchases[index % purchases.length];
  const product = item.productId != null ? byId.get(item.productId) : undefined;

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex w-[300px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-lg border border-line bg-panel/95 p-2.5 pr-2 shadow-2xl shadow-black/60 backdrop-blur">
        <button
          type="button"
          onClick={() => product && onOpen(product)}
          className="relative aspect-[16/10] w-[72px] shrink-0 overflow-hidden rounded-md bg-night"
          aria-label={product ? `View ${product.name}` : undefined}
          disabled={!product}
        >
          {product?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlaceholder compact />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-white">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate">{item.buyer}</span>
          </p>
          <p className="truncate text-xs text-zinc-400">
            purchased{" "}
            <button
              type="button"
              onClick={() => product && onOpen(product)}
              className="font-medium text-zinc-200 hover:text-white hover:underline"
            >
              {item.product}
            </button>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide recent purchases"
          className="grid h-7 w-7 shrink-0 place-items-center self-start rounded text-zinc-600 transition hover:bg-white/5 hover:text-white"
        >
          <Close className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

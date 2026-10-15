"use client";

import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";
import { ArrowRight, Cart, Close, Lock, LogIn, Trash, User } from "./icons";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function CartDrawer() {
  const cart = useCart();
  const { isOpen, close, items } = cart;
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const busy = cart.status === "loading" || cart.authPending;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-line bg-panel outline-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5">
          <h2 className="flex items-center gap-2.5 font-display text-lg font-extrabold uppercase tracking-tight text-white">
            <Cart className="h-5 w-5" />
            Your cart
            {items.length > 0 && (
              <span className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs tabular-nums text-zinc-400">{items.length}</span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-zinc-400 transition hover:border-white/25 hover:text-white"
          >
            <Close className="h-4 w-4" />
          </button>
        </header>

        {cart.auth && (
          <div className="flex items-center justify-between border-b border-line bg-night/50 px-5 py-3 text-xs">
            <span className="flex items-center gap-2 text-zinc-400">
              <User className="h-3.5 w-3.5 text-brand-400" />
              Logged in as <b className="font-semibold text-white">{cart.auth.username}</b>
            </span>
            <button type="button" onClick={cart.logout} className="text-zinc-500 hover:text-white">
              Log out
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-lg border border-line bg-night text-zinc-500">
              <Cart className="h-6 w-6" />
            </span>
            <p className="mt-5 font-semibold text-white">Your cart is empty</p>
            <p className="mt-1 text-sm text-zinc-500">Pick a car and it shows up here.</p>
            {cart.error && <p className="mt-5 rounded-md border border-brand-500/25 bg-brand-500/10 px-3 py-2.5 text-xs leading-relaxed text-brand-300">{cart.error}</p>}
            <a href="/#featured" onClick={close} className="btn-outline mt-6">
              Browse vehicles
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-2 overflow-y-auto p-4">
              {items.map((i) => (
                <li
                  key={i.id}
                  className={`flex items-center gap-3.5 rounded-lg border p-2.5 pr-3 transition-colors duration-700 ${
                    cart.justAdded === i.id ? "border-white/25 bg-white/[0.04]" : "border-line bg-night/50"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-md bg-night">
                    {i.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={i.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImagePlaceholder compact />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{i.name}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">Licence · 1 per account</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-sm font-semibold tabular-nums text-white">{formatPrice(i.price, i.currency)}</span>
                    <button type="button" onClick={() => cart.remove(i.id)} aria-label={`Remove ${i.name}`} className="text-zinc-600 transition hover:text-brand-400">
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-zinc-400">Subtotal</span>
                <span className="font-display text-2xl font-bold tabular-nums text-white">{formatPrice(cart.total, cart.currency)}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-600">VAT is calculated at checkout based on your country.</p>

              {cart.error && (
                <p className="mt-4 rounded-md border border-brand-500/25 bg-brand-500/10 px-3 py-2.5 text-xs leading-relaxed text-brand-300">{cart.error}</p>
              )}

              <button type="button" disabled={busy} onClick={cart.checkout} className="btn-white mt-5 w-full py-3.5">
                {busy ? (
                  "Connecting…"
                ) : cart.auth ? (
                  <>
                    Checkout
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Log in with Cfx.re to checkout
                  </>
                )}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-600">
                <Lock className="h-3 w-3" />
                Secure payment by Tebex · delivered to your Cfx.re account
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

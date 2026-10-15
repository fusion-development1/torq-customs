"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

/**
 * Cart + Tebex checkout.
 *
 * FiveM stores require the buyer to log in with their Cfx.re account before a
 * package can go into a Tebex basket, so checkout is two steps:
 *   1. login()    — create a basket in the browser, redirect to Cfx.re login,
 *                   come back to /?cfx=<ident>
 *   2. checkout() — put the cart on that basket, redirect to Tebex checkout
 *
 * Without NEXT_PUBLIC_TEBEX_TOKEN the store runs in demo mode: the cart works,
 * checkout explains that the store isn't connected yet.
 */

const TOKEN = process.env.NEXT_PUBLIC_TEBEX_TOKEN?.trim() || "";
const BASE = "https://headless.tebex.io/api";
const CART_KEY = "torq-cart";
const AUTH_KEY = "torq-auth";

interface Auth {
  ident: string;
  username: string;
}

type Status = "idle" | "loading" | "error";

interface CartValue {
  items: CartItem[];
  count: number;
  total: number;
  currency: string;
  isOpen: boolean;
  status: Status;
  error: string | null;
  demo: boolean;
  auth: Auth | null;
  authPending: boolean;
  justAdded: number | null;
  has: (id: number) => boolean;
  open: () => void;
  close: () => void;
  add: (p: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
  login: () => Promise<void>;
  logout: () => void;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartValue | null>(null);

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, value: unknown) {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked — cart just won't persist */
  }
}
function cleanUrl(params: URLSearchParams) {
  const qs = params.toString();
  window.history.replaceState({}, "", window.location.pathname + (qs ? `?${qs}` : ""));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [authPending, setAuthPending] = useState(false);
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    setItems(read<CartItem[]>(CART_KEY) ?? []);
    setAuth(read<Auth>(AUTH_KEY));
    hydrated.current = true;

    const params = new URLSearchParams(window.location.search);

    if (params.get("purchase") === "success") {
      setItems([]);
      setAuth(null);
      write(CART_KEY, null);
      write(AUTH_KEY, null);
      params.delete("purchase");
      cleanUrl(params);
      return;
    }

    const ident = params.get("cfx");
    if (ident) {
      params.delete("cfx");
      cleanUrl(params);
      setAuthPending(true);
      fetch(`/api/basket/status?ident=${encodeURIComponent(ident)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.authenticated) {
            const next = { ident, username: data.username || "FiveM player" };
            setAuth(next);
            write(AUTH_KEY, next);
            setOpen(true);
          }
        })
        .catch(() => {})
        .finally(() => setAuthPending(false));
    }
  }, []);

  useEffect(() => {
    if (hydrated.current) write(CART_KEY, items);
  }, [items]);

  // lock page scroll while the drawer is open
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const add = useCallback((p: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === p.id)) return prev; // licences are one per buyer
      return [
        ...prev,
        { id: p.id, slug: p.slug, name: p.name, image: p.image, price: p.price, currency: p.currency, qty: 1 }
      ];
    });
    setJustAdded(p.id);
    setError(null);
    setStatus("idle");
    setOpen(true);
  }, []);

  const remove = useCallback((id: number) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const logout = useCallback(() => {
    setAuth(null);
    write(AUTH_KEY, null);
  }, []);

  const login = useCallback(async () => {
    if (!TOKEN) {
      setStatus("error");
      setError("Login and checkout go live once the store is connected to Tebex — this is the preview.");
      setOpen(true);
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const origin = window.location.origin;
      let ident: string | undefined;
      let authUrl: string | null = null;

      // Preferred: create the basket in the browser so Tebex sees the buyer's
      // real IP (it decides the VAT region from it).
      try {
        const b = await fetch(`${BASE}/accounts/${TOKEN}/baskets`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            complete_url: `${origin}/?purchase=success`,
            cancel_url: `${origin}/?purchase=cancelled`,
            complete_auto_redirect: true
          })
        });
        if (!b.ok) throw new Error();
        ident = (await b.json()).data.ident as string;
        const a = await fetch(
          `${BASE}/accounts/${TOKEN}/baskets/${ident}/auth?returnUrl=${encodeURIComponent(`${origin}/?cfx=${ident}`)}`,
          { headers: { Accept: "application/json" } }
        );
        if (!a.ok) throw new Error();
        const providers = (await a.json()) as { url?: string }[];
        authUrl = providers?.[0]?.url ?? null;
      } catch {
        // Blocked by an extension or network hiccup — fall back to our server.
        const res = await fetch("/api/basket", { method: "POST" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not start checkout.");
        ident = data.ident;
        authUrl = data.authUrl ?? null;
      }

      if (!ident) throw new Error("Could not start checkout. Please try again.");

      if (authUrl) {
        window.location.href = authUrl;
        return;
      }
      const next = { ident, username: "Guest" };
      setAuth(next);
      write(AUTH_KEY, next);
      setStatus("idle");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Could not start login.");
    }
  }, []);

  const checkout = useCallback(async () => {
    if (!items.length) return;
    if (!TOKEN) {
      setStatus("error");
      setError("Checkout goes live once the store is connected to Tebex — this is the preview.");
      return;
    }
    if (!auth) return login();

    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/basket/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ident: auth.ident, items: items.map((i) => ({ id: i.id, qty: i.qty })) })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.needsAuth || res.status === 401) {
          logout();
          throw new Error("Your Cfx.re session expired — please log in again.");
        }
        throw new Error(data.error || "Checkout failed.");
      }
      window.location.href = data.checkoutUrl || `https://checkout.tebex.io/checkout/${auth.ident}`;
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }, [items, auth, login, logout]);

  const value = useMemo<CartValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
      currency: items[0]?.currency ?? "EUR",
      isOpen,
      status,
      error,
      demo: !TOKEN,
      auth,
      authPending,
      justAdded,
      has: (id) => items.some((i) => i.id === id),
      open: () => setOpen(true),
      close: () => {
        setOpen(false);
        setJustAdded(null);
      },
      add,
      remove,
      clear,
      login,
      logout,
      checkout
    }),
    [items, isOpen, status, error, auth, authPending, justAdded, add, remove, clear, login, logout, checkout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

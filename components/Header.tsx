"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import type { Category } from "@/lib/types";
import { useCart } from "./CartProvider";
import { Logo } from "./Logo";
import { Cart, ChevronDown, Close, Discord, LogIn, Menu, User } from "./icons";

export function Header({ categories }: { categories: Category[] }) {
  const { count, open, auth, login, authPending } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const vehicles = categories.filter((c) => c.slug !== "bundles");
  const hasBundles = categories.some((c) => c.slug === "bundles");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setDrop(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const link = "rounded-md px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-white";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || menu ? "border-b border-line bg-night/90 backdrop-blur-xl" : "border-b border-transparent bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Logo priority className="h-[22px] sm:h-[26px]" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <a href="/#top" className={`${link} bg-white/10 text-white`}>
            Home
          </a>

          <div ref={dropRef} className="relative">
            <button
              type="button"
              onClick={() => setDrop((v) => !v)}
              aria-expanded={drop}
              className={`${link} flex items-center gap-1.5`}
            >
              Vehicles
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drop ? "rotate-180" : ""}`} />
            </button>
            {drop && (
              <div className="absolute left-0 top-full mt-2 w-56 animate-pop-in overflow-hidden rounded-lg border border-line bg-panel p-1.5 shadow-2xl shadow-black/60">
                {vehicles.map((c) => (
                  <a
                    key={c.slug}
                    href={`/#cat-${c.slug}`}
                    onClick={() => setDrop(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {hasBundles && (
            <a href="/#cat-bundles" className={link}>
              Bundles
            </a>
          )}
          <a href="/#faq" className={link}>
            FAQ
          </a>
          <a href="/terms" className={link}>
            Terms
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={SITE.discord}
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
            className="hidden h-10 w-10 place-items-center rounded-md border border-white/15 text-zinc-300 transition hover:border-white/40 hover:text-white sm:grid"
          >
            <Discord className="h-[18px] w-[18px]" />
          </a>

          {auth ? (
            <button
              type="button"
              onClick={open}
              title={auth.username}
              className="hidden h-10 items-center gap-2 rounded-md border border-white/15 px-3 text-sm font-semibold text-white transition hover:border-white/40 sm:flex"
            >
              <User className="h-4 w-4 text-brand-400" />
              <span className="max-w-[9rem] truncate">{auth.username}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={login}
              disabled={authPending}
              className="hidden h-10 items-center gap-2 rounded-md border border-white/25 px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-black sm:flex"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          )}

          <button
            type="button"
            onClick={open}
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative grid h-10 w-10 place-items-center rounded-md bg-white text-black transition hover:bg-zinc-200"
          >
            <Cart className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white ring-2 ring-night">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
            aria-expanded={menu}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-white lg:hidden"
          >
            {menu ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-line bg-night/95 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6">
            {[
              ["Home", "/#top"],
              ...vehicles.map((c) => [c.name, `/#cat-${c.slug}`]),
              ...(hasBundles ? [["Bundles", "/#cat-bundles"]] : []),
              ["FAQ", "/#faq"],
              ["Terms", "/terms"]
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenu(false)}
                className="rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => (setMenu(false), auth ? open() : login())} className="btn-outline">
                <LogIn className="h-4 w-4" />
                {auth ? auth.username : "Login"}
              </button>
              <a href={SITE.discord} target="_blank" rel="noreferrer" className="btn-outline">
                <Discord className="h-4 w-4" />
                Discord
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

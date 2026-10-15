import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-400">404 · Wrong turn</p>
        <h1 className="mt-5 font-display text-5xl font-extrabold uppercase tracking-tight text-white sm:text-6xl">
          Dead end.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-zinc-400">This page moved, sold out or never existed.</p>
        <a href="/#featured" className="btn-white mt-8">
          Back to the store
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

export function LegalShell({
  eyebrow,
  title,
  updated,
  children
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-zinc-600">Last updated {updated}</p>
        <div className="legal mt-10 rounded-xl border border-line bg-panel p-6 text-[15px] sm:p-10">{children}</div>
      </div>
    </section>
  );
}

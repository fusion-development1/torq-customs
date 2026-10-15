export function Heading({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div>
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-400">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="mt-1.5 text-sm text-zinc-500">{sub}</p>}
    </div>
  );
}

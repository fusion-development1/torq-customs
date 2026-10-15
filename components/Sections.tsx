import { Heading } from "./Heading";
import { Bolt, Car, Layers, Wrench } from "./icons";

const WHY = [
  {
    Icon: Car,
    title: "Lore-friendly",
    text: "Designed to belong in Los Santos — cars that fit your server instead of standing out for the wrong reasons."
  },
  {
    Icon: Layers,
    title: "Built for servers",
    text: "Proper LODs and sensible texture sizes, so a full car meet doesn't tank anyone's frame rate."
  },
  {
    Icon: Wrench,
    title: "Full tuning",
    text: "Mod kits, liveries and extras that show up in Los Santos Customs — no extra scripts needed."
  },
  {
    Icon: Bolt,
    title: "Instant delivery",
    text: "Pay through Tebex and the car is in your Cfx.re Portal minutes later. Download it any time."
  }
];

export function WhyTorq() {
  return (
    <section id="why" className="scroll-mt-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Heading eyebrow="Why TORQ" title="Quality you can feel" sub="Every car is built to look right up close and run right on a busy server." />
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ Icon, title, text }) => (
            <div key={title} className="bg-panel p-6 sm:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-night text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-base font-bold uppercase tracking-wide text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Log in & pay", text: "Log in with your Cfx.re account and check out securely through Tebex." },
  { n: "02", title: "Download", text: "The vehicle appears under Granted Assets in your Cfx.re Portal." },
  { n: "03", title: "Ensure & drive", text: "Drop it into resources, add one line to server.cfg, restart." }
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-36">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid gap-6 rounded-xl border border-line bg-panel p-6 sm:p-8 lg:grid-cols-[0.9fr_2fr] lg:items-center lg:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">How it works</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
              Checkout to car park in minutes.
            </h3>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-lg border border-line bg-night/60 p-5">
                <span className="font-display text-sm font-extrabold text-brand-500">{s.n}</span>
                <p className="mt-2 font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

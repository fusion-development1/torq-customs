import { SITE } from "@/lib/site";
import { Heading } from "./Heading";
import { Plus } from "./icons";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "Which frameworks do the cars work with?",
    a: "All of them. Every vehicle is a standalone resource — no framework, no SQL, no dependencies. ESX, QBCore, QBox, vRP or no framework at all."
  },
  {
    q: "How do I receive my vehicle?",
    a: "You log in with your Cfx.re account at checkout. A few minutes after paying, the vehicle appears under Granted Assets in the Cfx.re Portal (portal.cfx.re), where you download it — as many times as you need."
  },
  {
    q: "Are the files encrypted?",
    a: "Models and textures are protected by Cfx.re asset escrow, so they only run on servers owned by the account that bought them. The .meta files stay open, so you can change handling, names and prices."
  },
  {
    q: "Will it affect my server's performance?",
    a: "Every car ships with LODs and optimised textures. The stream size of each vehicle is listed in its description, so you know exactly what you're adding."
  },
  {
    q: "Can I get a refund?",
    a: "Vehicles are digital goods delivered instantly, so purchases are final once delivered. If something is broken and we can't fix it, you get your money back — see the refund policy."
  },
  {
    q: "Do you take custom orders?",
    a: `Custom liveries, server-branded versions and one-off builds — open a ticket on our Discord (${SITE.discord.replace(/^https?:\/\//, "")}).`
  }
];

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ITEMS.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))
  };

  return (
    <section id="faq" className="scroll-mt-36 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.6fr]">
        <div>
          <Heading eyebrow="Support" title="FAQ" sub="Everything you need to know before you buy." />
          <a href={SITE.discord} target="_blank" rel="noreferrer" className="btn-outline mt-6">
            Still stuck? Ask on Discord
          </a>
        </div>
        <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />
          {ITEMS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left transition hover:bg-white/[0.02] sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="text-[15px] font-semibold text-white">{item.q}</span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line text-zinc-400 transition group-open:rotate-45 group-open:border-white/30 group-open:text-white">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400 sm:px-6 sm:pr-16">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

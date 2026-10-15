import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Refund policy" };

export default function RefundsPage() {
  return (
    <LegalShell eyebrow="Legal" title="Refund policy" updated="15 October 2026">
      <h2>Digital goods, delivered instantly</h2>
      <p>
        Every vehicle is a digital product that is delivered to your Cfx.re account right after payment. By
        completing checkout you agree that delivery starts immediately and that, once delivered, the purchase is
        final.
      </p>
      <h2>When you do get a refund</h2>
      <ul>
        <li>The vehicle does not work as described and we cannot fix it within a reasonable time.</li>
        <li>You were charged twice for the same vehicle.</li>
        <li>You bought a pack and already owned every vehicle in it — we&apos;ll sort that out.</li>
      </ul>
      <h2>How to ask</h2>
      <p>
        Open a ticket on <a href={SITE.discord} target="_blank" rel="noreferrer">Discord</a> or write to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your Tebex transaction ID. Approved refunds are
        issued through Tebex to the original payment method.
      </p>
      <h2>Chargebacks</h2>
      <p>
        Please talk to us first. Opening a chargeback without contacting support removes access to the purchased
        vehicles and may block future purchases through Tebex.
      </p>
    </LegalShell>
  );
}

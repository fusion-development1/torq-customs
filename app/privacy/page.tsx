import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="Legal" title="Privacy policy" updated="15 October 2026">
      <h2>The short version</h2>
      <p>
        This site does not run ads, trackers or analytics cookies. Payments and the personal data they need are
        handled by Tebex, not by us.
      </p>
      <h2>What this site stores</h2>
      <ul>
        <li>Your cart and login state, in your own browser (localStorage). Nothing is sent to us.</li>
        <li>Standard server logs kept by our hosting provider for security, for a short period.</li>
      </ul>
      <h2>What Tebex and Cfx.re process</h2>
      <p>
        When you check out, you log in with your Cfx.re account and pay through Tebex. Tebex processes your name,
        email, billing country and payment details as merchant of record — see the{" "}
        <a href="https://tebex.io/privacy" target="_blank" rel="noreferrer">Tebex privacy policy</a>. We receive your
        Cfx.re username and transaction details so we can deliver and support your purchase.
      </p>
      <h2>Recent purchases shown on the site</h2>
      <p>
        The store shows recent purchases (Cfx.re username and the product bought) and the month&apos;s top customer.
        If you&apos;d rather not appear there, message us and we&apos;ll hide your name.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask what we hold about you, or ask us to delete it, at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalShell>
  );
}

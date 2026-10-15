import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <LegalShell eyebrow="Legal" title="Terms of service" updated="15 October 2026">
      <h2>1. Who sells to you</h2>
      <p>
        Products on this site are sold through Tebex Limited, which acts as reseller and merchant of record. Your
        payment, invoice and sales tax are handled by Tebex under their own{" "}
        <a href="https://checkout.tebex.io/terms" target="_blank" rel="noreferrer">checkout terms</a>. {SITE.name}{" "}
        creates and supports the vehicles.
      </p>
      <h2>2. What you buy</h2>
      <p>
        You buy a licence to use the vehicle on FiveM servers owned by the Cfx.re account that made the purchase.
        The licence is personal and non-transferable. Vehicles are delivered through Cfx.re asset escrow.
      </p>
      <h2>3. What you may do</h2>
      <ul>
        <li>Use the vehicle on your own servers, including commercial ones.</li>
        <li>Edit the open configuration files — handling, names, prices, liveries.</li>
        <li>Show the vehicle in videos and streams.</li>
      </ul>
      <h2>4. What you may not do</h2>
      <ul>
        <li>Resell, share, leak or re-upload the vehicle or any part of it.</li>
        <li>Remove, bypass or tamper with asset escrow protection.</li>
        <li>Use models or textures in other games, packs or products.</li>
      </ul>
      <p>Breaking these rules ends the licence without a refund and may lead to removal of access by Cfx.re.</p>
      <h2>5. Updates and support</h2>
      <p>
        Fixes and updates are delivered free of charge through the Cfx.re Portal for as long as the vehicle is
        offered. Support is provided on Discord.
      </p>
      <h2>6. Liability</h2>
      <p>
        Vehicles are provided as-is for use with FiveM. We are not responsible for conflicts with third-party
        resources or for changes made by Rockstar Games or Cfx.re to the platform.
      </p>
      <h2>7. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalShell>
  );
}

import { existsSync } from "node:fs";
import { join } from "node:path";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowItWorks, WhyTorq } from "@/components/Sections";
import { StoreFront } from "@/components/StoreFront";
import { getCatalog } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { getSocialData } from "@/lib/social";

export const revalidate = 120;

export default async function HomePage() {
  const [{ products, categories, source, unavailable }, social] = await Promise.all([getCatalog(), getSocialData()]);
  const heroImage = existsSync(join(process.cwd(), "public", SITE.heroImage)) ? SITE.heroImage : null;
  const demo = source === "demo";

  return (
    <>
      <Hero image={heroImage} topCustomer={social.topCustomer} discordOnline={social.discordOnline} />
      <StoreFront products={products} categories={categories} purchases={social.purchases} demo={demo} unavailable={unavailable}>
        <WhyTorq />
        <HowItWorks />
        <Faq />
      </StoreFront>
    </>
  );
}

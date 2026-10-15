import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    ...["terms", "refunds", "privacy"].map((p) => ({ url: `${SITE.url}/${p}`, lastModified: now, priority: 0.2 }))
  ];
}

import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Marquee } from "@/components/Marquee";
import { getCatalog } from "@/lib/catalog";
import { SITE } from "@/lib/site";

const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const display = Sora({ subsets: ["latin", "latin-ext"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "FiveM cars",
    "FiveM vehicles",
    "lore-friendly cars",
    "FiveM add-on vehicles",
    "GTA V add-on cars",
    "FiveM car pack",
    "ESX cars",
    "QBCore cars"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getCatalog();
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <CartProvider>
          <Marquee />
          <Header categories={categories} />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Category, Product, Purchase, TopCustomer } from "./types";

/**
 * Preview content — only used while no Tebex token is configured.
 * Products are deliberately generic slots: images and descriptions come from
 * Tebex once the store is connected.
 */

export const DEMO_CATEGORIES: Category[] = [
  { slug: "supercars", name: "Supercars" },
  { slug: "sports", name: "Sports" },
  { slug: "jdm", name: "JDM" },
  { slug: "emergency", name: "Emergency" },
  { slug: "bundles", name: "Bundles" }
];

const details = `
<h3>Features</h3>
<ul>
  <li>High-quality exterior and fully detailed interior</li>
  <li>Custom handling, tuned for FiveM</li>
  <li>Full mod kit — bumpers, spoilers, skirts, wheels and more</li>
  <li>Liveries plus a livery template</li>
  <li>Optimised LODs for smooth performance on busy servers</li>
</ul>
<h3>Details</h3>
<ul>
  <li><strong>Framework:</strong> standalone — works with ESX, QBCore and QBox</li>
  <li><strong>Delivery:</strong> instantly to your Cfx.re Portal (Granted Assets)</li>
  <li><strong>Escrow:</strong> models protected, .meta files open to edit</li>
</ul>`;

const car = (intro: string) => `<p>${intro}</p>${details}`;

function p(
  id: number,
  name: string,
  categorySlug: string,
  price: number,
  tagline: string,
  extra: Partial<Product> = {}
): Product {
  const category = DEMO_CATEGORIES.find((c) => c.slug === categorySlug)!.name;
  return {
    id,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name,
    tagline,
    category,
    categorySlug,
    price,
    currency: "EUR",
    image: null,
    gallery: [],
    descriptionHtml: car(tagline),
    disableQty: true,
    ...extra
  };
}

export const DEMO_PRODUCTS: Product[] = [
  p(2001, "Supercar 01", "supercars", 29.99, "Lore-friendly supercar with a detailed interior, full tuning and liveries.", {
    featured: true,
    isNew: true
  }),
  p(2002, "Supercar 02", "supercars", 26.99, "Mid-engine lore-friendly supercar, tuned to stay planted at speed."),
  p(2003, "Supercar 03", "supercars", 27.99, "Track-focused hypercar with active aero extras and carbon parts."),
  p(2004, "Supercar 04", "supercars", 24.99, "Grand tourer with a long hood, two seats and a big soundtrack.", { basePrice: 29.99 }),

  p(2005, "Sports 01", "sports", 21.99, "Everyday sports car with sharp handling and a full mod kit."),
  p(2006, "Sports 02", "sports", 19.99, "Lightweight sports coupe with custom sound and liveries.", { isNew: true }),
  p(2007, "Sports 03", "sports", 18.99, "Hot hatch that punches above its weight on twisty roads."),
  p(2008, "Sports 04", "sports", 21.99, "Four-door sports saloon — family car on paper, not on track."),

  p(2009, "JDM 01", "jdm", 19.99, "Lore-friendly JDM coupe built for street meets and drift servers.", { featured: true }),
  p(2010, "JDM 02", "jdm", 17.99, "Tuner hatchback with wide-body kit, wings and a drift handling preset."),
  p(2011, "JDM 03", "jdm", 18.99, "Turbo sedan with rally roots, AWD grip and a big wing option."),
  p(2012, "JDM 04", "jdm", 16.99, "Kei-sized roadster — small, light and endlessly tunable."),

  p(2013, "Emergency 01", "emergency", 24.99, "Pursuit vehicle with lightbar, extras and department liveries."),
  p(2014, "Emergency 02", "emergency", 24.99, "Unmarked interceptor with slicktop and push-bar extras."),
  p(2015, "Emergency 03", "emergency", 22.99, "Ambulance with working interior, stretcher extras and EMS liveries."),
  p(2016, "Emergency 04", "emergency", 23.99, "Fire-rescue SUV with lightbar, equipment rack and liveries.", { isNew: true }),

  bundle(2017, "Starter Bundle", 49.99, 69.97, ["Supercar 01", "Sports 01", "JDM 01"], "Three of our best-selling cars in one pack.", true),
  bundle(2018, "Supercar Pack", 89.99, 109.96, ["Supercar 01", "Supercar 02", "Supercar 03", "Supercar 04"], "Every supercar in the garage, one checkout."),
  bundle(2019, "JDM Pack", 59.99, 73.96, ["JDM 01", "JDM 02", "JDM 03", "JDM 04"], "The full JDM lineup for your street-meet server."),
  bundle(2020, "Emergency Pack", 79.99, 95.96, ["Emergency 01", "Emergency 02", "Emergency 03", "Emergency 04"], "Police, EMS and fire — a complete emergency fleet.")
];

function bundle(id: number, name: string, price: number, basePrice: number, includes: string[], tagline: string, featured = false): Product {
  return {
    ...p(id, name, "bundles", price, tagline, { basePrice, featured }),
    descriptionHtml: `<p>${tagline}</p>
<h3>Includes</h3>
<ul>${includes.map((i) => `<li>${i}</li>`).join("")}</ul>
<h3>Details</h3>
<ul><li><strong>Delivery:</strong> every vehicle lands in your Cfx.re Portal at once</li><li><strong>Updates:</strong> free, for every vehicle in the pack</li></ul>`
  };
}

/** Preview data for the purchase popup and top-customer card — demo mode only. */
export const DEMO_PURCHASES: Purchase[] = [
  { buyer: "NightDriver", productId: 2001, product: "Supercar 01" },
  { buyer: "kuba_rp", productId: 2009, product: "JDM 01" },
  { buyer: "LS_Viktor", productId: 2017, product: "Starter Bundle" },
  { buyer: "maxv", productId: 2013, product: "Emergency 01" },
  { buyer: "Lukyy", productId: 2006, product: "Sports 02" }
];

export const DEMO_TOP_CUSTOMER: TopCustomer = { name: "NightDriver", total: 132.6, currency: "EUR" };

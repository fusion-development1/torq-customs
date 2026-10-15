export interface Product {
  /** Tebex package id (demo ids in demo mode). */
  id: number;
  slug: string;
  name: string;
  /** One line for cards — first sentence of the description. */
  tagline: string;
  category: string;
  categorySlug: string;
  price: number;
  /** Price before discount, when on sale. */
  basePrice?: number;
  currency: string;
  /** Main image (Tebex package image). */
  image: string | null;
  /** Every image of the package (Tebex media). */
  gallery: string[];
  /** Package description from Tebex (HTML, sanitised). */
  descriptionHtml: string;
  featured?: boolean;
  isNew?: boolean;
  /** Tebex locks quantity for licences. */
  disableQty: boolean;
}

export interface Category {
  slug: string;
  name: string;
}

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  price: number;
  currency: string;
  qty: number;
}

/** One real purchase, as shown in the bottom-left popup. */
export interface Purchase {
  buyer: string;
  productId: number | null;
  product: string;
}

export interface TopCustomer {
  name: string;
  total: number;
  currency: string;
}

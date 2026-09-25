import { ProductDetail, StockStatus } from '../catalog.model';

const SCHEMA_AVAILABILITY: Record<StockStatus, string> = {
  available: 'https://schema.org/InStock',
  incoming: 'https://schema.org/BackOrder',
  out_of_stock: 'https://schema.org/OutOfStock',
};

export interface BreadcrumbEntry {
  readonly name: string;
  readonly url: string;
}

/** schema.org Product (requirements 5.2: name, sku, brand, image, offers). */
export function buildProductJsonLd(product: ProductDetail, origin: string, pageUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.description,
    brand: { '@type': 'Brand', name: product.brand },
    image: product.gallery.map((path) => `${origin}/${path}`),
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      price: product.priceUsd.toFixed(2),
      priceCurrency: 'USD',
      availability: SCHEMA_AVAILABILITY[product.stockStatus],
    },
  };
}

export function buildBreadcrumbJsonLd(entries: readonly BreadcrumbEntry[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.url,
    })),
  };
}

import { Product } from './catalog.model';

export function buildWhatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** wa.me link with the product name and SKU prefilled (requirements 5.2). */
export function buildProductWhatsappUrl(number: string, product: Pick<Product, 'name' | 'sku'>): string {
  return buildWhatsappUrl(
    number,
    `Hola, quiero información sobre el producto ${product.name} (SKU: ${product.sku}).`,
  );
}

/** wa.me link for a search term that returned no results. */
export function buildSearchWhatsappUrl(number: string, term: string): string {
  return buildWhatsappUrl(
    number,
    term
      ? `Hola, busco la referencia "${term}" y no la encontré en el catálogo.`
      : 'Hola, necesito ayuda para encontrar un producto.',
  );
}

import { Injectable } from '@angular/core';
import { Category, Product, ProductDetail, Subcategory } from '../catalog.model';
import {
  CATEGORIES,
  EXCHANGE_RATE_DATE,
  FEATURED_SKUS,
  PRODUCTS,
  SITE_ORIGIN,
  SUBCATEGORIES,
  WHATSAPP_NUMBER,
} from './catalog.data';
import { PRODUCT_DETAILS } from './product-details.data';

const MAX_RELATED = 8;

/** Mock data access. In the real platform this is replaced by API calls. */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly exchangeRateDate = EXCHANGE_RATE_DATE;
  readonly whatsappNumber = WHATSAPP_NUMBER;
  readonly siteOrigin = SITE_ORIGIN;

  getProducts(): readonly Product[] {
    return PRODUCTS;
  }

  getCategories(): readonly Category[] {
    return CATEGORIES;
  }

  getSubcategories(categorySlug?: string): readonly Subcategory[] {
    return categorySlug
      ? SUBCATEGORIES.filter((sub) => sub.categorySlug === categorySlug)
      : SUBCATEGORIES;
  }

  getSubcategory(slug: string): Subcategory | undefined {
    return SUBCATEGORIES.find((sub) => sub.slug === slug);
  }

  getBrands(): readonly string[] {
    return [...new Set(PRODUCTS.map((product) => product.brand))].sort((a, b) =>
      a.localeCompare(b, 'es'),
    );
  }

  countBy(field: 'categorySlug' | 'subcategorySlug' | 'brand', value: string): number {
    return PRODUCTS.filter((product) => product[field] === value).length;
  }

  /** First sentence of the product description, for listing layouts that show context. */
  getSummary(sku: string): string {
    const description = PRODUCT_DETAILS[sku]?.description ?? '';
    const end = description.indexOf('. ');
    return end === -1 ? description : description.slice(0, end + 1);
  }

  getFeatured(): readonly Product[] {
    return PRODUCTS.filter((product) => FEATURED_SKUS.includes(product.sku));
  }

  /** Returns undefined for unknown or inactive products (the page answers 404). */
  getBySlug(slug: string): ProductDetail | undefined {
    const product = PRODUCTS.find((item) => item.slug === slug);
    const extra = product && PRODUCT_DETAILS[product.sku];
    const category = product && CATEGORIES.find((item) => item.slug === product.categorySlug);
    if (!product || !extra || !category) return undefined;

    return {
      ...product,
      ...extra,
      category,
      gallery: [product.image, ...extra.gallery],
    };
  }

  /** Same subcategory, then same category, then same brand; max 8 (requirements 5.2). */
  getRelated(product: Product): readonly Product[] {
    const others = PRODUCTS.filter((item) => item.sku !== product.sku);
    const ranked = [
      ...others.filter((item) => item.subcategorySlug === product.subcategorySlug),
      ...others.filter(
        (item) =>
          item.categorySlug === product.categorySlug &&
          item.subcategorySlug !== product.subcategorySlug,
      ),
      ...others.filter(
        (item) => item.brand === product.brand && item.categorySlug !== product.categorySlug,
      ),
    ];
    return ranked.slice(0, MAX_RELATED);
  }
}

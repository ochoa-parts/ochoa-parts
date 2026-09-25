import {
  CatalogCriteria,
  Category,
  Facet,
  Product,
  SortOption,
  StockStatus,
  Subcategory,
} from '../catalog.model';

/**
 * Client-side search for the prototype only. The real platform resolves this
 * server-side with Postgres FTS + pg_trgm (requirements 5.3).
 */

type FacetKey = 'category' | 'subcategory' | 'brand' | 'stock';

const STOCK_ORDER: Record<StockStatus, number> = { available: 0, incoming: 1, out_of_stock: 2 };

export const STOCK_LABELS: Record<StockStatus, string> = {
  available: 'Disponible',
  incoming: 'Por llegar',
  out_of_stock: 'Agotado',
};

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

/** Strips separators so "3051-cd" matches "3051CD". */
function compact(value: string): string {
  return normalize(value).replace(/[\s.\-_/]/g, '');
}

/** Relevance score: exact SKU > partial SKU > name > brand. 0 means no match. */
export function scoreProduct(product: Product, rawQuery: string): number {
  const query = normalize(rawQuery);
  if (!query) return 1;

  const sku = compact(product.sku);
  const compactQuery = compact(rawQuery);
  if (sku === compactQuery) return 100;
  if (sku.startsWith(compactQuery)) return 80;
  if (sku.includes(compactQuery)) return 70;

  const name = normalize(product.name);
  if (name.includes(query)) return 50;

  const haystack = `${name} ${normalize(product.brand)} ${sku}`;
  const tokens = query.split(/\s+/);
  return tokens.every((token) => haystack.includes(token)) ? 30 : 0;
}

export function rankProducts(products: readonly Product[], query: string): Product[] {
  return products
    .map((product) => ({ product, score: scoreProduct(product, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product);
}

/** Applies every criterion except `omit`, so facet counts reflect the other active filters. */
export function applyCriteria(
  products: readonly Product[],
  criteria: CatalogCriteria,
  omit?: FacetKey,
): Product[] {
  return rankProducts(products, criteria.query).filter(
    (product) =>
      (omit === 'category' || !criteria.category || product.categorySlug === criteria.category) &&
      (omit === 'subcategory' ||
        !criteria.subcategory ||
        product.subcategorySlug === criteria.subcategory) &&
      (omit === 'brand' || !criteria.brands.length || criteria.brands.includes(product.brand)) &&
      (omit === 'stock' || !criteria.stock.length || criteria.stock.includes(product.stockStatus)) &&
      (criteria.priceMin == null || product.priceUsd >= criteria.priceMin) &&
      (criteria.priceMax == null || product.priceUsd <= criteria.priceMax),
  );
}

export function sortProducts(products: readonly Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.priceUsd - b.priceUsd);
    case 'price_desc':
      return sorted.sort((a, b) => b.priceUsd - a.priceUsd);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    case 'availability':
      return sorted.sort((a, b) => STOCK_ORDER[a.stockStatus] - STOCK_ORDER[b.stockStatus]);
    default:
      return sorted; // Already ranked by relevance.
  }
}

export function buildCategoryFacets(
  products: readonly Product[],
  categories: readonly Category[],
  criteria: CatalogCriteria,
): Facet[] {
  const base = applyCriteria(products, criteria, 'category');
  return categories.map((category) => ({
    value: category.slug,
    label: category.name,
    count: base.filter((product) => product.categorySlug === category.slug).length,
  }));
}

/** Subcategories of the active category (all of them when no category is selected). */
export function buildSubcategoryFacets(
  products: readonly Product[],
  subcategories: readonly Subcategory[],
  criteria: CatalogCriteria,
): Facet[] {
  const base = applyCriteria(products, criteria, 'subcategory');
  return subcategories
    .filter((sub) => !criteria.category || sub.categorySlug === criteria.category)
    .map((sub) => ({
      value: sub.slug,
      label: sub.name,
      count: base.filter((product) => product.subcategorySlug === sub.slug).length,
    }));
}

export function buildBrandFacets(
  products: readonly Product[],
  brands: readonly string[],
  criteria: CatalogCriteria,
): Facet[] {
  const base = applyCriteria(products, criteria, 'brand');
  return brands.map((brand) => ({
    value: brand,
    label: brand,
    count: base.filter((product) => product.brand === brand).length,
  }));
}

export function buildStockFacets(products: readonly Product[], criteria: CatalogCriteria): Facet[] {
  const base = applyCriteria(products, criteria, 'stock');
  return (Object.keys(STOCK_LABELS) as StockStatus[]).map((status) => ({
    value: status,
    label: STOCK_LABELS[status],
    count: base.filter((product) => product.stockStatus === status).length,
  }));
}

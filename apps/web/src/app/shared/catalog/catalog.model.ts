export type StockStatus = 'available' | 'out_of_stock' | 'incoming';

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'name' | 'availability';

export interface Category {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
}

export interface Subcategory {
  readonly slug: string;
  readonly categorySlug: string;
  readonly name: string;
}

export interface Product {
  readonly sku: string;
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly categorySlug: string;
  readonly subcategorySlug: string;
  readonly priceUsd: number;
  /**
   * Bolivar equivalent as delivered by the API. The browser never computes it
   * (requirements 2.1): it only formats the value it receives.
   */
  readonly priceBs: number;
  readonly stockStatus: StockStatus;
  readonly image: string;
}

export type ProductFileType = 'datasheet' | 'manual';

export interface ProductFile {
  readonly type: ProductFileType;
  readonly name: string;
  readonly sizeLabel: string;
}

export interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

/** Fields only loaded on the product page (heavier than the listing payload). */
export interface ProductDetailExtra {
  readonly description: string;
  readonly specs: readonly ProductSpec[];
  readonly gallery: readonly string[];
  readonly files: readonly ProductFile[];
  readonly stockQty: number;
}

export interface ProductDetail extends Product, ProductDetailExtra {
  readonly category: Category;
}

export interface CatalogCriteria {
  readonly query: string;
  readonly category: string | null;
  readonly subcategory?: string | null;
  readonly brands: readonly string[];
  readonly stock: readonly StockStatus[];
  /** Optional USD price range (requirements 5.3). */
  readonly priceMin?: number | null;
  readonly priceMax?: number | null;
}

export interface Facet {
  readonly value: string;
  readonly label: string;
  readonly count: number;
}

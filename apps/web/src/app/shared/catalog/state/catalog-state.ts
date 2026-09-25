import { Signal, WritableSignal, computed, linkedSignal, signal } from '@angular/core';
import {
  CatalogCriteria,
  Category,
  Facet,
  Product,
  SortOption,
  StockStatus,
  Subcategory,
} from '../catalog.model';
import {
  applyCriteria,
  buildBrandFacets,
  buildCategoryFacets,
  buildStockFacets,
  buildSubcategoryFacets,
  sortProducts,
} from '../utils/product-search';

/** Router-bound query params that seed the initial state (?q, ?cat, ?sub, ?brand). */
export interface CatalogStateSeed {
  readonly q: Signal<string | undefined>;
  readonly cat: Signal<string | undefined>;
  readonly brand: Signal<string | undefined>;
  readonly sub?: Signal<string | undefined>;
}

export interface CatalogStateSource {
  readonly products: readonly Product[];
  readonly categories: readonly Category[];
  readonly brands: readonly string[];
  readonly subcategories?: readonly Subcategory[];
}

export const SORT_CHOICES: readonly { readonly value: SortOption; readonly label: string }[] = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre' },
  { value: 'availability', label: 'Disponibilidad' },
];

/**
 * Catalog search/filter/sort state shared by every proposal's catalog page.
 * Pages only render it; the rules live here once.
 */
export class CatalogState {
  readonly query: WritableSignal<string>;
  readonly category: WritableSignal<string | null>;
  /** Resets when the category changes; seeded from ?sub only if it belongs to it. */
  readonly subcategory: WritableSignal<string | null>;
  readonly brands: WritableSignal<readonly string[]>;
  readonly stock = signal<readonly StockStatus[]>([]);
  readonly priceMin = signal<number | null>(null);
  readonly priceMax = signal<number | null>(null);
  readonly sort = signal<SortOption>('relevance');

  readonly criteria: Signal<CatalogCriteria>;
  readonly results: Signal<readonly Product[]>;
  readonly categoryFacets: Signal<readonly Facet[]>;
  readonly subcategoryFacets: Signal<readonly Facet[]>;
  readonly brandFacets: Signal<readonly Facet[]>;
  readonly stockFacets: Signal<readonly Facet[]>;
  readonly activeCategory: Signal<Category | null>;
  readonly activeSubcategory: Signal<Subcategory | null>;
  readonly activeFilterCount: Signal<number>;

  constructor(
    source: CatalogStateSource,
    seed: CatalogStateSeed,
  ) {
    this.query = linkedSignal(() => seed.q() ?? '');
    this.category = linkedSignal<string | null>(() => seed.cat() ?? null);
    const subcategories = source.subcategories ?? [];
    this.subcategory = linkedSignal({
      source: () => ({ cat: this.category(), sub: seed.sub?.() }),
      computation: ({ cat, sub }) =>
        sub && subcategories.some((item) => item.slug === sub && (!cat || item.categorySlug === cat))
          ? sub
          : null,
    });
    this.brands = linkedSignal<readonly string[]>(() => {
      const brand = seed.brand();
      return brand ? [brand] : [];
    });

    this.criteria = computed(() => ({
      query: this.query(),
      category: this.category(),
      subcategory: this.subcategory(),
      brands: this.brands(),
      stock: this.stock(),
      priceMin: this.priceMin(),
      priceMax: this.priceMax(),
    }));

    this.results = computed(() =>
      sortProducts(applyCriteria(source.products, this.criteria()), this.sort()),
    );
    this.categoryFacets = computed(() =>
      buildCategoryFacets(source.products, source.categories, this.criteria()),
    );
    this.subcategoryFacets = computed(() =>
      buildSubcategoryFacets(source.products, subcategories, this.criteria()),
    );
    this.brandFacets = computed(() =>
      buildBrandFacets(source.products, source.brands, this.criteria()),
    );
    this.stockFacets = computed(() => buildStockFacets(source.products, this.criteria()));

    this.activeCategory = computed(
      () => source.categories.find((item) => item.slug === this.category()) ?? null,
    );
    this.activeSubcategory = computed(
      () => subcategories.find((item) => item.slug === this.subcategory()) ?? null,
    );
    this.activeFilterCount = computed(
      () =>
        (this.category() ? 1 : 0) +
        (this.subcategory() ? 1 : 0) +
        this.brands().length +
        this.stock().length +
        (this.priceMin() != null || this.priceMax() != null ? 1 : 0),
    );
  }

  toggleCategory(slug: string): void {
    this.category.set(this.category() === slug ? null : slug);
  }

  toggleSubcategory(slug: string): void {
    this.subcategory.set(this.subcategory() === slug ? null : slug);
  }

  toggleBrand(brand: string): void {
    this.brands.update((list) => toggle(list, brand));
  }

  toggleStock(status: StockStatus): void {
    this.stock.update((list) => toggle(list, status));
  }

  setSort(value: string): void {
    this.sort.set(value as SortOption);
  }

  setPriceRange(min: number | null, max: number | null): void {
    this.priceMin.set(min);
    this.priceMax.set(max);
  }

  clearFilters(): void {
    this.category.set(null);
    this.subcategory.set(null);
    this.brands.set([]);
    this.stock.set([]);
    this.setPriceRange(null, null);
  }

  resetAll(): void {
    this.query.set('');
    this.clearFilters();
  }
}

function toggle<T>(list: readonly T[], value: T): readonly T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

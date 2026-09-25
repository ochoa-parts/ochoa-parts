import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { StockStatus } from '@shared/catalog/catalog.model';
import { CatalogState, SORT_CHOICES } from '@shared/catalog/state/catalog-state';
import { PRICE_RANGES } from '@shared/catalog/state/price-ranges';
import { buildSearchWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { ProductCardC } from '../../components/product-card-c/product-card-c';
import { ProductGroup, ProductTable } from '../../components/product-table/product-table';
import { PC_PATHS } from '../../proposal-c.paths';

/** Showroom catalog: brand/category banner, selector toolbar, photo grid or pro table view. */
@Component({
  selector: 'app-catalog-page-c',
  imports: [RouterLink, Icon, ProductCardC, ProductTable],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPageC {
  private readonly catalog = inject(CatalogService);

  /** Query params bound by the router: ?q, ?cat, ?sub, ?brand. */
  readonly q = input<string>();
  readonly cat = input<string>();
  readonly sub = input<string>();
  readonly brand = input<string>();

  protected readonly paths = PC_PATHS;
  protected readonly sortChoices = SORT_CHOICES;
  protected readonly priceRanges = PRICE_RANGES;
  protected readonly view = signal<'grid' | 'table'>('grid');
  private readonly products = this.catalog.getProducts();
  private readonly subcategories = this.catalog.getSubcategories();

  protected readonly state = new CatalogState(
    {
      products: this.products,
      categories: this.catalog.getCategories(),
      brands: this.catalog.getBrands(),
      subcategories: this.subcategories,
    },
    { q: this.q, cat: this.cat, brand: this.brand, sub: this.sub },
  );

  /** Single active brand drives the brand banner. */
  protected readonly activeBrand = computed(() =>
    this.state.brands().length === 1 ? this.state.brands()[0] : null,
  );

  protected readonly brandInfo = computed(() => {
    const brand = this.activeBrand();
    if (!brand) return null;
    const items = this.products.filter((product) => product.brand === brand);
    const categories = this.catalog
      .getCategories()
      .filter((category) => items.some((product) => product.categorySlug === category.slug));
    return { name: brand, count: items.length, image: items[0]?.image ?? '', categories };
  });

  protected readonly groups = computed<readonly ProductGroup[]>(() => {
    const results = this.state.results();
    return this.subcategories
      .map((sub) => ({
        title: sub.name,
        products: results.filter((product) => product.subcategorySlug === sub.slug),
      }))
      .filter((group) => group.products.length > 0);
  });

  protected readonly selectedStock = computed(() => this.state.stock()[0] ?? '');
  protected readonly priceRangeIndex = computed(() =>
    Math.max(
      0,
      this.priceRanges.findIndex(
        (range) => range.min === this.state.priceMin() && range.max === this.state.priceMax(),
      ),
    ),
  );
  protected readonly whatsappSearchUrl = computed(() =>
    buildSearchWhatsappUrl(this.catalog.whatsappNumber, this.state.query()),
  );

  protected onCategory(value: string): void {
    this.state.category.set(value || null);
  }

  protected onSubcategory(value: string): void {
    this.state.subcategory.set(value || null);
  }

  /** Toolbar selects are single-choice; the shared state supports multi-select. */
  protected onBrand(value: string): void {
    this.state.brands.set(value ? [value] : []);
  }

  protected onStock(value: string): void {
    this.state.stock.set(value ? [value as StockStatus] : []);
  }

  protected onPriceRange(index: string): void {
    const range = this.priceRanges[Number(index)] ?? this.priceRanges[0];
    this.state.setPriceRange(range.min, range.max);
  }
}

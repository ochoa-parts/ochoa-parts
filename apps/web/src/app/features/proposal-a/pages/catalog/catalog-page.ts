import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { CatalogState, SORT_CHOICES } from '@shared/catalog/state/catalog-state';
import { Icon } from '@shared/ui/icon/icon';
import { CatalogFilters } from '../../components/catalog-filters/catalog-filters';
import { ProductCard } from '../../components/product-card/product-card';
import { SearchBox } from '../../components/search-box/search-box';

@Component({
  selector: 'app-catalog-page',
  imports: [RouterLink, SearchBox, CatalogFilters, ProductCard, Icon],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPage {
  private readonly catalog = inject(CatalogService);

  /** Query params bound by the router (withComponentInputBinding): ?q=...&cat=...&brand=... */
  readonly q = input<string>();
  readonly cat = input<string>();
  readonly brand = input<string>();

  protected readonly products = this.catalog.getProducts();
  protected readonly categories = this.catalog.getCategories();
  protected readonly exchangeRateDate = this.catalog.exchangeRateDate;
  protected readonly sortChoices = SORT_CHOICES;
  protected readonly view = signal<'grid' | 'list'>('grid');

  private readonly state = new CatalogState(
    { products: this.products, categories: this.categories, brands: this.catalog.getBrands() },
    { q: this.q, cat: this.cat, brand: this.brand },
  );

  // Template-facing aliases of the shared state.
  protected readonly query = this.state.query;
  protected readonly category = this.state.category;
  protected readonly brands = this.state.brands;
  protected readonly stock = this.state.stock;
  protected readonly sort = this.state.sort;
  protected readonly results = this.state.results;
  protected readonly categoryFacets = this.state.categoryFacets;
  protected readonly brandFacets = this.state.brandFacets;
  protected readonly stockFacets = this.state.stockFacets;
  protected readonly activeCategoryName = computed(() => this.state.activeCategory()?.name ?? null);

  protected onSortChange(value: string): void {
    this.state.setSort(value);
  }

  protected selectCategory(slug: string): void {
    this.state.toggleCategory(slug);
  }

  protected resetAll(): void {
    this.state.resetAll();
  }
}

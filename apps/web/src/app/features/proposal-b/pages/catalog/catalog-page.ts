import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { StockStatus } from '@shared/catalog/catalog.model';
import { CatalogState, SORT_CHOICES } from '@shared/catalog/state/catalog-state';
import { PRICE_RANGES } from '@shared/catalog/state/price-ranges';
import { buildSearchWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { AdvisorCard } from '../../components/advisor-card/advisor-card';
import { FaqList } from '../../components/faq-list/faq-list';
import { ProductCardB } from '../../components/product-card-b/product-card-b';
import { ADVISORS, CATEGORY_GUIDES, CATEGORY_PHOTOS } from '../../data/proposal-b.content';
import { PB_PATHS } from '../../proposal-b.paths';

/** Category "hub": photo banner + selection guide + equipment types + chip filters + card grid. */
@Component({
  selector: 'app-catalog-page-b',
  imports: [RouterLink, Icon, ProductCardB, FaqList, AdvisorCard],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPageB {
  protected readonly catalog = inject(CatalogService);

  /** Query params bound by the router: ?q, ?cat, ?sub, ?brand. */
  readonly q = input<string>();
  readonly cat = input<string>();
  readonly sub = input<string>();
  readonly brand = input<string>();

  protected readonly paths = PB_PATHS;
  protected readonly sortChoices = SORT_CHOICES;
  protected readonly priceRanges = PRICE_RANGES;
  protected readonly photos = CATEGORY_PHOTOS;
  protected readonly advisor = ADVISORS[0];
  private readonly products = this.catalog.getProducts();

  protected readonly state = new CatalogState(
    {
      products: this.products,
      categories: this.catalog.getCategories(),
      brands: this.catalog.getBrands(),
      subcategories: this.catalog.getSubcategories(),
    },
    { q: this.q, cat: this.cat, brand: this.brand, sub: this.sub },
  );

  protected readonly guide = computed(() => {
    const category = this.state.activeCategory();
    return category ? (CATEGORY_GUIDES[category.slug] ?? null) : null;
  });

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

  /** Representative image for a subcategory tile (first product of that type). */
  protected subcategoryImage(slug: string): string | null {
    return this.products.find((product) => product.subcategorySlug === slug)?.image ?? null;
  }

  protected onPriceRange(index: string): void {
    const range = this.priceRanges[Number(index)] ?? this.priceRanges[0];
    this.state.setPriceRange(range.min, range.max);
  }

  protected toggleStock(value: string): void {
    this.state.toggleStock(value as StockStatus);
  }
}

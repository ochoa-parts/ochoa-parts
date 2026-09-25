import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { Icon } from '@shared/ui/icon/icon';
import { ProductCardC } from '../../components/product-card-c/product-card-c';
import { QuickOrder } from '../../components/quick-order/quick-order';
import { PC_PATHS } from '../../proposal-c.paths';

interface BrandTile {
  readonly name: string;
  readonly count: number;
  readonly image: string;
}

@Component({
  selector: 'app-landing-page-c',
  imports: [RouterLink, Icon, ProductCardC, QuickOrder],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageC {
  private readonly catalog = inject(CatalogService);
  private readonly router = inject(Router);

  protected readonly paths = PC_PATHS;
  protected readonly featured = this.catalog.getFeatured();
  private readonly products = this.catalog.getProducts();

  /** Brands ordered by catalog depth; the first one gets the large bento tile. */
  protected readonly brands: readonly BrandTile[] = this.catalog
    .getBrands()
    .map((name) => ({
      name,
      count: this.catalog.countBy('brand', name),
      image: this.products.find((product) => product.brand === name)?.image ?? '',
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'es'));

  protected readonly spotlightBrand = this.brands[0];
  protected readonly otherBrands = this.brands.slice(1);

  /** Marquee track: the list twice, so the CSS loop is seamless. */
  protected readonly marquee = [...this.brands, ...this.brands].map((brand) => brand.name);

  protected readonly categories = this.catalog.getCategories().map((category, index) => ({
    ...category,
    index: String(index + 1).padStart(2, '0'),
    count: this.catalog.countBy('categorySlug', category.slug),
  }));

  /** Category previewed on the pedestal (hover / focus). */
  protected readonly activeCategorySlug = signal(this.categories[0]?.slug ?? '');
  protected readonly activeCategory = computed(
    () => this.categories.find((category) => category.slug === this.activeCategorySlug()) ?? null,
  );

  protected readonly stats = [
    { value: '+200', label: 'marcas de fabricantes líderes' },
    { value: '+1.000', label: 'referencias con precio y stock' },
    { value: '3', label: 'países con presencia comercial' },
    { value: '6', label: 'métodos de pago verificados' },
  ] as const;

  protected search(term: string): void {
    const q = term.trim();
    void this.router.navigate([PC_PATHS.catalog], { queryParams: q ? { q } : {} });
  }
}

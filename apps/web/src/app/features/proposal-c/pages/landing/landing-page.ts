import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { Icon, IconName } from '@shared/ui/icon/icon';
import { ProductCardC } from '../../components/product-card-c/product-card-c';
import { QuickOrder } from '../../components/quick-order/quick-order';
import { PC_PATHS } from '../../proposal-c.paths';

interface TrustItem {
  readonly icon: IconName;
  readonly title: string;
  readonly text: string;
}

const QUICK_BRANDS = 5;

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

  /** Brand showroom tiles: name, product count and a representative photo. */
  protected readonly brands = this.catalog.getBrands().map((name) => ({
    name,
    count: this.catalog.countBy('brand', name),
    image: this.products.find((product) => product.brand === name)?.image ?? '',
  }));

  protected readonly quickBrands = this.brands.slice(0, QUICK_BRANDS);

  protected readonly categories = this.catalog.getCategories().map((category) => ({
    ...category,
    count: this.catalog.countBy('categorySlug', category.slug),
  }));

  protected readonly trust: readonly TrustItem[] = [
    { icon: 'award', title: '+200 marcas', text: 'Fabricantes líderes de instrumentación' },
    { icon: 'package', title: 'Stock visible', text: 'Existencia real en cada producto' },
    { icon: 'shield', title: 'Pago verificado', text: 'Zelle, pago móvil y transferencias' },
    { icon: 'file', title: 'Fichas técnicas', text: 'Datasheet y manual por referencia' },
  ];

  protected search(term: string): void {
    const q = term.trim();
    void this.router.navigate([PC_PATHS.catalog], { queryParams: q ? { q } : {} });
  }
}

import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { ProductSeo, buildProductCrumbs } from '@shared/catalog/seo/product-seo';
import { Icon } from '@shared/ui/icon/icon';
import { PA_PATHS } from '../../proposal-a.paths';
import { ProductBuyBox } from '../../components/product-buy-box/product-buy-box';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductGallery } from '@shared/ui/product-gallery/product-gallery';

@Component({
  selector: 'app-product-page',
  imports: [RouterLink, Icon, ProductGallery, ProductBuyBox, ProductCard],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductSeo],
})
export class ProductPage {
  private readonly catalog = inject(CatalogService);
  private readonly productSeo = inject(ProductSeo);

  /** Route param bound by the router (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly paths = PA_PATHS;
  protected readonly exchangeRateDate = this.catalog.exchangeRateDate;
  protected readonly whatsappNumber = this.catalog.whatsappNumber;

  protected readonly product = computed(() => this.catalog.getBySlug(this.slug()));
  protected readonly related = computed(() => {
    const product = this.product();
    return product ? this.catalog.getRelated(product) : this.catalog.getFeatured();
  });
  protected readonly crumbs = computed(() => {
    const product = this.product();
    return product ? buildProductCrumbs(product, PA_PATHS) : [];
  });

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) this.productSeo.apply(product, PA_PATHS);
      else this.productSeo.applyNotFound(PA_PATHS);
    });
  }
}

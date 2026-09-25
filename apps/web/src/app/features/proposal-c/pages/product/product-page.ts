import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { ProductSeo, buildProductCrumbs } from '@shared/catalog/seo/product-seo';
import { buildProductWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { ProductGallery } from '@shared/ui/product-gallery/product-gallery';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { ProductCardC } from '../../components/product-card-c/product-card-c';
import { PC_PATHS } from '../../proposal-c.paths';

const COPY_FEEDBACK_MS = 1800;
const MAX_CARDS = 4;

/** Showroom product page: dark brand header, big photo + buy box, specs and docs visible. */
@Component({
  selector: 'app-product-page-c',
  imports: [RouterLink, MoneyPipe, Icon, ProductGallery, StockBadge, ProductCardC],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductSeo],
})
export class ProductPageC {
  private readonly catalog = inject(CatalogService);
  private readonly productSeo = inject(ProductSeo);

  readonly slug = input.required<string>();

  protected readonly paths = PC_PATHS;
  protected readonly rateDate = this.catalog.exchangeRateDate;

  protected readonly product = computed(() => this.catalog.getBySlug(this.slug()));
  protected readonly crumbs = computed(() => {
    const product = this.product();
    return product ? buildProductCrumbs(product, PC_PATHS) : [];
  });
  protected readonly subcategory = computed(() => {
    const product = this.product();
    return product ? (this.catalog.getSubcategory(product.subcategorySlug) ?? null) : null;
  });
  /** Other products of the same brand (the showroom's main axis). */
  protected readonly sameBrand = computed(() => {
    const product = this.product();
    if (!product) return [];
    return this.catalog
      .getProducts()
      .filter((item) => item.brand === product.brand && item.sku !== product.sku)
      .slice(0, MAX_CARDS);
  });
  protected readonly related = computed(() => {
    const product = this.product();
    if (!product) return this.catalog.getFeatured();
    const brandSkus = new Set(this.sameBrand().map((item) => item.sku));
    return this.catalog
      .getRelated(product)
      .filter((item) => !brandSkus.has(item.sku))
      .slice(0, MAX_CARDS);
  });
  protected readonly whatsappUrl = computed(() => {
    const product = this.product();
    return product ? buildProductWhatsappUrl(this.catalog.whatsappNumber, product) : '';
  });

  /** "Copiado" feedback, reset when the product changes. */
  protected readonly copied = linkedSignal({ source: this.slug, computation: () => false });

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) this.productSeo.apply(product, PC_PATHS);
      else this.productSeo.applyNotFound(PC_PATHS);
    });
  }

  protected copySku(sku: string): void {
    // Runs only on user click (browser), never during SSR.
    void navigator.clipboard?.writeText(sku).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), COPY_FEEDBACK_MS);
    });
  }
}

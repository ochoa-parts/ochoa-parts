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
import { ProductDetail } from '@shared/catalog/catalog.model';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { ProductSeo, buildProductCrumbs } from '@shared/catalog/seo/product-seo';
import { buildProductWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { ProductCardC } from '../../components/product-card-c/product-card-c';
import { PC_PATHS } from '../../proposal-c.paths';

type RailMode = 'brand' | 'category';

const COPY_FEEDBACK_MS = 1800;
const KEY_SPECS = 4;
const MAX_RAIL = 8;

/**
 * Showroom product page: three clear columns (product info · product on a pedestal ·
 * purchase card), then the technical sheet and a "keep exploring" rail.
 */
@Component({
  selector: 'app-product-page-c',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge, ProductCardC],
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
  protected readonly keySpecs = computed(() => this.product()?.specs.slice(0, KEY_SPECS) ?? []);

  /** Gallery position and quantity; both reset when navigating to another product. */
  protected readonly activeImage = linkedSignal({ source: this.slug, computation: () => 0 });
  protected readonly quantity = linkedSignal({ source: this.slug, computation: () => 1 });
  protected readonly currentImage = computed(() => {
    const product = this.product();
    return product ? (product.gallery[this.activeImage()] ?? product.image) : '';
  });
  protected readonly maxQuantity = computed(() => Math.max(this.product()?.stockQty ?? 1, 1));

  protected readonly sameBrand = computed(() => {
    const product = this.product();
    if (!product) return [];
    return this.catalog
      .getProducts()
      .filter((item) => item.brand === product.brand && item.sku !== product.sku)
      .slice(0, MAX_RAIL);
  });
  protected readonly related = computed(() => {
    const product = this.product();
    if (!product) return this.catalog.getFeatured();
    const brandSkus = new Set(this.sameBrand().map((item) => item.sku));
    return this.catalog
      .getRelated(product)
      .filter((item) => !brandSkus.has(item.sku))
      .slice(0, MAX_RAIL);
  });

  /** Single "keep exploring" rail, switchable between same brand and same category. */
  protected readonly railMode = linkedSignal<ProductDetail | undefined, RailMode>({
    source: this.product,
    computation: () => (this.sameBrand().length ? 'brand' : 'category'),
  });
  protected readonly railItems = computed(() =>
    this.railMode() === 'brand' ? this.sameBrand() : this.related(),
  );

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

  protected changeQuantity(delta: number): void {
    this.quantity.update((qty) => Math.min(Math.max(qty + delta, 1), this.maxQuantity()));
  }

  protected copySku(sku: string): void {
    // Runs only on user click (browser), never during SSR.
    void navigator.clipboard?.writeText(sku).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), COPY_FEEDBACK_MS);
    });
  }
}

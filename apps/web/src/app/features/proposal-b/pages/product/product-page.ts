import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { ProductSeo, buildProductCrumbs } from '@shared/catalog/seo/product-seo';
import { buildProductWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { ProductGallery } from '@shared/ui/product-gallery/product-gallery';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { AdvisorCard } from '../../components/advisor-card/advisor-card';
import { FaqList } from '../../components/faq-list/faq-list';
import { ProductCardB } from '../../components/product-card-b/product-card-b';
import { ADVISORS, CATEGORY_GUIDES } from '../../data/proposal-b.content';
import { PB_PATHS } from '../../proposal-b.paths';

const KEY_SPECS = 4;

/** Product page: everything visible (no tabs), organised in anchored sections. */
@Component({
  selector: 'app-product-page-b',
  imports: [
    RouterLink,
    MoneyPipe,
    Icon,
    ProductGallery,
    StockBadge,
    AdvisorCard,
    FaqList,
    ProductCardB,
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductSeo],
})
export class ProductPageB {
  protected readonly catalog = inject(CatalogService);
  private readonly productSeo = inject(ProductSeo);

  readonly slug = input.required<string>();

  protected readonly paths = PB_PATHS;
  protected readonly rateDate = this.catalog.exchangeRateDate;

  protected readonly product = computed(() => this.catalog.getBySlug(this.slug()));
  protected readonly related = computed(() => {
    const product = this.product();
    return (product ? this.catalog.getRelated(product) : this.catalog.getFeatured()).slice(0, 4);
  });
  protected readonly crumbs = computed(() => {
    const product = this.product();
    return product ? buildProductCrumbs(product, PB_PATHS) : [];
  });
  protected readonly subcategory = computed(() => {
    const product = this.product();
    return product ? (this.catalog.getSubcategory(product.subcategorySlug) ?? null) : null;
  });
  protected readonly keySpecs = computed(() => this.product()?.specs.slice(0, KEY_SPECS) ?? []);
  protected readonly faq = computed(() => {
    const product = this.product();
    return product ? (CATEGORY_GUIDES[product.categorySlug]?.faq ?? []) : [];
  });
  protected readonly advisor = computed(() => {
    const slug = this.product()?.categorySlug;
    if (slug === 'automatizacion') return ADVISORS[2];
    if (slug === 'temperatura' || slug === 'valvulas') return ADVISORS[1];
    return ADVISORS[0];
  });
  protected readonly whatsappUrl = computed(() => {
    const product = this.product();
    return product ? buildProductWhatsappUrl(this.catalog.whatsappNumber, product) : '';
  });

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) this.productSeo.apply(product, PB_PATHS);
      else this.productSeo.applyNotFound(PB_PATHS);
    });
  }
}

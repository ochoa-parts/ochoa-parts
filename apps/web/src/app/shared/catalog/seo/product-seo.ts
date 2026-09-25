import { DestroyRef, Injectable, RESPONSE_INIT, inject } from '@angular/core';
import { SeoService } from '@core/seo/seo.service';
import { CatalogService } from '../data/catalog.service';
import { ProductDetail } from '../catalog.model';
import { ProposalPaths } from '../proposal-paths';
import { buildBreadcrumbJsonLd, buildProductJsonLd } from '../utils/product-structured-data';

export interface ProductCrumb {
  readonly label: string;
  readonly path: string;
  readonly queryParams?: Readonly<Record<string, string>>;
}

const JSON_LD_PRODUCT = 'product';
const JSON_LD_BREADCRUMB = 'breadcrumb';
const META_DESCRIPTION_LENGTH = 155;

/** Inicio › Catálogo › Categoría (the product itself is appended by the page). */
export function buildProductCrumbs(product: ProductDetail, paths: ProposalPaths): ProductCrumb[] {
  return [
    { label: 'Inicio', path: paths.home },
    { label: 'Catálogo', path: paths.catalog },
    { label: product.category.name, path: paths.catalog, queryParams: { cat: product.category.slug } },
  ];
}

/**
 * Product page SEO: title, meta, canonical, JSON-LD and 404 status during SSR.
 * Provide it at component level so tags are cleaned up when the page is destroyed.
 */
@Injectable()
export class ProductSeo {
  private readonly seo = inject(SeoService);
  private readonly catalog = inject(CatalogService);
  /** Only present during SSR: lets the page answer a real 404 status. */
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.removeJsonLd();
      this.seo.clearPage();
    });
  }

  apply(product: ProductDetail, paths: ProposalPaths): void {
    const origin = this.catalog.siteOrigin;
    const pageUrl = `${origin}${paths.product(product.slug)}`;

    this.seo.setPage({
      title: `${product.name} | ${product.brand} ${product.sku} · Ochoa Parts`,
      description: truncate(product.description, META_DESCRIPTION_LENGTH),
      canonicalUrl: pageUrl,
      image: `${origin}/${product.image}`,
      type: 'product',
    });

    const breadcrumb = [
      ...buildProductCrumbs(product, paths).map((crumb) => ({
        name: crumb.label,
        url: `${origin}${crumb.path}${crumb.queryParams ? `?cat=${crumb.queryParams['cat']}` : ''}`,
      })),
      { name: product.name, url: pageUrl },
    ];

    this.seo.setJsonLd(JSON_LD_PRODUCT, buildProductJsonLd(product, origin, pageUrl));
    this.seo.setJsonLd(JSON_LD_BREADCRUMB, buildBreadcrumbJsonLd(breadcrumb));
  }

  applyNotFound(paths: ProposalPaths): void {
    if (this.responseInit) this.responseInit.status = 404;
    this.removeJsonLd();
    this.seo.setPage({
      title: 'Producto no encontrado · Ochoa Parts',
      description: 'El producto que buscas no está disponible. Explora el catálogo de Ochoa Parts.',
      canonicalUrl: `${this.catalog.siteOrigin}${paths.catalog}`,
    });
  }

  private removeJsonLd(): void {
    this.seo.removeJsonLd(JSON_LD_PRODUCT);
    this.seo.removeJsonLd(JSON_LD_BREADCRUMB);
  }
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

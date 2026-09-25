import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { Facet, StockStatus } from '@shared/catalog/catalog.model';
import { Icon } from '@shared/ui/icon/icon';

/** Faceted filter panel: sidebar on desktop, collapsible sheet on mobile (requirements 5.3). */
@Component({
  selector: 'app-catalog-filters',
  imports: [Icon],
  templateUrl: './catalog-filters.html',
  styleUrl: './catalog-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilters {
  readonly categoryFacets = input.required<readonly Facet[]>();
  readonly brandFacets = input.required<readonly Facet[]>();
  readonly stockFacets = input.required<readonly Facet[]>();

  readonly category = model<string | null>(null);
  readonly brands = model<readonly string[]>([]);
  readonly stock = model<readonly StockStatus[]>([]);

  protected readonly expanded = signal(false);
  protected readonly activeCount = computed(
    () => (this.category() ? 1 : 0) + this.brands().length + this.stock().length,
  );

  protected selectCategory(slug: string): void {
    this.category.update((current) => (current === slug ? null : slug));
  }

  protected toggleBrand(brand: string): void {
    this.brands.update((list) => toggle(list, brand));
  }

  protected toggleStock(status: string): void {
    this.stock.update((list) => toggle(list, status as StockStatus));
  }

  protected clear(): void {
    this.category.set(null);
    this.brands.set([]);
    this.stock.set([]);
  }
}

function toggle<T>(list: readonly T[], value: T): readonly T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

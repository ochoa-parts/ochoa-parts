import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, SortOption } from '@shared/catalog/catalog.model';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { PC_PATHS } from '../../proposal-c.paths';

export interface ProductGroup {
  readonly title: string | null;
  readonly products: readonly Product[];
}

type SortableColumn = 'name' | 'price' | 'availability';

/** Dense order-sheet table: code-first, price and stock visible, add to cart per row. */
@Component({
  selector: 'app-product-table',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  readonly groups = input.required<readonly ProductGroup[]>();
  /** Two-way sort bound to the catalog state; headers are inert when `sortable` is false. */
  readonly sort = model<SortOption>('relevance');
  readonly sortable = input(true);

  protected readonly paths = PC_PATHS;
  protected readonly expanded = signal<ReadonlySet<string>>(new Set());

  protected toggleRow(sku: string): void {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (next.has(sku)) next.delete(sku);
      else next.add(sku);
      return next;
    });
  }

  protected sortBy(column: SortableColumn): void {
    const current = this.sort();
    const next: SortOption =
      column === 'price'
        ? current === 'price_asc'
          ? 'price_desc'
          : 'price_asc'
        : column === 'name'
          ? 'name'
          : 'availability';
    this.sort.set(current === next && column !== 'price' ? 'relevance' : next);
  }

  protected ariaSort(column: SortableColumn): 'ascending' | 'descending' | 'none' {
    const current = this.sort();
    if (column === 'price' && current === 'price_asc') return 'ascending';
    if (column === 'price' && current === 'price_desc') return 'descending';
    if (column === 'name' && current === 'name') return 'ascending';
    if (column === 'availability' && current === 'availability') return 'ascending';
    return 'none';
  }
}

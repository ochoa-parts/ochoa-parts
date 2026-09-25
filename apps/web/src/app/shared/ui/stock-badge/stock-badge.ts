import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StockStatus } from '@shared/catalog/catalog.model';
import { STOCK_LABELS } from '@shared/catalog/utils/product-search';

/** Stock status badge: green available, amber incoming, gray out of stock (requirements 5.1). */
@Component({
  selector: 'app-stock-badge',
  template: `<span class="badge" [class]="'badge badge--' + status()">{{ label() }}</span>`,
  styles: `
    .badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 10px;
      border-radius: 999px;
      white-space: nowrap;
    }

    .badge--available {
      background: var(--ui-ok-bg, #dcf5e7);
      color: var(--ui-ok-text, #146c3b);
    }

    .badge--incoming {
      background: var(--ui-warn-bg, #fdf0d5);
      color: var(--ui-warn-text, #8a5a00);
    }

    .badge--out_of_stock {
      background: var(--ui-off-bg, #eceff3);
      color: var(--ui-off-text, #5b6577);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockBadge {
  readonly status = input.required<StockStatus>();

  protected readonly label = computed(() => STOCK_LABELS[this.status()]);
}

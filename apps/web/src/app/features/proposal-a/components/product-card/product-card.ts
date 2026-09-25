import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/catalog/catalog.model';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { PA_PATHS } from '../../proposal-a.paths';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-list]': "layout() === 'list'" },
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly exchangeRateDate = input.required<string>();
  readonly layout = input<'grid' | 'list'>('grid');

  protected readonly detailPath = computed(() => PA_PATHS.product(this.product().slug));
}

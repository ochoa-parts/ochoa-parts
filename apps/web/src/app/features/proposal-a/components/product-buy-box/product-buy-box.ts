import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDetail } from '@shared/catalog/catalog.model';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { buildProductWhatsappUrl } from '@shared/catalog/whatsapp';
import { PA_PATHS } from '../../proposal-a.paths';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';

/** Price, stock, quantity and purchase actions for the product page. */
@Component({
  selector: 'app-product-buy-box',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge],
  templateUrl: './product-buy-box.html',
  styleUrl: './product-buy-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBuyBox {
  readonly product = input.required<ProductDetail>();
  readonly exchangeRateDate = input.required<string>();
  readonly whatsappNumber = input.required<string>();

  protected readonly catalogPath = PA_PATHS.catalog;

  /** Resets to 1 whenever the product changes. */
  protected readonly quantity = linkedSignal({ source: this.product, computation: () => 1 });

  protected readonly canBuy = computed(() => this.product().stockStatus === 'available');
  protected readonly maxQuantity = computed(() => Math.max(this.product().stockQty, 1));

  protected readonly whatsappUrl = computed(() =>
    buildProductWhatsappUrl(this.whatsappNumber(), this.product()),
  );

  protected changeQuantity(delta: number): void {
    this.quantity.update((qty) => clamp(qty + delta, 1, this.maxQuantity()));
  }

  protected onQuantityInput(raw: string): void {
    const parsed = Number.parseInt(raw, 10);
    this.quantity.set(clamp(Number.isNaN(parsed) ? 1 : parsed, 1, this.maxQuantity()));
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

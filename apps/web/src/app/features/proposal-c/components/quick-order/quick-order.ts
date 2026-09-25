import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { SkuLookupLine, lookupSkuList } from '@shared/catalog/utils/sku-lookup';
import { buildSearchWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { PC_PATHS } from '../../proposal-c.paths';

const EXAMPLE = '3051CD2A02A1AH2B2, 2\nDVC6200\n6ES7214-1AG40-0XB0 3\nXYZ-000';

/**
 * Paste-a-list order entry. Scope note: extends the cart (adds several SKUs at once);
 * it is not an RFQ/quote module. Pending approval by the project lead.
 */
@Component({
  selector: 'app-quick-order',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge],
  templateUrl: './quick-order.html',
  styleUrl: './quick-order.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrder {
  private readonly catalog = inject(CatalogService);

  protected readonly paths = PC_PATHS;
  protected readonly example = EXAMPLE;
  protected readonly text = signal('');
  protected readonly lines = signal<readonly SkuLookupLine[]>([]);

  /**
   * Only counts lines. Totals are never computed in the browser (requirements 2.1):
   * the cart shows the amounts calculated by the API.
   */
  protected readonly availableCount = computed(
    () => this.lines().filter((line) => line.product?.stockStatus === 'available').length,
  );

  protected lookup(): void {
    this.lines.set(lookupSkuList(this.catalog.getProducts(), this.text()));
  }

  protected useExample(): void {
    this.text.set(EXAMPLE);
    this.lookup();
  }

  protected clear(): void {
    this.text.set('');
    this.lines.set([]);
  }

  protected whatsappFor(term: string): string {
    return buildSearchWhatsappUrl(this.catalog.whatsappNumber, term);
  }
}

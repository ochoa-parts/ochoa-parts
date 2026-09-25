import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from '@shared/catalog/catalog.model';
import { PA_PATHS } from '../../proposal-a.paths';
import { normalize, rankProducts } from '@shared/catalog/utils/product-search';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';

const MIN_QUERY_LENGTH = 2;
const MAX_PRODUCT_SUGGESTIONS = 6;
const MAX_CATEGORY_SUGGESTIONS = 3;

/** Search input with typeahead suggestions (requirements 5.3). */
@Component({
  selector: 'app-search-box',
  imports: [Icon, StockBadge],
  templateUrl: './search-box.html',
  styleUrl: './search-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(focusout)': 'onFocusOut($event)', '(keydown.escape)': 'close()' },
})
export class SearchBox {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly router = inject(Router);

  /** Committed query (on submit or suggestion pick). */
  readonly query = model('');
  readonly products = input.required<readonly Product[]>();
  readonly categories = input.required<readonly Category[]>();
  readonly placeholder = input('Busca por SKU, referencia o producto… ej. 3051CD');
  readonly categorySelected = output<string>();

  /** Text being typed; follows `query` when it changes from outside. */
  protected readonly draft = linkedSignal(() => this.query());
  protected readonly open = signal(false);

  private readonly hasMinLength = computed(() => this.draft().trim().length >= MIN_QUERY_LENGTH);

  protected readonly productSuggestions = computed(() =>
    this.hasMinLength()
      ? rankProducts(this.products(), this.draft()).slice(0, MAX_PRODUCT_SUGGESTIONS)
      : [],
  );

  protected readonly categorySuggestions = computed(() => {
    if (!this.hasMinLength()) return [];
    const term = normalize(this.draft());
    return this.categories()
      .filter((category) => normalize(category.name).includes(term))
      .slice(0, MAX_CATEGORY_SUGGESTIONS);
  });

  protected readonly showDropdown = computed(
    () =>
      this.open() &&
      this.hasMinLength() &&
      (this.productSuggestions().length > 0 || this.categorySuggestions().length > 0),
  );

  protected onInput(value: string): void {
    this.draft.set(value);
    this.open.set(true);
  }

  protected submit(): void {
    this.query.set(this.draft().trim());
    this.close();
  }

  /** Picking a product suggestion goes straight to its detail page. */
  protected pickProduct(product: Product): void {
    this.close();
    void this.router.navigateByUrl(PA_PATHS.product(product.slug));
  }

  protected pickCategory(category: Category): void {
    this.draft.set('');
    this.query.set('');
    this.categorySelected.emit(category.slug);
    this.close();
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) this.close();
  }
}

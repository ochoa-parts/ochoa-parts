import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/catalog/catalog.model';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { PB_PATHS } from '../../proposal-b.paths';

/** Editorial product card: large image, brand, name, short context, price and stock. */
@Component({
  selector: 'app-product-card-b',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge],
  template: `
    <article class="card">
      <a class="card__media" [routerLink]="detailPath()" tabindex="-1" aria-hidden="true">
        <img [src]="product().image" [alt]="product().name" loading="lazy" decoding="async" />
        <app-stock-badge class="card__stock" [status]="product().stockStatus" />
      </a>
      <div class="card__body">
        <p class="card__brand">{{ product().brand }}</p>
        <h3 class="card__name">
          <a [routerLink]="detailPath()">{{ product().name }}</a>
        </h3>
        @if (summary()) {
          <p class="card__summary">{{ summary() }}</p>
        }
        <p class="card__sku">Modelo <span class="pb-mono">{{ product().sku }}</span></p>
        <div class="card__foot">
          <div class="card__price">
            <strong>{{ product().priceUsd | money: 'USD' }}</strong>
            <span>Ref. {{ product().priceBs | money: 'Bs' }}</span>
          </div>
          <a class="card__cta" [routerLink]="detailPath()" [attr.aria-label]="'Ver ' + product().name">
            <app-icon name="arrowRight" [size]="18" />
          </a>
        </div>
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--pb-surface);
      border: 1px solid var(--pb-line);
      border-radius: var(--pb-radius);
      overflow: hidden;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 18px 40px rgba(19, 35, 43, 0.12);
      }
    }

    .card__media {
      position: relative;
      display: block;
      aspect-ratio: 4 / 3;
      background: linear-gradient(180deg, #ffffff 0%, #f1f4f3 100%);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 20px;
        display: block;
      }
    }

    .card__stock {
      position: absolute;
      top: 14px;
      left: 14px;
    }

    .card__body {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      padding: 20px 22px 22px;
    }

    .card__brand {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--pb-petrol);
    }

    .card__name {
      margin: 0;
      font-size: 1.25rem;
      line-height: 1.25;

      a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: var(--pb-petrol);
        }
      }
    }

    .card__summary {
      margin: 2px 0 0;
      color: var(--pb-muted);
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .card__sku {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--pb-muted);
    }

    .card__foot {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--pb-line);
    }

    .card__price {
      display: flex;
      flex-direction: column;

      strong {
        font-family: var(--pb-serif);
        font-size: 1.5rem;
        line-height: 1.1;
      }

      span {
        font-size: 0.8125rem;
        color: var(--pb-muted);
      }
    }

    .card__cta {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--pb-petrol);
      color: #fff;

      &:hover {
        background: var(--pb-amber);
        color: var(--pb-on-amber);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardB {
  readonly product = input.required<Product>();
  readonly summary = input('');

  protected readonly detailPath = computed(() => PB_PATHS.product(this.product().slug));
}

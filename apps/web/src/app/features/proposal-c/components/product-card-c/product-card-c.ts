import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/catalog/catalog.model';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { PC_PATHS } from '../../proposal-c.paths';

/** Showroom card: product on a lit pedestal, brand and code up front, price and quick add. */
@Component({
  selector: 'app-product-card-c',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge],
  template: `
    <article class="card">
      <a class="card__stage" [routerLink]="detailPath()" tabindex="-1" aria-hidden="true">
        <span class="card__pedestal">
          <img [src]="product().image" [alt]="product().name" loading="lazy" decoding="async" />
        </span>
      </a>
      <div class="card__body">
        <div class="card__meta">
          <span class="card__brand">{{ product().brand }}</span>
          <app-stock-badge [status]="product().stockStatus" />
        </div>
        <h3 class="card__name">
          <a [routerLink]="detailPath()">{{ product().name }}</a>
        </h3>
        <span class="card__sku pc-mono">{{ product().sku }}</span>
        <div class="card__foot">
          <div class="card__price">
            <strong>{{ product().priceUsd | money: 'USD' }}</strong>
            <span>Ref. {{ product().priceBs | money: 'Bs' }}</span>
          </div>
          <button
            type="button"
            class="card__add"
            [disabled]="product().stockStatus !== 'available'"
            [attr.aria-label]="'Agregar ' + product().name + ' al carrito'"
          >
            <app-icon name="cart" [size]="18" />
          </button>
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
      background: var(--pc-panel);
      border: 1px solid var(--pc-line);
      border-radius: 16px;
      overflow: hidden;
      transition:
        border-color 0.2s ease,
        transform 0.2s ease;

      &:hover {
        border-color: var(--pc-line-strong);
        transform: translateY(-4px);

        .card__pedestal {
          transform: scale(1.03);
        }
      }
    }

    .card__stage {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      padding: 22px;
      background: radial-gradient(circle at 50% 110%, rgba(0, 11, 126, 0.07), transparent 60%), var(--pc-panel-2);
    }

    .card__pedestal {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--pc-pedestal);
      box-shadow: 0 24px 40px rgba(15, 23, 42, 0.12);
      transition: transform 0.3s ease;

      img {
        width: 78%;
        height: 78%;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
    }

    .card__body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      padding: 18px;
    }

    .card__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .card__brand {
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--pc-primary);
    }

    .card__name {
      margin: 0;
      font-size: 1.0625rem;
      font-weight: 700;
      line-height: 1.3;

      a {
        color: var(--pc-text);
        text-decoration: none;

        &:hover {
          color: var(--pc-primary);
        }
      }
    }

    .card__sku {
      font-size: 0.75rem;
      color: var(--pc-muted);
      word-break: break-all;
    }

    .card__foot {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      margin-top: auto;
      padding-top: 14px;
      border-top: 1px solid var(--pc-line);
    }

    .card__price {
      display: flex;
      flex-direction: column;

      strong {
        font-family: var(--pc-display);
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1;
      }

      span {
        margin-top: 4px;
        font-size: 0.75rem;
        color: var(--pc-muted);
      }
    }

    .card__add {
      display: grid;
      place-items: center;
      width: 46px;
      height: 46px;
      flex-shrink: 0;
      border: 0;
      border-radius: 50%;
      background: var(--pc-primary);
      color: var(--pc-on-primary);
      cursor: pointer;

      &:hover:not(:disabled) {
        background: var(--pc-primary-dark);
      }

      &:disabled {
        background: var(--pc-panel-3);
        color: var(--pc-muted);
        cursor: not-allowed;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardC {
  readonly product = input.required<Product>();

  protected readonly detailPath = computed(() => PC_PATHS.product(this.product().slug));
}

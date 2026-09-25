import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/catalog/catalog.model';
import { MoneyPipe } from '@shared/catalog/money.pipe';
import { Icon } from '@shared/ui/icon/icon';
import { StockBadge } from '@shared/ui/stock-badge/stock-badge';
import { PC_PATHS } from '../../proposal-c.paths';

/** Showroom product card: brand badge, big photo, code, price and add-to-cart. */
@Component({
  selector: 'app-product-card-c',
  imports: [RouterLink, MoneyPipe, Icon, StockBadge],
  template: `
    <article class="card">
      <a class="card__media" [routerLink]="detailPath()" tabindex="-1" aria-hidden="true">
        <span class="card__brand">{{ product().brand }}</span>
        <img [src]="product().image" [alt]="product().name" loading="lazy" decoding="async" />
      </a>
      <div class="card__body">
        <span class="card__sku pc-mono">{{ product().sku }}</span>
        <h3 class="card__name">
          <a [routerLink]="detailPath()">{{ product().name }}</a>
        </h3>
        <app-stock-badge [status]="product().stockStatus" />
        <div class="card__price">
          <strong>{{ product().priceUsd | money: 'USD' }}</strong>
          <span>Ref. {{ product().priceBs | money: 'Bs' }}</span>
        </div>
        <button type="button" class="card__add" [disabled]="product().stockStatus !== 'available'">
          <app-icon name="cart" [size]="16" />
          {{ product().stockStatus === 'available' ? 'Agregar al carrito' : 'Consultar disponibilidad' }}
        </button>
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
      background: var(--pc-surface);
      border: 1px solid var(--pc-line);
      border-radius: 6px;
      overflow: hidden;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;

      &:hover {
        border-color: var(--pc-ink);
        box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
      }
    }

    .card__media {
      position: relative;
      display: block;
      aspect-ratio: 1;
      background: radial-gradient(circle at 50% 40%, #ffffff 0%, #eeeeea 100%);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 28px;
        display: block;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.04);
      }
    }

    .card__brand {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 1;
      padding: 4px 10px;
      border-radius: 2px;
      background: var(--pc-ink);
      color: var(--pc-yellow);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .card__body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      flex: 1;
      padding: 16px;
    }

    .card__sku {
      font-size: 0.8125rem;
      color: var(--pc-muted);
      word-break: break-all;
    }

    .card__name {
      margin: 0;
      font-size: 1.0625rem;
      font-weight: 700;
      line-height: 1.3;

      a {
        color: inherit;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .card__price {
      display: flex;
      flex-direction: column;
      margin-top: auto;
      padding-top: 8px;

      strong {
        font-size: 1.375rem;
        font-weight: 800;
      }

      span {
        font-size: 0.8125rem;
        color: var(--pc-muted);
      }
    }

    .card__add {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      height: 40px;
      border: 0;
      border-radius: 4px;
      background: var(--pc-yellow);
      color: var(--pc-on-yellow);
      font: inherit;
      font-weight: 800;
      font-size: 0.875rem;
      cursor: pointer;

      &:hover:not(:disabled) {
        background: var(--pc-yellow-dark);
      }

      &:disabled {
        background: var(--pc-line-soft);
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

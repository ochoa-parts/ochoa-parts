import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '@shared/catalog/catalog.model';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { Icon } from '@shared/ui/icon/icon';
import { PC_PATHS } from '../../proposal-c.paths';

/** Dense header: full-width code search + department strip. */
@Component({
  selector: 'app-header-c',
  imports: [RouterLink, Icon],
  template: `
    <header class="top">
      <div class="pc-container top__inner">
        <a class="logo" [routerLink]="paths.home" aria-label="Ochoa Parts, ir al inicio">
          <img src="propuesta-a/logo-ochoa-parts.jpeg" alt="Ochoa Parts Automation" width="94" height="35" />
        </a>

        <form class="search" role="search" (submit)="$event.preventDefault(); search(term.value)">
          <label class="sr-only" for="pc-search">Buscar por código, referencia o marca</label>
          <input
            id="pc-search"
            #term
            type="search"
            class="pc-mono"
            placeholder="Código de fabricante, SKU o marca…"
            autocomplete="off"
          />
          <button type="submit" class="pc-btn pc-btn--yellow">
            <app-icon name="search" [size]="16" /> Buscar
          </button>
        </form>

        <nav class="links" [class.is-open]="menuOpen()" aria-label="Accesos">
          <a [routerLink]="paths.home" fragment="pedido-rapido" (click)="menuOpen.set(false)">Pedido rápido</a>
          <a [routerLink]="paths.home" fragment="marcas" (click)="menuOpen.set(false)">Marcas A–Z</a>
          <a [routerLink]="paths.catalog" (click)="menuOpen.set(false)">Catálogo</a>
        </nav>

        <div class="actions">
          <button type="button" class="cart" aria-label="Carrito, 3 productos">
            <app-icon name="cart" [size]="18" /> <span class="cart__count">3</span>
          </button>
          <button type="button" class="login">
            <app-icon name="user" [size]="16" /> <span>Ingresar</span>
          </button>
          <button
            type="button"
            class="menu"
            aria-label="Abrir menú"
            [attr.aria-expanded]="menuOpen()"
            (click)="menuOpen.set(!menuOpen())"
          >
            <app-icon [name]="menuOpen() ? 'close' : 'list'" [size]="20" />
          </button>
        </div>
      </div>
    </header>

    <nav class="departments" aria-label="Departamentos">
      <div class="pc-container departments__inner">
        @for (category of categories(); track category.slug) {
          <a [routerLink]="paths.catalog" [queryParams]="{ cat: category.slug }">{{ category.name }}</a>
        }
        <span class="departments__rate">USD · Tasa ref. {{ rateDate }}</span>
      </div>
    </nav>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .top {
      background: var(--pc-graphite);
      color: #fff;
    }

    .top__inner {
      display: flex;
      align-items: center;
      gap: 20px;
      height: 64px;
    }

    .logo {
      display: block;
      padding: 4px 8px;
      background: #fff;
      border-radius: var(--pc-radius);

      img {
        display: block;
        height: 35px;
        width: auto;
      }
    }

    .search {
      display: flex;
      flex: 1;
      max-width: 620px;

      input {
        flex: 1;
        min-width: 0;
        height: 38px;
        padding: 0 12px;
        border: 0;
        border-radius: var(--pc-radius) 0 0 var(--pc-radius);
        background: #fff;
        color: var(--pc-ink);
        font-size: 0.875rem;
      }

      .pc-btn {
        border-radius: 0 var(--pc-radius) var(--pc-radius) 0;
      }
    }

    .links {
      display: flex;
      gap: 4px;

      a {
        padding: 8px 10px;
        color: rgba(255, 255, 255, 0.85);
        font-weight: 700;
        font-size: 0.875rem;
        text-decoration: none;
        white-space: nowrap;

        &:hover {
          color: var(--pc-yellow);
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .cart,
    .login,
    .menu {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 36px;
      padding: 0 10px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: var(--pc-radius);
      background: transparent;
      color: #fff;
      font: inherit;
      font-weight: 700;
      font-size: 0.8125rem;
      cursor: pointer;

      &:hover {
        border-color: var(--pc-yellow);
      }
    }

    .cart__count {
      padding: 0 6px;
      border-radius: 2px;
      background: var(--pc-yellow);
      color: var(--pc-on-yellow);
    }

    .menu {
      display: none;
    }

    .departments {
      background: var(--pc-surface);
      border-bottom: 1px solid var(--pc-line);
    }

    .departments__inner {
      display: flex;
      align-items: center;
      gap: 2px;
      height: 40px;
      overflow-x: auto;

      a {
        padding: 6px 12px;
        color: var(--pc-ink);
        font-weight: 700;
        font-size: 0.8125rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        text-decoration: none;
        white-space: nowrap;

        &:hover {
          background: var(--pc-bg);
        }
      }
    }

    .departments__rate {
      margin-left: auto;
      padding-left: 12px;
      font-size: 0.75rem;
      color: var(--pc-muted);
      white-space: nowrap;
    }

    @media (max-width: 1100px) {
      .links {
        display: none;
        position: absolute;
        top: 64px;
        right: 16px;
        flex-direction: column;
        padding: 8px;
        background: var(--pc-graphite-2);
        border-radius: var(--pc-radius);

        &.is-open {
          display: flex;
        }
      }

      .menu {
        display: inline-flex;
      }
    }

    @media (max-width: 640px) {
      .top__inner {
        flex-wrap: wrap;
        height: auto;
        padding-top: 10px;
        padding-bottom: 10px;
        gap: 10px;
      }

      .search {
        order: 3;
        flex-basis: 100%;
        max-width: none;
      }

      .login span {
        display: none;
      }

      .links {
        top: 56px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderC {
  private readonly router = inject(Router);

  readonly categories = input.required<readonly Category[]>();

  protected readonly paths = PC_PATHS;
  protected readonly rateDate = inject(CatalogService).exchangeRateDate;
  protected readonly menuOpen = signal(false);

  protected search(term: string): void {
    const q = term.trim();
    void this.router.navigate([PC_PATHS.catalog], { queryParams: q ? { q } : {} });
  }
}

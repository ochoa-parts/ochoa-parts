import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '@shared/catalog/catalog.model';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { Icon } from '@shared/ui/icon/icon';
import { PC_PATHS } from '../../proposal-c.paths';

/** Dark showroom header: logo, code search, brand/catalog links and a department rail. */
@Component({
  selector: 'app-header-c',
  imports: [RouterLink, Icon],
  template: `
    <header class="top">
      <div class="pc-container top__inner">
        <a class="logo" [routerLink]="paths.home" aria-label="Ochoa Parts, ir al inicio">
          <img src="propuesta-a/logo-ochoa-parts.jpeg" alt="Ochoa Parts Automation" width="96" height="36" />
        </a>

        <form class="search" role="search" (submit)="$event.preventDefault(); search(term.value)">
          <label class="sr-only" for="pc-search">Buscar por código, referencia o marca</label>
          <app-icon name="search" [size]="18" class="search__icon" />
          <input id="pc-search" #term type="search" placeholder="Busca por código de fabricante o marca" autocomplete="off" />
        </form>

        <nav class="links" [class.is-open]="menuOpen()" aria-label="Accesos">
          <a [routerLink]="paths.home" fragment="marcas" (click)="menuOpen.set(false)">Marcas</a>
          <a [routerLink]="paths.catalog" (click)="menuOpen.set(false)">Catálogo</a>
          <a [routerLink]="paths.home" fragment="pedido-rapido" (click)="menuOpen.set(false)">Pedido rápido</a>
        </nav>

        <div class="actions">
          <button type="button" class="icon-btn" aria-label="Carrito, 3 productos">
            <app-icon name="cart" [size]="20" />
            <span class="icon-btn__badge" aria-hidden="true">3</span>
          </button>
          <button type="button" class="login">Ingresar</button>
          <button
            type="button"
            class="icon-btn menu"
            aria-label="Abrir menú"
            [attr.aria-expanded]="menuOpen()"
            (click)="menuOpen.set(!menuOpen())"
          >
            <app-icon [name]="menuOpen() ? 'close' : 'list'" [size]="20" />
          </button>
        </div>
      </div>

      <nav class="rail" aria-label="Departamentos">
        <div class="pc-container rail__inner">
          @for (category of categories(); track category.slug) {
            <a [routerLink]="paths.catalog" [queryParams]="{ cat: category.slug }">{{ category.name }}</a>
          }
          <span class="rail__rate">Precios en USD · Tasa ref. {{ rateDate }}</span>
        </div>
      </nav>
    </header>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .top {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--pc-line);
    }

    .top__inner {
      display: flex;
      align-items: center;
      gap: 24px;
      height: 68px;
    }

    .logo {
      display: block;
      padding: 4px 8px;
      background: #fff;
      border-radius: 6px;

      img {
        display: block;
        height: 36px;
        width: auto;
      }
    }

    .search {
      position: relative;
      flex: 1;
      max-width: 520px;

      input {
        width: 100%;
        height: 42px;
        padding: 0 16px 0 44px;
        border: 1px solid var(--pc-line-strong);
        border-radius: 999px;
        background: var(--pc-panel-2);
        color: var(--pc-text);
        font: inherit;
        font-size: 0.9375rem;

        &::placeholder {
          color: var(--pc-muted);
        }

        &:focus {
          outline: none;
          border-color: var(--pc-primary);
        }
      }
    }

    .search__icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--pc-muted);
      pointer-events: none;
    }

    .links {
      display: flex;
      gap: 4px;

      a {
        padding: 8px 12px;
        color: var(--pc-text);
        font-weight: 600;
        font-size: 0.9375rem;
        text-decoration: none;
        white-space: nowrap;

        &:hover {
          color: var(--pc-primary);
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .icon-btn {
      position: relative;
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border: 1px solid var(--pc-line-strong);
      border-radius: 50%;
      background: transparent;
      color: var(--pc-text);
      cursor: pointer;

      &:hover {
        border-color: var(--pc-primary);
      }
    }

    .icon-btn__badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      border-radius: 999px;
      background: var(--pc-primary);
      color: var(--pc-on-primary);
      font-size: 0.6875rem;
      font-weight: 800;
      line-height: 18px;
      text-align: center;
    }

    .login {
      height: 42px;
      padding: 0 18px;
      border: 0;
      border-radius: 999px;
      background: var(--pc-text);
      color: var(--pc-bg);
      font: inherit;
      font-weight: 700;
      font-size: 0.875rem;
      cursor: pointer;

      &:hover {
        background: var(--pc-primary);
        color: var(--pc-on-primary);
      }
    }

    .menu {
      display: none;
    }

    .rail {
      border-top: 1px solid var(--pc-line);
    }

    .rail__inner {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 42px;
      overflow-x: auto;

      a {
        padding: 6px 12px;
        border-radius: 999px;
        color: var(--pc-muted);
        font-weight: 600;
        font-size: 0.8125rem;
        text-decoration: none;
        white-space: nowrap;

        &:hover {
          background: var(--pc-panel-3);
          color: var(--pc-text);
        }
      }
    }

    .rail__rate {
      margin-left: auto;
      padding-left: 12px;
      font-size: 0.75rem;
      color: var(--pc-muted);
      white-space: nowrap;
    }

    @media (max-width: 1024px) {
      .links {
        display: none;
        position: absolute;
        top: 68px;
        right: 16px;
        flex-direction: column;
        padding: 8px;
        background: var(--pc-panel-2);
        border: 1px solid var(--pc-line);
        border-radius: 12px;

        &.is-open {
          display: flex;
        }
      }

      .menu {
        display: grid;
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

      .login {
        display: none;
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

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@shared/catalog/catalog.model';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { PB_PATHS } from '../../proposal-b.paths';

@Component({
  selector: 'app-footer-b',
  imports: [RouterLink],
  template: `
    <footer class="footer" id="contacto">
      <div class="pb-container footer__grid">
        <div class="footer__brand">
          <p class="footer__claim">Instrumentación y control, con criterio de ingeniería.</p>
          <p class="footer__legal">Inversiones Ochoa Parts, C.A. · Venezuela · Panamá · Estados Unidos</p>
        </div>
        <nav aria-label="Qué medir">
          <h2>Qué medir</h2>
          <ul>
            @for (category of categories(); track category.slug) {
              <li>
                <a [routerLink]="paths.catalog" [queryParams]="{ cat: category.slug }">{{ category.name }}</a>
              </li>
            }
          </ul>
        </nav>
        <nav aria-label="Empresa">
          <h2>Empresa</h2>
          <ul>
            <li><a [routerLink]="paths.home" fragment="asesoria">Asesoría técnica</a></li>
            <li><a [routerLink]="paths.home" fragment="marcas">Marcas</a></li>
            <li><a [routerLink]="paths.home" fragment="descargas">Descargas</a></li>
          </ul>
        </nav>
        <div>
          <h2>Pagos</h2>
          <p class="footer__text">
            Zelle, pago móvil, transferencia nacional e internacional, efectivo USD y EUR. Cada pago es
            verificado por nuestro equipo.
          </p>
          <p class="footer__text">Precios en USD · Tasa referencial del {{ rateDate }}</p>
        </div>
      </div>
      <div class="pb-container footer__bottom">© 2026 Inversiones Ochoa Parts, C.A.</div>
    </footer>
  `,
  styles: `
    .footer {
      background: var(--pb-petrol-dark);
      color: rgba(255, 255, 255, 0.78);
      scroll-margin-top: 80px;
    }

    .footer__grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
      gap: 40px;
      padding-top: 64px;
      padding-bottom: 40px;
    }

    .footer__claim {
      margin: 0 0 16px;
      font-family: var(--pb-serif);
      font-size: 1.625rem;
      line-height: 1.25;
      color: #fff;
    }

    .footer__legal,
    .footer__text {
      margin: 0 0 10px;
      font-size: 0.875rem;
      line-height: 1.6;
    }

    h2 {
      margin: 0 0 14px;
      font-family: var(--pb-sans);
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--pb-amber);
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 8px;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #fff;
        text-decoration: underline;
      }
    }

    .footer__bottom {
      padding-top: 18px;
      padding-bottom: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      font-size: 0.8125rem;
    }

    @media (max-width: 860px) {
      .footer__grid {
        grid-template-columns: 1fr 1fr;
      }

      .footer__brand {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 480px) {
      .footer__grid {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterB {
  readonly categories = input.required<readonly Category[]>();

  protected readonly paths = PB_PATHS;
  protected readonly rateDate = inject(CatalogService).exchangeRateDate;
}

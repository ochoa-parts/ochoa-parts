import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PC_PATHS } from '../../proposal-c.paths';

@Component({
  selector: 'app-footer-c',
  imports: [RouterLink],
  template: `
    <footer class="footer" id="contacto">
      <div class="pc-container footer__top">
        <p class="footer__claim pc-display">Instrumentación de marcas líderes.<br /><span>Un solo proveedor.</span></p>
        <div class="footer__cols">
          <nav aria-label="Accesos">
            <h2>Explorar</h2>
            <a [routerLink]="paths.home" fragment="marcas">Marcas</a>
            <a [routerLink]="paths.catalog">Catálogo</a>
            <a [routerLink]="paths.home" fragment="pedido-rapido">Pedido rápido</a>
          </nav>
          <div>
            <h2>Pagos verificados</h2>
            <p>Zelle · Pago móvil · Transferencia nacional e internacional · Efectivo USD / EUR</p>
          </div>
          <div>
            <h2>Empresa</h2>
            <p>Inversiones Ochoa Parts, C.A.<br />RIF: por confirmar<br />Venezuela · Panamá · EE. UU.</p>
          </div>
        </div>
      </div>
      <div class="pc-container footer__legal">© 2026 Inversiones Ochoa Parts, C.A.</div>
    </footer>
  `,
  styles: `
    .footer {
      padding-bottom: 72px;
      background: var(--pc-panel-2);
      border-top: 1px solid var(--pc-line);
      color: var(--pc-muted);
      font-size: 0.875rem;
      scroll-margin-top: 110px;
    }

    .footer__top {
      display: grid;
      grid-template-columns: 1.2fr 2fr;
      gap: 40px;
      padding-top: 56px;
      padding-bottom: 32px;
    }

    .footer__claim {
      margin: 0;
      font-size: 2rem;
      line-height: 1.05;
      color: var(--pc-text);

      span {
        color: var(--pc-primary);
      }
    }

    .footer__cols {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;

      nav {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }

    h2 {
      margin: 0 0 12px;
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--pc-text);
    }

    p {
      margin: 0;
      line-height: 1.7;
    }

    a {
      color: var(--pc-muted);
      text-decoration: none;

      &:hover {
        color: var(--pc-primary);
      }
    }

    .footer__legal {
      padding-top: 16px;
      border-top: 1px solid var(--pc-line);
      font-size: 0.8125rem;
    }

    @media (max-width: 860px) {
      .footer__top,
      .footer__cols {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterC {
  protected readonly paths = PC_PATHS;
}

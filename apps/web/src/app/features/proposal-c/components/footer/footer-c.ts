import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PC_PATHS } from '../../proposal-c.paths';

@Component({
  selector: 'app-footer-c',
  imports: [RouterLink],
  template: `
    <footer class="footer" id="contacto">
      <div class="pc-container footer__inner">
        <div class="footer__col">
          <strong>Inversiones Ochoa Parts, C.A.</strong>
          <span>RIF: por confirmar · Venezuela · Panamá · EE. UU.</span>
        </div>
        <div class="footer__col">
          <strong>Pagos verificados</strong>
          <span>Zelle · Pago móvil · Transferencia nacional e internacional · Efectivo USD / EUR</span>
        </div>
        <nav class="footer__col" aria-label="Enlaces">
          <strong>Accesos</strong>
          <span>
            <a [routerLink]="paths.home" fragment="pedido-rapido">Pedido rápido</a> ·
            <a [routerLink]="paths.home" fragment="marcas">Marcas</a> ·
            <a [routerLink]="paths.home" fragment="descargas">Descargas</a>
          </span>
        </nav>
      </div>
      <div class="pc-container footer__legal">© 2026 Inversiones Ochoa Parts, C.A.</div>
    </footer>
  `,
  styles: `
    .footer {
      background: var(--pc-graphite);
      color: rgba(255, 255, 255, 0.75);
      font-size: 0.8125rem;
      scroll-margin-top: 110px;
    }

    .footer__inner {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding-top: 28px;
      padding-bottom: 20px;
    }

    .footer__col {
      display: flex;
      flex-direction: column;
      gap: 4px;

      strong {
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    a {
      color: var(--pc-yellow);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .footer__legal {
      padding-top: 12px;
      padding-bottom: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    @media (max-width: 760px) {
      .footer__inner {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterC {
  protected readonly paths = PC_PATHS;
}

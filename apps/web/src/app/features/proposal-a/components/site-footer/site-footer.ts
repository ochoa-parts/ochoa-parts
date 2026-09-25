import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@shared/catalog/catalog.model';
import { PA_PATHS } from '../../proposal-a.paths';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Icon],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  readonly categories = input.required<readonly Category[]>();

  protected readonly catalogPath = PA_PATHS.catalog;
  protected readonly homePath = PA_PATHS.home;
  protected readonly year = 2026;
  protected readonly paymentMethods = [
    'Zelle',
    'Pago móvil',
    'Transferencia nacional',
    'Transferencia internacional',
    'Efectivo USD',
    'Efectivo EUR',
  ] as const;
}

import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PA_PATHS } from '../../proposal-a.paths';
import { Icon } from '@shared/ui/icon/icon';

interface NavLink {
  readonly label: string;
  readonly fragment: string;
}

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  readonly exchangeRateDate = input.required<string>();

  protected readonly homePath = PA_PATHS.home;
  protected readonly catalogPath = PA_PATHS.catalog;
  protected readonly menuOpen = signal(false);

  protected readonly navLinks: readonly NavLink[] = [
    { label: 'Nosotros', fragment: 'nosotros' },
    { label: 'Soluciones', fragment: 'soluciones' },
    { label: 'Marcas', fragment: 'marcas' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}

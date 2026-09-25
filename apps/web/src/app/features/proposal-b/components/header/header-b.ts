import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '@shared/catalog/catalog.model';
import { Icon } from '@shared/ui/icon/icon';
import { PB_PATHS } from '../../proposal-b.paths';

/** Editorial header: variable-driven navigation with a compact search (not the hero). */
@Component({
  selector: 'app-header-b',
  imports: [RouterLink, Icon],
  templateUrl: './header-b.html',
  styleUrl: './header-b.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderB {
  private readonly router = inject(Router);

  readonly categories = input.required<readonly Category[]>();

  protected readonly paths = PB_PATHS;
  protected readonly menuOpen = signal(false);
  protected readonly searchOpen = signal(false);

  protected search(term: string): void {
    const q = term.trim();
    this.searchOpen.set(false);
    this.menuOpen.set(false);
    void this.router.navigate([PB_PATHS.catalog], { queryParams: q ? { q } : {} });
  }
}

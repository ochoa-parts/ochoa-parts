import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { Icon } from '@shared/ui/icon/icon';
import { FooterC } from '../components/footer/footer-c';
import { HeaderC } from '../components/header/header-c';

/** Public-site shell for proposal C: theme tokens, shared primitives, header and footer. */
@Component({
  selector: 'app-proposal-c-layout',
  imports: [RouterOutlet, RouterLink, HeaderC, FooterC, Icon],
  template: `
    <app-header-c [categories]="categories" />
    <main>
      <router-outlet />
    </main>
    <app-footer-c />
    <a class="pc-review-pill" routerLink="/">
      <app-icon name="arrowLeft" [size]="16" />
      Volver a propuestas
    </a>
  `,
  styleUrl: './proposal-c-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Shared primitives (.pc-btn, .pc-container, …) must reach child pages.
  encapsulation: ViewEncapsulation.None,
})
export class ProposalCLayout {
  protected readonly categories = inject(CatalogService).getCategories();
}

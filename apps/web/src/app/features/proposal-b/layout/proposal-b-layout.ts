import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { Icon } from '@shared/ui/icon/icon';
import { HeaderB } from '../components/header/header-b';
import { FooterB } from '../components/footer/footer-b';

/** Public-site shell for proposal B: theme tokens, shared primitives, header and footer. */
@Component({
  selector: 'app-proposal-b-layout',
  imports: [RouterOutlet, RouterLink, HeaderB, FooterB, Icon],
  template: `
    <app-header-b [categories]="categories" />
    <main>
      <router-outlet />
    </main>
    <app-footer-b [categories]="categories" />
    <a class="pb-review-pill" routerLink="/">
      <app-icon name="arrowLeft" [size]="16" />
      Volver a propuestas
    </a>
  `,
  styleUrl: './proposal-b-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Shared primitives (.pb-btn, .pb-container, …) must reach child pages.
  encapsulation: ViewEncapsulation.None,
})
export class ProposalBLayout {
  protected readonly categories = inject(CatalogService).getCategories();
}

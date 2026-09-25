import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { Icon } from '@shared/ui/icon/icon';
import { SiteFooter } from '../components/site-footer/site-footer';
import { SiteHeader } from '../components/site-header/site-header';

/** Public-site shell for proposal A: theme tokens, header, footer and a back-to-panel pill. */
@Component({
  selector: 'app-proposal-a-layout',
  imports: [RouterOutlet, RouterLink, SiteHeader, SiteFooter, Icon],
  templateUrl: './proposal-a-layout.html',
  styleUrl: './proposal-a-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Shared primitives (.btn, .section, .pa-container) must reach child pages.
  encapsulation: ViewEncapsulation.None,
})
export class ProposalALayout {
  private readonly catalog = inject(CatalogService);

  protected readonly exchangeRateDate = this.catalog.exchangeRateDate;
  protected readonly categories = this.catalog.getCategories();
}

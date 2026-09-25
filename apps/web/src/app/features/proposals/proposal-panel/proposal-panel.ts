import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProposalService } from '../data/proposal.service';
import { ProposalCard } from '../proposal-card/proposal-card';

@Component({
  selector: 'app-proposal-panel',
  imports: [ProposalCard],
  templateUrl: './proposal-panel.html',
  styleUrl: './proposal-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalPanel {
  protected readonly proposals = inject(ProposalService).getAll();
}

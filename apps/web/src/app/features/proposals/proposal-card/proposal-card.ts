import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Proposal } from '../../../core/models/proposal.model';

const STATUS_LABELS: Record<Proposal['status'], string> = {
  ready: 'Lista para revisar',
  pending: 'En preparación',
};

@Component({
  selector: 'app-proposal-card',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './proposal-card.html',
  styleUrl: './proposal-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalCard {
  readonly proposal = input.required<Proposal>();

  protected readonly isReady = computed(() => this.proposal().status === 'ready');
  protected readonly statusLabel = computed(() => STATUS_LABELS[this.proposal().status]);
}

import { Injectable } from '@angular/core';
import { Proposal } from '../../../core/models/proposal.model';
import { PROPOSALS } from './proposals.data';

/** Single access point to proposals, so the data source can change without touching components. */
@Injectable({ providedIn: 'root' })
export class ProposalService {
  getAll(): readonly Proposal[] {
    return PROPOSALS;
  }

  getById(id: string): Proposal | undefined {
    return PROPOSALS.find((proposal) => proposal.id === id);
  }
}

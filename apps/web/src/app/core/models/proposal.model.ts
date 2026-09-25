export type ProposalStatus = 'ready' | 'pending';

export interface Proposal {
  /** URL-safe identifier; the proposal site lives at /propuesta/:id. */
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly status: ProposalStatus;
  /** Card preview image, relative to /public. */
  readonly thumbnail: string | null;
}

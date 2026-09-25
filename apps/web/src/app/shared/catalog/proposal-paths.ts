/** URL contract every proposal exposes, so shared logic (SEO, crumbs) can build links. */
export interface ProposalPaths {
  readonly home: string;
  readonly catalog: string;
  readonly product: (slug: string) => string;
}

export function createProposalPaths(base: string): ProposalPaths {
  return {
    home: base,
    catalog: `${base}/catalogo`,
    product: (slug: string) => `${base}/producto/${slug}`,
  };
}

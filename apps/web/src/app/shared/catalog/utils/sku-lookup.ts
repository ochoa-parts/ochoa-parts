import { Product } from '../catalog.model';
import { scoreProduct } from './product-search';

/** Minimum score to accept a line as a SKU match (exact or partial SKU; see scoreProduct). */
const SKU_MATCH_SCORE = 70;
const MAX_LINES = 50;

export interface SkuLookupLine {
  readonly term: string;
  readonly quantity: number;
  readonly product: Product | null;
}

/**
 * Parses a pasted list ("SKU" or "SKU, qty" / "SKU qty" per line) and resolves each
 * reference against the catalog. Prototype only: the real lookup is an API call.
 */
export function lookupSkuList(products: readonly Product[], text: string): SkuLookupLine[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, MAX_LINES)
    .map((line) => {
      const [term, rawQty] = line.split(/[\s,;\t]+/);
      const quantity = Math.max(1, Number.parseInt(rawQty ?? '1', 10) || 1);
      return { term, quantity, product: bestSkuMatch(products, term) };
    });
}

function bestSkuMatch(products: readonly Product[], term: string): Product | null {
  let best: Product | null = null;
  let bestScore = 0;
  for (const product of products) {
    const score = scoreProduct(product, term);
    if (score >= SKU_MATCH_SCORE && score > bestScore) {
      best = product;
      bestScore = score;
    }
  }
  return best;
}

export interface PriceRange {
  readonly label: string;
  readonly min: number | null;
  readonly max: number | null;
}

/** Preset USD ranges for the price filter (requirements 5.3). */
export const PRICE_RANGES: readonly PriceRange[] = [
  { label: 'Cualquier precio', min: null, max: null },
  { label: 'Hasta USD 500', min: null, max: 500 },
  { label: 'USD 500 – 2.000', min: 500, max: 2000 },
  { label: 'Más de USD 2.000', min: 2000, max: null },
];

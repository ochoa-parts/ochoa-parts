import { Category, Product, Subcategory } from '../catalog.model';

/**
 * Mock catalog for the landing proposal. Brands, SKUs and prices are illustrative only.
 * priceBs values are precomputed (rate 36,40) to mimic what the API would return.
 */
const IMG = 'catalogo/products';

export const EXCHANGE_RATE_DATE = '24/09/2026';

/** Placeholder: the real number comes from settings.whatsapp_number (pending from client). */
export const WHATSAPP_NUMBER = '580000000000';

/** Public origin used for canonical URLs and JSON-LD. Placeholder until the domain is live. */
export const SITE_ORIGIN = 'https://www.ochoaparts.com';

export const CATEGORIES: readonly Category[] = [
  {
    slug: 'presion',
    name: 'Presión',
    description: 'Transmisores, manómetros y presostatos',
    image: `${IMG}/pressure-transmitter.webp`,
  },
  {
    slug: 'temperatura',
    name: 'Temperatura',
    description: 'Termopares, RTD y termopozos',
    image: `${IMG}/thermocouple.webp`,
  },
  {
    slug: 'caudal',
    name: 'Caudal',
    description: 'Medidores electromagnéticos, másicos y vórtex',
    image: `${IMG}/flowmeter.webp`,
  },
  {
    slug: 'nivel',
    name: 'Nivel',
    description: 'Radar, ultrasonido e interruptores de nivel',
    image: `${IMG}/radar-level.webp`,
  },
  {
    slug: 'valvulas',
    name: 'Válvulas y actuadores',
    description: 'Válvulas de control, posicionadores y actuadores',
    image: `${IMG}/control-valve.webp`,
  },
  {
    slug: 'automatizacion',
    name: 'Automatización y control',
    description: 'PLC, módulos de E/S y controladores',
    image: `${IMG}/plc.webp`,
  },
];

export const SUBCATEGORIES: readonly Subcategory[] = [
  { slug: 'transmisores-presion', categorySlug: 'presion', name: 'Transmisores de presión' },
  { slug: 'manometros', categorySlug: 'presion', name: 'Manómetros' },
  { slug: 'termopares', categorySlug: 'temperatura', name: 'Termopares' },
  { slug: 'rtd', categorySlug: 'temperatura', name: 'RTD / Pt100' },
  { slug: 'medidores-electromagneticos', categorySlug: 'caudal', name: 'Medidores electromagnéticos' },
  { slug: 'nivel-radar', categorySlug: 'nivel', name: 'Transmisores de nivel radar' },
  { slug: 'valvulas-control', categorySlug: 'valvulas', name: 'Válvulas de control' },
  { slug: 'posicionadores', categorySlug: 'valvulas', name: 'Posicionadores' },
  { slug: 'cpu-compactas', categorySlug: 'automatizacion', name: 'CPU compactas' },
  { slug: 'controladores-modulares', categorySlug: 'automatizacion', name: 'Controladores modulares' },
];

export const PRODUCTS: readonly Product[] = [
  {
    sku: '3051CD2A02A1AH2B2',
    slug: 'rosemount-3051cd-transmisor-presion-diferencial',
    name: 'Transmisor de presión diferencial 3051CD',
    brand: 'Rosemount',
    categorySlug: 'presion',
    subcategorySlug: 'transmisores-presion',
    priceUsd: 1245,
    priceBs: 45318,
    stockStatus: 'available',
    image: `${IMG}/pressure-transmitter.webp`,
  },
  {
    sku: '232.50.100-160B',
    slug: 'wika-232-50-manometro-inox-100mm',
    name: 'Manómetro inox 100 mm, 0–160 bar, con glicerina',
    brand: 'WIKA',
    categorySlug: 'presion',
    subcategorySlug: 'manometros',
    priceUsd: 68.5,
    priceBs: 2493.4,
    stockStatus: 'available',
    image: `${IMG}/pressure-gauge.webp`,
  },
  {
    sku: 'EJA110E-JMS5J',
    slug: 'yokogawa-eja110e-transmisor-presion-diferencial',
    name: 'Transmisor de presión diferencial EJA110E',
    brand: 'Yokogawa',
    categorySlug: 'presion',
    subcategorySlug: 'transmisores-presion',
    priceUsd: 1380,
    priceBs: 50232,
    stockStatus: 'incoming',
    image: `${IMG}/pressure-transmitter.webp`,
  },
  {
    sku: 'TC-K-18',
    slug: 'omega-tc-k-18-termopar-tipo-k',
    name: 'Termopar tipo K con cabezal, 18"',
    brand: 'Omega',
    categorySlug: 'temperatura',
    subcategorySlug: 'termopares',
    priceUsd: 125,
    priceBs: 4550,
    stockStatus: 'incoming',
    image: `${IMG}/thermocouple.webp`,
  },
  {
    sku: 'TR10-B-PT100',
    slug: 'wika-tr10-rtd-pt100-termopozo',
    name: 'RTD Pt100 con termopozo TR10',
    brand: 'WIKA',
    categorySlug: 'temperatura',
    subcategorySlug: 'rtd',
    priceUsd: 210,
    priceBs: 7644,
    stockStatus: 'available',
    image: `${IMG}/thermocouple.webp`,
  },
  {
    sku: '7ME6910-1AA10-1AA0',
    slug: 'siemens-sitrans-fm-mag5000-medidor-flujo',
    name: 'Medidor de flujo electromagnético SITRANS FM MAG 5000',
    brand: 'Siemens',
    categorySlug: 'caudal',
    subcategorySlug: 'medidores-electromagneticos',
    priceUsd: 2850,
    priceBs: 103740,
    stockStatus: 'available',
    image: `${IMG}/flowmeter.webp`,
  },
  {
    sku: '10W2H-UD0A1AA0A4AA',
    slug: 'endress-hauser-promag-10w-medidor-flujo',
    name: 'Medidor de flujo electromagnético Promag 10W',
    brand: 'Endress+Hauser',
    categorySlug: 'caudal',
    subcategorySlug: 'medidores-electromagneticos',
    priceUsd: 3120,
    priceBs: 113568,
    stockStatus: 'out_of_stock',
    image: `${IMG}/flowmeter.webp`,
  },
  {
    sku: 'PS64.XXAGDHKMXX',
    slug: 'vega-vegapuls-64-transmisor-nivel-radar',
    name: 'Transmisor de nivel radar 80 GHz VEGAPULS 64',
    brand: 'VEGA',
    categorySlug: 'nivel',
    subcategorySlug: 'nivel-radar',
    priceUsd: 2390,
    priceBs: 86996,
    stockStatus: 'available',
    image: `${IMG}/radar-level.webp`,
  },
  {
    sku: 'ET-2IN-667',
    slug: 'fisher-easy-e-et-valvula-control-globo',
    name: 'Válvula de control globo easy-e ET 2" con actuador 667',
    brand: 'Fisher',
    categorySlug: 'valvulas',
    subcategorySlug: 'valvulas-control',
    priceUsd: 4750,
    priceBs: 172900,
    stockStatus: 'incoming',
    image: `${IMG}/control-valve.webp`,
  },
  {
    sku: 'DVC6200',
    slug: 'fisher-dvc6200-posicionador-digital',
    name: 'Posicionador digital de válvula DVC6200',
    brand: 'Fisher',
    categorySlug: 'valvulas',
    subcategorySlug: 'posicionadores',
    priceUsd: 1980,
    priceBs: 72072,
    stockStatus: 'out_of_stock',
    image: `${IMG}/positioner.webp`,
  },
  {
    sku: '6ES7214-1AG40-0XB0',
    slug: 'siemens-s7-1200-cpu-1214c',
    name: 'CPU S7-1200 1214C DC/DC/DC',
    brand: 'Siemens',
    categorySlug: 'automatizacion',
    subcategorySlug: 'cpu-compactas',
    priceUsd: 465,
    priceBs: 16926,
    stockStatus: 'available',
    image: `${IMG}/plc.webp`,
  },
  {
    sku: '1769-L33ER',
    slug: 'allen-bradley-compactlogix-1769-l33er',
    name: 'Controlador CompactLogix 5370 L33ER',
    brand: 'Allen-Bradley',
    categorySlug: 'automatizacion',
    subcategorySlug: 'controladores-modulares',
    priceUsd: 3890,
    priceBs: 141596,
    stockStatus: 'available',
    image: `${IMG}/plc.webp`,
  },
];

/** SKUs highlighted on the landing page. */
export const FEATURED_SKUS: readonly string[] = [
  '3051CD2A02A1AH2B2',
  '7ME6910-1AA10-1AA0',
  'PS64.XXAGDHKMXX',
  '6ES7214-1AG40-0XB0',
];

import { ProductDetailExtra, ProductFile } from '../catalog.model';

/**
 * Mock detail payload keyed by SKU. Texts and specs are illustrative only.
 * `gallery` lists extra views; the listing image is always shown first.
 */
const IMG = 'catalogo/products';

const DATASHEET: ProductFile = { type: 'datasheet', name: 'Ficha técnica', sizeLabel: 'PDF · 1,2 MB' };
const MANUAL: ProductFile = { type: 'manual', name: 'Manual de instalación', sizeLabel: 'PDF · 4,8 MB' };

export const PRODUCT_DETAILS: Readonly<Record<string, ProductDetailExtra>> = {
  '3051CD2A02A1AH2B2': {
    description:
      'Transmisor de presión diferencial para medición de caudal, nivel y presión en aplicaciones de proceso. Ofrece alta precisión y estabilidad a largo plazo, comunicación HART y pantalla LCD local para configuración y diagnóstico en campo.',
    specs: [
      { label: 'Tipo de medición', value: 'Presión diferencial' },
      { label: 'Rango', value: '0–250 inH2O (0–623 mbar)' },
      { label: 'Precisión', value: '±0,065 % del span' },
      { label: 'Salida', value: '4–20 mA con HART' },
      { label: 'Conexión a proceso', value: '1/4" NPT, brida coplanar' },
      { label: 'Material en contacto', value: 'Acero inoxidable 316L' },
      { label: 'Alimentación', value: '10,5–42,4 V DC' },
      { label: 'Protección', value: 'IP66 / IP68' },
    ],
    gallery: [`${IMG}/pressure-transmitter-side.webp`, `${IMG}/pressure-transmitter-display.webp`],
    files: [DATASHEET, MANUAL],
    stockQty: 12,
  },
  '232.50.100-160B': {
    description:
      'Manómetro de tubo Bourdon en acero inoxidable con llenado de glicerina, que amortigua vibraciones y pulsaciones. Ideal para la industria química, petroquímica y de alimentos.',
    specs: [
      { label: 'Diámetro de esfera', value: '100 mm' },
      { label: 'Rango', value: '0–160 bar' },
      { label: 'Clase de exactitud', value: '1,0' },
      { label: 'Conexión', value: '1/2" NPT inferior' },
      { label: 'Material', value: 'Acero inoxidable 316L' },
      { label: 'Llenado', value: 'Glicerina' },
    ],
    gallery: [],
    files: [DATASHEET],
    stockQty: 48,
  },
  'EJA110E-JMS5J': {
    description:
      'Transmisor de presión diferencial con sensor de silicio resonante, que ofrece alta estabilidad y respuesta rápida. Apto para medición de caudal con placa orificio y medición de nivel.',
    specs: [
      { label: 'Tipo de medición', value: 'Presión diferencial' },
      { label: 'Rango', value: '0,5–100 kPa' },
      { label: 'Precisión', value: '±0,055 % del span' },
      { label: 'Salida', value: '4–20 mA con HART' },
      { label: 'Material en contacto', value: 'Acero inoxidable 316L' },
    ],
    gallery: [],
    files: [DATASHEET, MANUAL],
    stockQty: 0,
  },
  'TC-K-18': {
    description:
      'Termopar tipo K con cabezal de conexión en aluminio y vaina de acero inoxidable de 18". Para medición de temperatura en hornos, calderas y procesos industriales.',
    specs: [
      { label: 'Tipo', value: 'Termopar tipo K' },
      { label: 'Rango', value: '-40 a 1.100 °C' },
      { label: 'Longitud de vaina', value: '18" (457 mm)' },
      { label: 'Diámetro', value: '1/4"' },
      { label: 'Cabezal', value: 'Aluminio, IP65' },
    ],
    gallery: [],
    files: [DATASHEET],
    stockQty: 0,
  },
  'TR10-B-PT100': {
    description:
      'Sensor RTD Pt100 con termopozo, diseñado para medición de temperatura de alta precisión en tuberías y recipientes a presión.',
    specs: [
      { label: 'Elemento', value: 'Pt100 clase A, 3 hilos' },
      { label: 'Rango', value: '-50 a 450 °C' },
      { label: 'Termopozo', value: 'Acero inoxidable 316' },
      { label: 'Conexión', value: '1/2" NPT' },
    ],
    gallery: [],
    files: [DATASHEET, MANUAL],
    stockQty: 20,
  },
  '7ME6910-1AA10-1AA0': {
    description:
      'Transmisor para medidores de flujo electromagnéticos, para agua, aguas residuales y químicos. Ofrece alta precisión, diagnóstico avanzado y totalizadores integrados.',
    specs: [
      { label: 'Principio', value: 'Electromagnético' },
      { label: 'Precisión', value: '±0,4 % del caudal' },
      { label: 'Salidas', value: '4–20 mA, pulsos, relé' },
      { label: 'Alimentación', value: '115–230 V AC' },
      { label: 'Protección', value: 'IP67' },
    ],
    gallery: [`${IMG}/flowmeter-side.webp`],
    files: [DATASHEET, MANUAL],
    stockQty: 4,
  },
  '10W2H-UD0A1AA0A4AA': {
    description:
      'Medidor de caudal electromagnético para aplicaciones de agua y aguas residuales, con revestimiento de goma dura y electrodos de acero inoxidable.',
    specs: [
      { label: 'Principio', value: 'Electromagnético' },
      { label: 'Diámetro nominal', value: 'DN 50 (2")' },
      { label: 'Precisión', value: '±0,5 % del caudal' },
      { label: 'Revestimiento', value: 'Goma dura' },
      { label: 'Salida', value: '4–20 mA con HART' },
    ],
    gallery: [`${IMG}/flowmeter-side.webp`],
    files: [DATASHEET],
    stockQty: 0,
  },
  'PS64.XXAGDHKMXX': {
    description:
      'Sensor de nivel por radar de 80 GHz para medición continua de líquidos, incluso en tanques pequeños y con agitadores. Su haz enfocado evita interferencias internas.',
    specs: [
      { label: 'Frecuencia', value: '80 GHz' },
      { label: 'Rango de medición', value: 'Hasta 30 m' },
      { label: 'Precisión', value: '±1 mm' },
      { label: 'Temperatura de proceso', value: '-40 a 200 °C' },
      { label: 'Salida', value: '4–20 mA con HART' },
    ],
    gallery: [],
    files: [DATASHEET, MANUAL],
    stockQty: 6,
  },
  'ET-2IN-667': {
    description:
      'Válvula de control tipo globo con actuador neumático de diafragma, para control de caudal preciso en servicios generales, vapor y líquidos.',
    specs: [
      { label: 'Tamaño', value: '2"' },
      { label: 'Clase', value: 'ANSI 300' },
      { label: 'Cuerpo', value: 'Acero al carbono WCC' },
      { label: 'Actuador', value: 'Diafragma neumático 667' },
      { label: 'Característica', value: 'Isoporcentual' },
    ],
    gallery: [],
    files: [DATASHEET, MANUAL],
    stockQty: 0,
  },
  DVC6200: {
    description:
      'Posicionador digital de válvula con comunicación HART, diagnóstico en línea y calibración automática. Compatible con actuadores lineales y rotativos.',
    specs: [
      { label: 'Comunicación', value: 'HART 4–20 mA' },
      { label: 'Tipo de actuador', value: 'Lineal y rotativo' },
      { label: 'Carcasa', value: 'Aluminio, IP66' },
      { label: 'Temperatura', value: '-40 a 85 °C' },
    ],
    gallery: [],
    files: [DATASHEET, MANUAL],
    stockQty: 0,
  },
  '6ES7214-1AG40-0XB0': {
    description:
      'CPU compacta con entradas y salidas digitales y analógicas integradas, puerto PROFINET y servidor web. Ideal para automatización de máquinas y procesos pequeños.',
    specs: [
      { label: 'Memoria de trabajo', value: '100 KB' },
      { label: 'E/S integradas', value: '14 DI / 10 DO / 2 AI' },
      { label: 'Comunicación', value: 'PROFINET' },
      { label: 'Alimentación', value: '24 V DC' },
    ],
    gallery: [],
    files: [DATASHEET, MANUAL],
    stockQty: 15,
  },
  '1769-L33ER': {
    description:
      'Controlador CompactLogix con doble puerto EtherNet/IP y capacidad para hasta 32 nodos. Para aplicaciones de control de nivel medio.',
    specs: [
      { label: 'Memoria de usuario', value: '2 MB' },
      { label: 'Nodos EtherNet/IP', value: '32' },
      { label: 'Módulos de E/S locales', value: 'Hasta 16' },
      { label: 'Puertos', value: '2 × EtherNet/IP, USB' },
    ],
    gallery: [],
    files: [DATASHEET, MANUAL],
    stockQty: 3,
  },
};

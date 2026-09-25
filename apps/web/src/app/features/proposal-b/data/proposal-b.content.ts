/**
 * Editorial content for proposal B. In the real platform the category guides map to
 * the editable SEO landing texts (requirements 5.2 / 5.7). Advisors are placeholders:
 * names, roles and photos must come from the client.
 */

export interface CategoryGuide {
  readonly question: string;
  readonly intro: string;
  readonly howToChoose: readonly string[];
  readonly faq: readonly { readonly q: string; readonly a: string }[];
}

export interface Advisor {
  readonly initials: string;
  readonly role: string;
  readonly specialty: string;
}

export const CATEGORY_GUIDES: Readonly<Record<string, CategoryGuide>> = {
  presion: {
    question: '¿Necesitas medir presión?',
    intro:
      'La medición de presión es la base del control de procesos: protege equipos, asegura la calidad y permite calcular caudal y nivel. Ofrecemos desde manómetros mecánicos hasta transmisores inteligentes con comunicación digital.',
    howToChoose: [
      'Define si necesitas presión manométrica, absoluta o diferencial.',
      'Confirma el rango de trabajo y la presión máxima del proceso.',
      'Revisa la compatibilidad del material con el fluido.',
      'Elige la salida: indicación local, 4–20 mA o HART.',
    ],
    faq: [
      {
        q: '¿Cuándo uso un transmisor en lugar de un manómetro?',
        a: 'Cuando necesitas enviar la medición a un sistema de control o registrarla. El manómetro solo indica en campo.',
      },
      {
        q: '¿Para qué sirve el llenado de glicerina?',
        a: 'Amortigua vibraciones y pulsaciones, protege el mecanismo y facilita la lectura.',
      },
    ],
  },
  temperatura: {
    question: '¿Necesitas medir temperatura?',
    intro:
      'Termopares y RTD cubren desde procesos criogénicos hasta hornos industriales. La elección correcta del sensor y del termopozo define la precisión y la vida útil de la medición.',
    howToChoose: [
      'Para alta temperatura (más de 450 °C), usa termopar.',
      'Para mayor precisión y estabilidad, usa RTD Pt100.',
      'Define la longitud de inserción y el tipo de conexión.',
      'Usa termopozo cuando el proceso esté presurizado o sea abrasivo.',
    ],
    faq: [
      {
        q: '¿Qué diferencia hay entre un termopar tipo K y un RTD?',
        a: 'El tipo K alcanza temperaturas más altas; el RTD es más preciso y estable en rangos moderados.',
      },
    ],
  },
  caudal: {
    question: '¿Necesitas medir caudal?',
    intro:
      'Medir el caudal permite controlar dosificación, consumo y balance de planta. Los medidores electromagnéticos no tienen partes móviles y son ideales para agua y líquidos conductivos.',
    howToChoose: [
      'Confirma que el fluido sea conductivo si usas un medidor electromagnético.',
      'Define el diámetro de la tubería y el rango de caudal.',
      'Elige el revestimiento según la abrasión y la química del fluido.',
      'Verifica los tramos rectos disponibles antes y después del medidor.',
    ],
    faq: [
      {
        q: '¿Un medidor electromagnético sirve para hidrocarburos?',
        a: 'No. Requiere fluidos conductivos; para hidrocarburos se usan tecnologías como Coriolis o vórtex.',
      },
    ],
  },
  nivel: {
    question: '¿Necesitas medir nivel?',
    intro:
      'El radar de 80 GHz mide nivel sin contacto, con alta precisión y sin verse afectado por vapor, temperatura ni presión. Es la opción moderna para tanques de almacenamiento y de proceso.',
    howToChoose: [
      'Define si mides un líquido o un sólido.',
      'Revisa la altura del tanque y los elementos internos (agitadores, serpentines).',
      'Considera la conexión disponible en el techo del tanque.',
      'Elige la salida y la comunicación que necesita tu sistema.',
    ],
    faq: [
      {
        q: '¿Por qué 80 GHz y no 26 GHz?',
        a: 'El haz es más enfocado: evita interferencias con elementos internos y permite conexiones más pequeñas.',
      },
    ],
  },
  valvulas: {
    question: '¿Necesitas controlar un proceso?',
    intro:
      'La válvula de control es el elemento final del lazo: de su selección depende la estabilidad del proceso. Suministramos válvulas, actuadores y posicionadores digitales de fabricantes líderes.',
    howToChoose: [
      'Calcula el coeficiente de caudal (Cv) requerido.',
      'Define la característica: isoporcentual o lineal.',
      'Selecciona la clase de presión y el material del cuerpo.',
      'Añade un posicionador digital para diagnóstico y precisión.',
    ],
    faq: [
      {
        q: '¿Qué ventaja tiene un posicionador digital?',
        a: 'Mejora la precisión, permite calibración automática y ofrece diagnóstico del estado de la válvula.',
      },
    ],
  },
  automatizacion: {
    question: '¿Necesitas automatizar?',
    intro:
      'Desde CPU compactas para máquinas hasta controladores modulares para planta, te ayudamos a elegir la plataforma adecuada para tu aplicación y tu equipo de mantenimiento.',
    howToChoose: [
      'Cuenta las entradas y salidas digitales y analógicas.',
      'Define el protocolo de comunicación de tu planta.',
      'Considera la plataforma que ya conoce tu equipo.',
      'Prevé espacio para ampliaciones futuras.',
    ],
    faq: [
      {
        q: '¿CPU compacta o controlador modular?',
        a: 'La compacta es ideal para máquinas y procesos pequeños; el modular escala mejor en plantas con muchas señales.',
      },
    ],
  },
};

/** Application photo per category (instrument installed in a real process). */
export const CATEGORY_PHOTOS: Readonly<Record<string, string>> = {
  presion: 'propuesta-b/cat-presion.webp',
  temperatura: 'propuesta-b/cat-temperatura.webp',
  caudal: 'propuesta-b/cat-caudal.webp',
  nivel: 'propuesta-b/cat-nivel.webp',
  valvulas: 'propuesta-b/cat-valvulas.webp',
  automatizacion: 'propuesta-b/cat-automatizacion.webp',
};

export const ADVISORS: readonly Advisor[] = [
  { initials: 'PC', role: 'Asesor técnico', specialty: 'Presión, caudal y nivel' },
  { initials: 'TV', role: 'Asesor técnico', specialty: 'Temperatura y válvulas de control' },
  { initials: 'AU', role: 'Asesor técnico', specialty: 'Automatización y PLC' },
];

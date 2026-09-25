import { Proposal } from '../../../core/models/proposal.model';

/** Static proposal catalog. Update here to activate or edit a proposal. */
export const PROPOSALS: readonly Proposal[] = [
  {
    id: 'a',
    code: 'Propuesta A',
    title: 'Landing institucional + catálogo con buscador',
    summary:
      'Una landing informativa con productos destacados que lleva al catálogo. El catálogo pone la búsqueda por SKU con autocompletado en primer plano, con filtros por facetas.',
    highlights: ['Landing informativa', 'Búsqueda por SKU', 'Filtros con conteo'],
    status: 'ready',
    thumbnail: 'propuestas/propuesta-a-thumb.webp',
  },
  {
    id: 'b',
    code: 'Propuesta B',
    title: 'Soluciones por aplicación',
    summary:
      'Recorrido guiado con fotografía de planta: primero qué necesitas medir, luego el tipo de equipo y al final el producto, con guías de selección y asesores técnicos en cada paso.',
    highlights: ['Guías de selección', 'Asesoría técnica', 'Diseño editorial'],
    status: 'ready',
    thumbnail: 'propuesta-b/hero.webp',
  },
  {
    id: 'c',
    code: 'Propuesta C',
    title: 'Showroom de marcas',
    summary:
      'Estética industrial oscura con la marca como eje: compra por fabricante, búsqueda por código, catálogo en tarjetas o tabla y pedido rápido por lista de referencias.',
    highlights: ['Compra por marca', 'Búsqueda por código', 'Pedido rápido'],
    status: 'ready',
    thumbnail: 'propuesta-c/hero.webp',
  },
];

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { PA_PATHS } from '../../proposal-a.paths';
import { Icon, IconName } from '@shared/ui/icon/icon';
import { ProductCard } from '../../components/product-card/product-card';

interface Highlight {
  readonly icon: IconName;
  readonly title: string;
  readonly text: string;
}

interface Stat {
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, Icon, ProductCard],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  private readonly catalog = inject(CatalogService);

  protected readonly catalogPath = PA_PATHS.catalog;
  protected readonly exchangeRateDate = this.catalog.exchangeRateDate;
  protected readonly categories = this.catalog.getCategories();
  protected readonly featured = this.catalog.getFeatured();
  protected readonly brands = this.catalog.getBrands();

  protected readonly stats: readonly Stat[] = [
    { value: '+200', label: 'marcas representadas' },
    { value: '+1.000', label: 'referencias en catálogo' },
    { value: '3', label: 'países con presencia comercial' },
  ];

  protected readonly values: readonly Highlight[] = [
    {
      icon: 'award',
      title: 'Marcas líderes',
      text: 'Instrumentos originales de fabricantes reconocidos en la industria de procesos.',
    },
    {
      icon: 'file',
      title: 'Información técnica',
      text: 'Fichas técnicas y manuales descargables en cada producto.',
    },
    {
      icon: 'shield',
      title: 'Compra segura',
      text: 'Cada pago es verificado por nuestro equipo antes de procesar tu pedido.',
    },
    {
      icon: 'globe',
      title: 'Presencia regional',
      text: 'Atención comercial en Venezuela, Panamá y Estados Unidos.',
    },
  ];

  protected readonly steps: readonly Highlight[] = [
    {
      icon: 'search',
      title: 'Busca y agrega',
      text: 'Encuentra la referencia exacta y agrégala al carrito.',
    },
    { icon: 'file', title: 'Genera tu pedido', text: 'Confirma tu pedido con precios congelados.' },
    {
      icon: 'card',
      title: 'Declara tu pago',
      text: 'Zelle, pago móvil, transferencia o efectivo. Sube tu comprobante.',
    },
    {
      icon: 'truck',
      title: 'Verificamos y despachamos',
      text: 'Confirmamos el pago y preparamos tu envío.',
    },
  ];
}

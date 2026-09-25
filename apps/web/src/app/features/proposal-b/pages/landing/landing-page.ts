import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { buildWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { AdvisorCard } from '../../components/advisor-card/advisor-card';
import { ProductCardB } from '../../components/product-card-b/product-card-b';
import { ADVISORS, CATEGORY_GUIDES, CATEGORY_PHOTOS } from '../../data/proposal-b.content';
import { PB_PATHS } from '../../proposal-b.paths';

@Component({
  selector: 'app-landing-page-b',
  imports: [RouterLink, Icon, AdvisorCard, ProductCardB],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageB {
  protected readonly catalog = inject(CatalogService);

  protected readonly paths = PB_PATHS;
  protected readonly advisors = ADVISORS;
  protected readonly brands = this.catalog.getBrands();
  protected readonly featured = this.catalog.getFeatured();

  protected readonly variables = this.catalog.getCategories().map((category) => ({
    ...category,
    photo: CATEGORY_PHOTOS[category.slug] ?? category.image,
    question: CATEGORY_GUIDES[category.slug]?.question ?? category.name,
    count: this.catalog.countBy('categorySlug', category.slug),
  }));

  protected readonly steps = [
    {
      title: 'Cuéntanos tu proceso',
      text: 'Qué quieres medir o controlar, el fluido, el rango y las condiciones de operación.',
    },
    {
      title: 'Te recomendamos el equipo',
      text: 'Un asesor técnico te propone la referencia adecuada, con su ficha técnica.',
    },
    {
      title: 'Compra con pago verificado',
      text: 'Generas tu pedido en línea, declaras tu pago y nuestro equipo lo confirma.',
    },
  ] as const;

  protected readonly whatsappUrl = computed(() =>
    buildWhatsappUrl(
      this.catalog.whatsappNumber,
      'Hola, necesito asesoría para seleccionar un equipo para mi proceso.',
    ),
  );
}

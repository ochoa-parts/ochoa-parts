import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';

/** Main image + thumbnail strip. Resets to the first image when the product changes. */
@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGallery {
  readonly images = input.required<readonly string[]>();
  readonly alt = input.required<string>();

  protected readonly activeIndex = linkedSignal({ source: this.images, computation: () => 0 });
  protected readonly activeImage = computed(() => this.images()[this.activeIndex()]);
  protected readonly hasMany = computed(() => this.images().length > 1);

  protected select(index: number): void {
    this.activeIndex.set(index);
  }

  protected step(delta: number): void {
    const total = this.images().length;
    this.activeIndex.update((index) => (index + delta + total) % total);
  }
}

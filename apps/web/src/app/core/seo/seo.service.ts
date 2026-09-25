import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageSeo {
  readonly title: string;
  readonly description: string;
  readonly canonicalUrl: string;
  readonly image?: string;
  readonly type?: 'website' | 'product';
}

const JSON_LD_ATTR = 'data-seo-jsonld';

/**
 * Writes title, meta description, canonical, Open Graph and JSON-LD into <head>.
 * Works during SSR, so crawlers receive the tags without executing JavaScript.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  setPage(seo: PageSeo): void {
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: seo.canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: seo.type ?? 'website' });
    if (seo.image) this.meta.updateTag({ property: 'og:image', content: seo.image });
    this.setCanonical(seo.canonicalUrl);
  }

  /** Removes page-specific tags so they do not leak into the next route. */
  clearPage(): void {
    this.meta.removeTag('name="description"');
    ['og:title', 'og:description', 'og:url', 'og:type', 'og:image'].forEach((property) =>
      this.meta.removeTag(`property="${property}"`),
    );
    this.document.head.querySelector('link[rel="canonical"]')?.remove();
  }

  /** Replaces the JSON-LD block identified by `id`. */
  setJsonLd(id: string, data: object): void {
    this.removeJsonLd(id);
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(JSON_LD_ATTR, id);
    // Escape "<" so data can never close the script tag (XSS hardening).
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }

  removeJsonLd(id: string): void {
    this.document.head.querySelector(`script[${JSON_LD_ATTR}="${id}"]`)?.remove();
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}

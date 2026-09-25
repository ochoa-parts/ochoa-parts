import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CatalogService } from '@shared/catalog/data/catalog.service';
import { buildWhatsappUrl } from '@shared/catalog/whatsapp';
import { Icon } from '@shared/ui/icon/icon';
import { Advisor } from '../../data/proposal-b.content';

/** Human advisor with a WhatsApp shortcut. Content is a placeholder until the client provides it. */
@Component({
  selector: 'app-advisor-card',
  imports: [Icon],
  template: `
    <article class="advisor" [class.advisor--compact]="compact()">
      <span class="advisor__avatar" aria-hidden="true">{{ advisor().initials }}</span>
      <div class="advisor__body">
        <h3>{{ advisor().role }}</h3>
        <p>{{ advisor().specialty }}</p>
        <a class="advisor__cta" [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer">
          <app-icon name="chat" [size]="16" /> Escribir por WhatsApp
        </a>
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }

    .advisor {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      padding: 22px;
      background: var(--pb-surface);
      border: 1px solid var(--pb-line);
      border-radius: var(--pb-radius);
      color: var(--pb-ink);
    }

    .advisor__avatar {
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
      flex-shrink: 0;
      border-radius: 50%;
      background: var(--pb-petrol);
      color: var(--pb-amber);
      font-family: var(--pb-serif);
      font-size: 1.25rem;
      font-weight: 700;
    }

    h3 {
      margin: 0 0 4px;
      font-size: 1.125rem;
    }

    p {
      margin: 0 0 12px;
      color: var(--pb-muted);
      font-size: 0.9375rem;
    }

    .advisor__cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
      font-size: 0.875rem;
      color: #17803f;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .advisor--compact {
      padding: 16px;

      .advisor__avatar {
        width: 44px;
        height: 44px;
        font-size: 1rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvisorCard {
  private readonly whatsappNumber = inject(CatalogService).whatsappNumber;

  readonly advisor = input.required<Advisor>();
  readonly compact = input(false);
  /** Optional context appended to the WhatsApp message (e.g. product SKU). */
  readonly context = input('');

  protected readonly whatsappUrl = computed(() => {
    const base = `Hola, quisiera asesoría técnica (${this.advisor().specialty}).`;
    return buildWhatsappUrl(this.whatsappNumber, this.context() ? `${base} ${this.context()}` : base);
  });
}

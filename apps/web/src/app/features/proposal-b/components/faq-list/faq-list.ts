import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

/** Native <details> accordion: accessible and fully present in the SSR HTML. */
@Component({
  selector: 'app-faq-list',
  template: `
    <div class="faq">
      @for (item of items(); track item.q) {
        <details class="faq__item">
          <summary>{{ item.q }}</summary>
          <p>{{ item.a }}</p>
        </details>
      }
    </div>
  `,
  styles: `
    .faq {
      border-top: 1px solid var(--pb-line);
    }

    .faq__item {
      border-bottom: 1px solid var(--pb-line);

      summary {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding: 18px 0;
        font-family: var(--pb-serif);
        font-size: 1.125rem;
        font-weight: 600;
        cursor: pointer;
        list-style: none;

        &::-webkit-details-marker {
          display: none;
        }

        &::after {
          content: '+';
          color: var(--pb-petrol);
          font-family: var(--pb-sans);
          font-size: 1.375rem;
          line-height: 1;
        }
      }

      &[open] summary::after {
        content: '−';
      }

      p {
        margin: 0 0 18px;
        max-width: 720px;
        color: var(--pb-muted);
        line-height: 1.6;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqList {
  readonly items = input.required<readonly FaqItem[]>();
}

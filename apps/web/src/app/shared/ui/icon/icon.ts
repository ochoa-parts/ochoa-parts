import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const ICONS = {
  search: ['M21 21l-4.35-4.35', 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z'],
  cart: [
    'M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6',
    'M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
    'M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  ],
  heart: [
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z',
  ],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  arrowLeft: ['M19 12H5', 'M12 19l-7-7 7-7'],
  pin: [
    'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z',
    'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  ],
  chat: ['M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2-5.5A8.4 8.4 0 1 1 21 11.5z'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  file: [
    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
    'M14 2v6h6',
    'M16 13H8',
    'M16 17H8',
  ],
  truck: [
    'M1 3h15v13H1z',
    'M16 8h4l3 3v5h-7V8z',
    'M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    'M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  ],
  award: ['M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M8.2 13.9L7 23l5-3 5 3-1.2-9.1'],
  globe: [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'M2 12h20',
    'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  ],
  dollar: ['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  card: ['M1 4h22v16H1z', 'M1 10h22'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54z'],
  close: ['M18 6L6 18', 'M6 6l12 12'],
  package: [
    'M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z',
    'M3.3 7L12 12l8.7-5',
    'M12 22V12',
  ],
  phone: [
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
  ],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;

/** Inline stroke icon set (Lucide-style). Decorative: hidden from assistive tech. */
@Component({
  selector: 'app-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);

  protected readonly paths = computed(() => ICONS[this.name()]);
}

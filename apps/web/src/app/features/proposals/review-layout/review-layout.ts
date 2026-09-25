import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

/** Internal review shell for the proposals panel and placeholder detail pages. */
@Component({
  selector: 'app-review-layout',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="topbar">
      <div class="container topbar__inner">
        <a class="brand" routerLink="/">OCHOA <span class="brand__accent">PARTS</span></a>
        <span class="topbar__label">Revisión interna</span>
      </div>
    </header>

    <main class="container">
      <router-outlet />
    </main>

    <footer class="footer">
      <div class="container">Inversiones Ochoa Parts, C.A. · Documento de trabajo, no publicar</div>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
    }

    .topbar {
      background: var(--color-navy);
      color: #fff;
    }

    .topbar__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
    }

    .brand {
      font-weight: 800;
      letter-spacing: 0.04em;
      color: inherit;
      text-decoration: none;
    }

    .brand__accent {
      color: var(--color-amber);
    }

    .topbar__label {
      font-size: 0.8125rem;
      opacity: 0.8;
    }

    .footer {
      padding: 20px 0;
      border-top: 1px solid var(--color-border);
      font-size: 0.8125rem;
      color: var(--color-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewLayout {}

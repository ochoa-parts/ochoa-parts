import { Routes } from '@angular/router';

export const PROPOSAL_A_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/proposal-a-layout').then((m) => m.ProposalALayout),
    children: [
      {
        path: '',
        title: 'Ochoa Parts · Instrumentación y control industrial',
        loadComponent: () => import('./pages/landing/landing-page').then((m) => m.LandingPage),
      },
      {
        path: 'catalogo',
        title: 'Catálogo · Ochoa Parts',
        loadComponent: () => import('./pages/catalog/catalog-page').then((m) => m.CatalogPage),
      },
      {
        path: 'producto/:slug',
        loadComponent: () => import('./pages/product/product-page').then((m) => m.ProductPage),
      },
    ],
  },
];

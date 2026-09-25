import { Routes } from '@angular/router';

export const PROPOSAL_B_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/proposal-b-layout').then((m) => m.ProposalBLayout),
    children: [
      {
        path: '',
        title: 'Ochoa Parts · Ingeniería de proceso',
        loadComponent: () => import('./pages/landing/landing-page').then((m) => m.LandingPageB),
      },
      {
        path: 'catalogo',
        title: 'Soluciones · Ochoa Parts',
        loadComponent: () => import('./pages/catalog/catalog-page').then((m) => m.CatalogPageB),
      },
      {
        path: 'producto/:slug',
        loadComponent: () => import('./pages/product/product-page').then((m) => m.ProductPageB),
      },
    ],
  },
];

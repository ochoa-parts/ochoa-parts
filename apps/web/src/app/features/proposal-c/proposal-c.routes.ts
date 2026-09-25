import { Routes } from '@angular/router';

export const PROPOSAL_C_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/proposal-c-layout').then((m) => m.ProposalCLayout),
    children: [
      {
        path: '',
        title: 'Ochoa Parts · Mostrador técnico',
        loadComponent: () => import('./pages/landing/landing-page').then((m) => m.LandingPageC),
      },
      {
        path: 'catalogo',
        title: 'Catálogo · Ochoa Parts',
        loadComponent: () => import('./pages/catalog/catalog-page').then((m) => m.CatalogPageC),
      },
      {
        path: 'producto/:slug',
        loadComponent: () => import('./pages/product/product-page').then((m) => m.ProductPageC),
      },
    ],
  },
];

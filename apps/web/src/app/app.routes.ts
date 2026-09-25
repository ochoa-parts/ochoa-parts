import { Routes } from '@angular/router';

export const routes: Routes = [
  // Each proposal is a full public site (landing + catalog + product) with its own layout.
  {
    path: 'propuesta/a',
    loadChildren: () =>
      import('./features/proposal-a/proposal-a.routes').then((m) => m.PROPOSAL_A_ROUTES),
  },
  {
    path: 'propuesta/b',
    loadChildren: () =>
      import('./features/proposal-b/proposal-b.routes').then((m) => m.PROPOSAL_B_ROUTES),
  },
  {
    path: 'propuesta/c',
    loadChildren: () =>
      import('./features/proposal-c/proposal-c.routes').then((m) => m.PROPOSAL_C_ROUTES),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/proposals/review-layout/review-layout').then((m) => m.ReviewLayout),
    children: [
      {
        path: '',
        title: 'Propuestas Ochoa Parts',
        loadComponent: () =>
          import('./features/proposals/proposal-panel/proposal-panel').then(
            (m) => m.ProposalPanel,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

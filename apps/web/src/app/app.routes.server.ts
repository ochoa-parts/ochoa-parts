import { RenderMode, ServerRoute } from '@angular/ssr';

/** Proposals with a full public site (landing + catalog + product). */
const SITE_PROPOSALS = ['a', 'b', 'c'] as const;

export const serverRoutes: ServerRoute[] = [
  ...SITE_PROPOSALS.flatMap((id): ServerRoute[] => [
    // Catalog depends on query params (?q, ?cat, ?sub, ?brand): rendered per request.
    { path: `propuesta/${id}/catalogo`, renderMode: RenderMode.Server },
    // Product pages: server-rendered per request (cached by Cloudflare in production).
    { path: `propuesta/${id}/producto/:slug`, renderMode: RenderMode.Server },
  ]),
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

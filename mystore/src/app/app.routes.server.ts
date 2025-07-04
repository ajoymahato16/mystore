import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {path: '', renderMode: RenderMode.Prerender },
  { path: 'product', renderMode: RenderMode.Prerender },
  { path: 'products/:id', renderMode: RenderMode.Prerender },
  { path: 'featureProducts/:id', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  {
    
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

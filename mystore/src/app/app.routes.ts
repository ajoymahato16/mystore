import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'product',
        loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./pages/product/product.details/product.details.component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'featureProducts/:id',
        loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
      },
     
];

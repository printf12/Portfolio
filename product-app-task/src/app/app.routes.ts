import { Routes } from '@angular/router';
import { ProductDetailsViewComponent } from './components/product-details-view/product-details-view.component';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';

export const routes: Routes = [
    { path: 'products', component: ProductListViewComponent }, // Add route for product list
    { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect root to /products
];

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';

export const productState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  productState,
  (state: ProductState) => state.products
);

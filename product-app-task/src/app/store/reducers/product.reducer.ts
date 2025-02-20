import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { Product } from '../models/product.model';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null
};

export const productReducer = createReducer(
    initialState,
    on(ProductActions.loadProducts, state => ({ ...state, isLoading: true, error: null })),
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
      ...state,
      products,
      isLoading: false
    })),
    on(ProductActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error
    })))
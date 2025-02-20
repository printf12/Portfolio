import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService 
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts), // ✅ Ensure this action is dispatched
      tap(() => console.log("Effect triggered: loadProducts")), // ✅ Debugging
      mergeMap(() =>
        this.productService.loadProducts().pipe(
          tap(() => console.log("API Call Executed")), // ✅ Debugging
          map(products => loadProductsSuccess({ products })),
          catchError(error => {
            console.error("API Error:", error);
            return of(loadProductsFailure({ error }));
          })
        )
      )
    )
  );
}

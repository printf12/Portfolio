import { Component, OnInit, inject, computed } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadProduct } from '../../store/actions/product.actions';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectProduct, selectProductError, selectProductLoading } from '../../store/selectors/product.selectors';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-details-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './product-details-view.component.html',
  styleUrls: ['./product-details-view.component.scss']
})
export class ProductDetailsViewComponent implements OnInit {
  private store = inject(Store);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);

  product$ = toSignal(this.store.pipe(select(selectProduct)), { initialValue: null });
  loading$ = toSignal(this.store.pipe(select(selectProductLoading)), { initialValue: false });
  error$ = toSignal(this.store.pipe(select(selectProductError)), { initialValue: null });

  mainImage = computed(() => this.product$()?.thumbnail ?? '');

  ngOnInit(): void {
    const productId = this.getProductIdFromRoute();
    if (productId) {
      this.loadProductDetails(productId);
    }
  }

   /**
   * Extracts the product ID from the route parameters.
   * @returns The product ID as a number, or `null` if not found.
   */
  private getProductIdFromRoute(): number | null {
    return Number(this.activatedRoute.snapshot.paramMap.get('id')) || null;
  }

  /**
   * Dispatches an action to load the product data from the store.
   * @param productId The ID of the product to fetch.
   */
  private loadProductDetails(productId: number): void {
    this.store.dispatch(loadProduct({ id: productId }));
  }

  /**
   * Navigates back to the previous page.
   */
  goBack(): void {
    this.location.back();
  }
}

import { Component, OnInit, computed, inject, effect, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { loadProducts } from '../../store/actions/product.actions';
import {  
  selectProducts, 
  selectProductsError, 
  selectProductsLoading, 
  selectSearchQuery, 
  selectSkip, 
  selectTotalProducts
} from '../../store/selectors/product.selectors';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatProgressSpinnerModule
  ]
})
export class ProductListViewComponent implements OnInit {
  
  private store = inject(Store);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  products$ = toSignal(this.store.select(selectProducts), { initialValue: [] });
  loading$ = toSignal(this.store.select(selectProductsLoading), { initialValue: false });
  error$ = toSignal(this.store.select(selectProductsError), { initialValue: null });
  total$ = toSignal(this.store.select(selectTotalProducts), { initialValue: 0 });
  searchQuery$ = toSignal(this.store.select(selectSearchQuery), { initialValue: '' });
  skip$ = toSignal(this.store.select(selectSkip), { initialValue: 0 });

  searchQuery = signal(this.searchQuery$()); 
  skip = signal(this.skip$());

  limit = 20;
  currentPage = computed(() => Math.floor(this.skip() / this.limit) + 1); 
  totalPages = computed(() => Math.ceil(this.total$() / this.limit));

  searchForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    this.restoreState();
    this.setupSearchListener();
  }

  /**
   * Initializes the search form with the existing search query
   */
  private initializeForm(): void {
    this.searchForm = this.formBuilder.group({
      search: [this.searchQuery$()] // Prefill search input with the current search query
    });
  }

  /**
   * Restores the last known state of the search input and loads products
   */
  private restoreState(): void {
    this.searchForm.patchValue({ search: this.searchQuery$() }, { emitEvent: false });
    this.loadProducts();
  }

  /**
   * Listens for changes in the search input and triggers a product search with debounce
   */
  private setupSearchListener(): void {
    effect(() => {
      this.searchForm.get('search')?.valueChanges.pipe(
        debounceTime(300), // Prevents excessive API calls by waiting 300ms
        distinctUntilChanged() // Only triggers if the value has actually changed
      ).subscribe(searchQuery => {
        this.searchQuery.set(searchQuery); // Update search query
        this.skip.set(0); // Reset pagination
        this.loadProducts(); // Fetch new product results
      });
    });
  }

  /**
   * Dispatches an action to load products based on the current search query and pagination
   */
  loadProducts(): void {
    this.store.dispatch(loadProducts({ searchQuery: this.searchQuery(), limit: this.limit, skip: this.skip() }));
  }

  /**
   * Navigates to the product details page
   * @param productId - The ID of the product to view
   */
  loadProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  /**
   * Loads the next page of products if available
   */
  nextProductPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.skip.set(this.currentPage() * this.limit);
      this.loadProducts();
    }
  }

  /**
   * Loads the previous page of products if possible
   */
  previousProductPage(): void {
    if (this.currentPage() > 1) {
      this.skip.set((this.currentPage() - 2) * this.limit);
      this.loadProducts();
    }
  }

  /**
   * Checks whether the "Next Page" button should be disabled
   * @returns `true` if on the last page, otherwise `false`
   */
  isNextPageDisabled(): boolean {
    return this.currentPage() >= this.totalPages();
  }

  /**
   * Reloads the product list in case of an error
   */
  retry(): void {
    this.loadProducts();
  }
}

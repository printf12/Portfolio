import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../store/models/product.model';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../store/selectors/product.selectors';
import { loadProducts } from '../../store/actions/product.actions';

@Component({
  selector: 'app-product-list-view',
  imports: [],
  templateUrl: './product-list-view.component.html',
  styleUrl: './product-list-view.component.scss',

})
export class ProductListViewComponent {

  products$: Observable<Product[]>;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectProducts);
  }

  public ngOnInit(): void {
    console.log("load products")
    this.store.dispatch(loadProducts());
  }



}

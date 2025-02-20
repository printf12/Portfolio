import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../store/models/product.model';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  public loadProducts(): Observable<Product[]> {
    console.log("load products")
    return this.http.get<Product[]>(this.apiUrl);
  }

}

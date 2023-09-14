import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  deleteProduct(productId: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(deleteUrl);
  }

  updateProduct(product: Product): Observable<Product> {
    const updateUrl = `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(updateUrl, product);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}

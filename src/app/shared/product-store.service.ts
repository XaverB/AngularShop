import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  getAll(offset: Number, count: Number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `/api/shop/${environment.shopId}/products?offset=${offset}&count=${count}`)
      .pipe(map<any, Product[]>(res => res), catchError(this.errorHandler));
  }

  getProductsCount(filter: String): Observable<number> {
    return this.http.get<Product[]>(
      `/api/shop/${environment.shopId}/products/count?filter=${filter}`)
      .pipe(map<any, number>(res => res.count), catchError(this.errorHandler));
  }

  search(filter: String, offset: Number, count: Number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `/api/shop/${environment.shopId}/products?filter=${filter}&offset=${offset}&count=${count}`)
      .pipe(map<any, Product[]>(res => res), catchError(this.errorHandler));
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`)
      .pipe(map<any, Product[]>(res => res), catchError(this.errorHandler));
  }

  postProduct(product: Product): Observable<any> {
    const { id, ...createProduct } = product;

    return this.http.post<Product>(`/api/product`, createProduct)
      .pipe(map<any, Product[]>(res => res), catchError(this.errorHandler));
  }

  putProduct(product: Product): Observable<any> {
    return this.http.put<Product>(`/api/product`, product)
      .pipe(map<any, Product[]>(res => res), catchError(this.errorHandler));
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`/api/product/${id}`)
      .pipe(map(res => res), catchError(this.errorHandler));
  }
}

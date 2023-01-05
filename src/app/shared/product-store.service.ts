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

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `/api/shop/${environment.shopId}/products`,
      { headers: { 'appKey': `${environment.appKey}` } })
      .pipe(map<any, Product[]>(res => res), catchError(this.errorHandler));
  }
}
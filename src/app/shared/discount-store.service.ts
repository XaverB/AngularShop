import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Discount } from './models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountStoreService {

  constructor(private http: HttpClient) { }


  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  getAvailableDiscountsByCartId(cartId: Number): Observable<Discount[]> {
    return this.http.get<Discount[]>(`/api/discount/api/cart/${cartId}/discounts`)
      .pipe(
        map<any, Discount[]>(res => res),
        catchError(this.errorHandler));
  }
}

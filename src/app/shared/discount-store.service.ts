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

  getDiscountsByShopId(shopId: Number): Observable<Discount[]> {
    return this.http.get<Discount[]>(`/api/discount/api/shop/${shopId}/discounts`)
      .pipe(
        map<any, Discount[]>(res => res),
        catchError(this.errorHandler));
  }

  applyDiscounts(cartId: number, discountIds: number[]) : Observable<any> {
    return this.http.put<any[]>(`/api/discount/api/cart/${cartId}/discounts`, discountIds )
      .pipe(
        map<any, any>(res => res),
        catchError(this.errorHandler));
  }

  deleteDiscount(discountId: number): Observable<any> {
    return this.http.delete<any[]>(`/api/discount/api/discount/${discountId}`)
    .pipe(
      map<any, any>(res => res),
      catchError(this.errorHandler));
  }
}

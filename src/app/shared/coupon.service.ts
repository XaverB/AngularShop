import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  applyCoupon(cartId: number, couponKey: string): Observable<any> {
    return this.http.put<any>(`/api/coupon/cart/${cartId}/coupon/${couponKey}`, {})
      .pipe(
        map(res => res),
        catchError(this.errorHandler));
  }
}

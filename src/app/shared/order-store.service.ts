import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  createOrder(cartId: Number): Observable<Number> {
    return this.http.post<Number>(`/api/order/cart/${cartId}/order`, {})
      .pipe(
        map<any, Number>(res => res.orderId),
        catchError(this.errorHandler));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from './models/cart';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartStoreService {

  private readonly LOCAL_STORAGE_CART = 'cart';

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }


  /**
   * Fetches a cart by sessionId
   * @param sessionId SessionId for the cart
   * @returns Cart
   */
  getCartBySessionId(sessionId: String): Observable<Cart> {
    return this.http.get<Cart>(`/api/cart/${sessionId}`)
      .pipe(
        map(res => Object.assign(new Cart(), res)),
        tap(cart => localStorage.setItem(this.LOCAL_STORAGE_CART, JSON.stringify(cart))),
        catchError(this.errorHandler));
  }

  getCartByCustomerId(customerId: Number): Observable<Cart> {
    return this.http.get<Cart>(`/api/cart/customer/${customerId}`)
    
    .pipe(
      map(res => Object.assign(new Cart(), res)),
      tap(cart => localStorage.setItem(this.LOCAL_STORAGE_CART, JSON.stringify(cart))),
      catchError(this.errorHandler));
  }

  /**
   * Creates a new cart.
   * @returns SessionId for a new cart
   */
  createCart(): Observable<String> {
    return this.http.post<String>(`/api/cart`, {})
      .pipe(
        map<any, String>(res => res.sessionId),
        catchError(this.errorHandler));
  }

  putProduct(sessionId: String, productId: Number, amount: Number): Observable<any> {
    return this.http.put<String>(`/api/cart/${sessionId}/product/${productId}?amount=${amount}`, {})
      .pipe(catchError(this.errorHandler));
  }

  deleteProduct(sessionId: String, productId: Number, amount: Number): Observable<any> {
    return this.http.delete<String>(`/api/cart/${sessionId}/product/${productId}?amount=${amount}`, {})
      .pipe(catchError(this.errorHandler));
  }

  referenceCartWithCustomer(sessionId: String, customerId: Number): Observable<any> {
    return this.http.put<String>(`/api/customer/${customerId}/cart/${sessionId}`, {})
      .pipe(catchError(this.errorHandler));
  }
}

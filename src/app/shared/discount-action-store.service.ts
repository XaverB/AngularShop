import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { DiscountAction } from './models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountActionStoreService {

  constructor(private http: HttpClient) { }


  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  delete(discountActionId: number): Observable<any> {
    return this.http.delete<any[]>(`/api/discount/action/${discountActionId}`)
      .pipe(
        map<any, any>(res => res),
        catchError(this.errorHandler));
  }

  getAll(shopId: Number): Observable<DiscountAction[]> {
    return this.http.get<DiscountAction[]>(`/api/shop/${shopId}/actions`)
      .pipe(
        map<any, DiscountAction[]>(res => res),
        catchError(this.errorHandler));
  }

  create(payload: any) {
    return this.http.post<any>(`/api/discount/action`, JSON.stringify(payload), {headers: new HttpHeaders().set('Content-Type', 'application/json' ) })
      .pipe(
        map<any, any>(res => res),
        catchError(this.errorHandler));
  }
}

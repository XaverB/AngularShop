import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { DiscountAction, DiscountRule } from './models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountRuleStoreService {

  constructor(private http: HttpClient) { }


  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  delete(discountRuleId: number): Observable<any> {
    return this.http.delete<any[]>(`/api/discount/rule/${discountRuleId}`)
      .pipe(
        map<any, any>(res => res),
        catchError(this.errorHandler));
  }

  getAll(shopId: Number): Observable<DiscountRule[]> {
    return this.http.get<DiscountRule[]>(`/api/shop/${shopId}/rules`)
      .pipe(
        map<any, DiscountRule[]>(res => res),
        catchError(this.errorHandler));
  }

  create(payload: any) {
    return this.http.post<any>(`/api/discount/rule`, payload)
      .pipe(
        map<any, any>(res => res),
        catchError(this.errorHandler));
  }
}

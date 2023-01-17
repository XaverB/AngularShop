import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopStoreService {

  constructor(private http: HttpClient) { }

  getShopName(): Observable<string> {
    return this.http.get<any>(`/api/shop/${environment.shopId}`)
    .pipe(map(
      res => res.label ?? ""
    ));
  }
}

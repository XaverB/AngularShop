import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  // Observable string sources
  private addProductToCartEmitChangeSource = new Subject<any>();
  // Observable string streams
  addProductToCartEmitted$ = this.addProductToCartEmitChangeSource.asObservable();
  // Service message commands
  emitAddProductToCart(change: any) {
      this.addProductToCartEmitChangeSource.next(change);
  }
}

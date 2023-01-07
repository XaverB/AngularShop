import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartStoreService } from './cart-store.service';
import { EventService } from './event.service';
import { Cart } from './models/cart';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: Observable<Cart>;

  private cartSubject: Subject<Cart>;
  private _Cart: Cart = new Cart();

  constructor(
    private eventService: EventService,
    private cartStoreService: CartStoreService
  ) {

    this.cartSubject = new Subject<Cart>();
    this.cart$ = this.cartSubject.asObservable();


    this.eventService.addProductToCartEmitted$.subscribe(product => {
      this.addProduct(product);
      this.persistCart();
    });

    this.initializeCart();
  }

  set cart(newCart: Cart) {
    this._Cart = newCart;
    this.cartSubject.next(newCart);
  }

  get cart(): Cart {
    return this._Cart;
  }

  public referenceCartAndCustomer(customerId: Number) {
    if (this.cart.customerId) return;

    // reference
    this.cartStoreService.referenceCartWithCustomer(this.cart.sessionId!, customerId)
      .subscribe(
        // update cart from service
        () => this.cartStoreService.getCartBySessionId(this.cart.sessionId!).pipe(res => this.cart = Object.assign(new Cart(), res))
      );
  }

  /**
 * Adds a product to the cart.
 * @param product 
 */
  public addProduct(product: Product) {
    console.log(`addProductToCart with product (${product.id})`);
    // update service
    this.cartStoreService.putProduct(
      this.cart.sessionId!, product.id!, 1
    )
      .subscribe(_ => {
        // update local
        const newCart = Object.assign(new Cart(), this._Cart);
        newCart.addProduct(product);
        this.cart = newCart;
        this.persistCart();
      }
      );
  }

  public removeProduct(product: Product) {
    // update service
    this.cartStoreService.deleteProduct(
      this.cart.sessionId!, product.id!, 1
    )
      .subscribe(_ => {
        // update local
        const newCart = Object.assign(new Cart(), this._Cart);
        newCart.removeProduct(product);
        this.cart = newCart;
        this.persistCart();
      }
      );
  }

  private persistCart() {
    this.cart.persist();
  }

  private initializeCart() {
    // TODO registered customer
    // TODO error handling
    const cartFromStorageJson = Cart.createFromLocalStorage();
    const sessionId = cartFromStorageJson.sessionId;

    if (sessionId) {
      this.cartStoreService.getCartBySessionId(sessionId)
        .subscribe(res => this.cart = Object.assign(new Cart(), res));
    } else {
      // 1. create cart
      // 2. fetch cart
      this.cartStoreService.createCart().subscribe(
        res => {
          this.cartStoreService.getCartBySessionId(res)
            .subscribe(res => this.cart = Object.assign(new Cart(), res));
        }
      );
    }
  }
}

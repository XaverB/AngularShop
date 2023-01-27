import { Injectable } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { catchError, forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
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
    private cartStoreService: CartStoreService,
    protected router: Router,
    private authenticationService: AuthenticationService,
    private oauthService: OAuthService
  ) {

    this.cartSubject = new Subject<Cart>();
    this.cart$ = this.cartSubject.asObservable();


    this.eventService.addProductToCartEmitted$.subscribe(product => {
      this.addProduct(product);
      this.persistCart();
    });

    this.initializeCart();

    this.oauthService.events.subscribe(e => {
      if (e.type == 'token_received' && authenticationService.customerId) {
        // do something after successful authentication
        this.mergeCarts(this.cart.sessionId!, authenticationService.customerId!);
      }
    });
  }


  set cart(newCart: Cart) {
    if (!newCart) return;

    const isReferenceCartNecessary = !newCart.customerId && this.authenticationService.isLoggedIn();
    if (isReferenceCartNecessary) {
      this.referenceCart(newCart);
    } else {
      this._Cart = newCart;
      this.cartSubject.next(newCart);
    }
  }

  private referenceCart(newCart: Cart) {
    this.cartStoreService.referenceCartWithCustomer(newCart.sessionId!, this.authenticationService.customerId!)
      .pipe(
        switchMap(() => this.cartStoreService.getCartByCustomerId(this.authenticationService.customerId!)),
        tap(cart => {
          if (cart && cart.customerId) {
            this._Cart = cart;
            this.cartSubject.next(cart);
          }
        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      ).subscribe();
  }

  get cart(): Cart {
    return this._Cart;
  }


  public newCart() {
    localStorage.removeItem(`cart_${environment.shopId.toString()}`);
    this.initializeCart();
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


  public initializeCart() {
    const customerId = this.authenticationService.customerId;

    // logged in
    if (customerId) {
      this.cartStoreService.getCartByCustomerId(customerId)
        .subscribe(res => {
          // get by customerId success
          if (res != null) {
            this.cart = Object.assign(new Cart(), res);
          }
          else {
            // 
            this.initializeCartNotLoggedIn().subscribe(cart => {
              this.cartStoreService.referenceCartWithCustomer(cart.sessionId!, customerId)
                .pipe(
                  switchMap(() => this.cartStoreService.getCartByCustomerId(customerId))
                )
                .subscribe(cart => this.cart = cart);
            });
          }
        });
    } else {
      // not logged in
      this.initializeCartNotLoggedIn().subscribe(cart => this.cart = cart);
    }
  }

  private initializeCartNotLoggedIn() {
    const cartFromSession = Cart.createFromLocalStorage();
    const cartFromSessionAvailable = cartFromSession.sessionId;

    let observable;
    if (cartFromSessionAvailable) {
      observable = this.cartStoreService.getCartBySessionId(cartFromSession.sessionId!)
        .pipe(
          tap(cartFromSessionId => {
            if (cartFromSessionId) {
              this.cart = Object.assign(new Cart(), cartFromSessionId);
            }
          }),
          switchMap(cartFromSessionId => {
            if (cartFromSessionId) {
              return of(this.cart);
            } else {
              return this.cartStoreService.createCart()
                .pipe(
                  switchMap(sessionId => this.cartStoreService.getCartBySessionId(sessionId)),
                  tap(cart => this.cart = Object.assign(new Cart(), cart))
                );
            }
          })
        );
    } else {
      observable = this.cartStoreService.createCart()
        .pipe(
          switchMap(sessionId => this.cartStoreService.getCartBySessionId(sessionId)),
          tap(cart => this.cart = Object.assign(new Cart(), cart))
        );
    }
    return observable;
  }

  private initializeCart2() {
    // TODO registered customer
    // TODO error handling
    const customerId = this.authenticationService.customerId;
    const cartFromStorageJson = Cart.createFromLocalStorage();
    const sessionId = cartFromStorageJson.sessionId;

    if (customerId) {
      this.cartStoreService.getCartByCustomerId(customerId!).subscribe(
        res => {
          // logged in, but cart not yet referenced
          if (!res) {

            if (sessionId) {
              // reference and refetch when finished
              this.cartStoreService.referenceCartWithCustomer(sessionId!, customerId).subscribe(
                ref => this.cartStoreService.getCartByCustomerId(customerId!).subscribe(
                  c => this.cart = Object.assign(new Cart(), c)
                )
              );
            } else {
              this.cartStoreService.createCart().subscribe(
                createCart => {
                  this.cartStoreService.referenceCartWithCustomer(createCart, customerId)
                    .subscribe(n => this.cartStoreService.getCartByCustomerId(customerId!).subscribe(cc => this.cart = Object.assign(new Cart(), cc)))
                }
              );
            }
          } else {
            this.cart = Object.assign(new Cart(), res);
          }
        }
      )
      return;
    }


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

  // Returning cart does not work somehow?! I also changed the implementations of getCartBySessionId and getCartByCustomerId to be more explicit
  mergeCarts(sessionId: string, customerId: number): Observable<any> {
    const sessionCart$ = this.cartStoreService.getCartBySessionId(sessionId);
    const customerCart$ = this.cartStoreService.getCartByCustomerId(customerId);

    return forkJoin([sessionCart$, customerCart$]).pipe(
      map(([sessionCart, customerCart]: [Cart, Cart]) => {
        // Merge the session cart and customer cart
        const mergedCart: Cart = new Cart();

        // Assign customerId and sessionId to the new Cart
        mergedCart.customerId = customerId;
        mergedCart.sessionId = sessionId;

        // Add products from session cart
        sessionCart.productCarts!.forEach(pc => {
          const existingProduct = mergedCart.productCarts!.find(p => p.product!.id === pc.product!.id);
          if (existingProduct) {
            existingProduct.amount += pc.amount;
          } else {
            mergedCart.productCarts!.push(pc);
          }
          this.cartStoreService.putProduct(customerCart.sessionId!, pc!.product!.id!, pc.amount);
        });

        // Add products from customer cart
        customerCart.productCarts!.forEach(pc => {
          const existingProduct = mergedCart.productCarts!.find(p => p.product!.id === pc.product!.id);
          if (existingProduct) {
            existingProduct.amount += pc.amount;
          } else {
            mergedCart.productCarts!.push(pc);
            this.cartStoreService.putProduct(customerCart.sessionId!, pc!.product!.id!, pc.amount);
          }
        });

        // Add discounts from session cart
        sessionCart.discounts!.forEach(d => {
          const existingDiscount = mergedCart.discounts!.find(item => item.id === d.id);
          if (!existingDiscount) {
            mergedCart.discounts!.push(d);
          }
        });

        // Add discounts from customer cart
        customerCart.discounts!.forEach(d => {
          const existingDiscount = mergedCart.discounts!.find(item => item.id === d.id);
          if (!existingDiscount) {
            mergedCart.discounts!.push(d);
          }
        });

        // Calculate total price
        mergedCart.productCarts!.forEach(pc => {
          mergedCart.price += pc.price * pc.amount;
        });

        // Apply discounts
        mergedCart.discounts!.forEach(d => {
          // Implement discount calculation here
          // ...
        });

        return mergedCart;
      }),
      tap(cart => this.cart = cart)
      // switchMap(mergedCart => this.cartStoreService.update(mergedCart))
    );
  }
}


import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { filter, tap } from 'rxjs';

import { AuthenticationService } from '../shared/authentication.service';
import { CartStoreService } from '../shared/cart-store.service';
import { CartService } from '../shared/cart.service';
import { DiscountStoreService } from '../shared/discount-store.service';
import { Cart } from '../shared/models/cart';
import { Discount } from '../shared/models/discount';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {

  cart: Cart = new Cart()
  availableDiscounts: Discount[] = [];

  constructor(private cartService: CartService,
    private cartStoreService: CartStoreService,
    private authenticationService: AuthenticationService,
    private discountStoreService: DiscountStoreService,
    protected router: Router,
    private toast: NgToastService) {

  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;

      const isLoggedInAndCartIsReferenced = this.authenticationService.isLoggedIn() && cart.customerId;
      if (isLoggedInAndCartIsReferenced)
        this.fetchAvailableDiscounts(cart);
    });
  }

  private fetchAvailableDiscounts(cart: Cart) {
    this.discountStoreService.getAvailableDiscountsByCartId(cart.id!)
      .subscribe(discounts =>
        this.availableDiscounts = this.getDiscountsNotInCart(discounts, cart)
      );
  }

  private getDiscountsNotInCart(discounts: Discount[], cart: Cart) {
    return discounts.filter(discount => {
      for (let i = 0; i < discounts.length; i++) {
        return cart.discounts.filter(d => d.id == discount.id).length == 0;
      }
      return true;
    });
  }



  addProduct(product: Product) {
    this.cartService.addProduct(product);
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

  createOrder() {
    if (this.cart.productCarts.length === 0) return;
    this.referenceCartAndCustomer();
  }

  addDiscountToCart(discountIds: number[]) {
    this.discountStoreService.applyDiscounts(this.cart.id!, discountIds)
    .pipe(tap(() => this.cartService.initializeCart()))
      .subscribe
      (res => {
        if (res instanceof HttpErrorResponse) {
          console.error('schlecht');
        } else {
          this.toast.success({ summary: 'Erfolg', detail: 'Rabatte wurden angewendet', duration: 5000 })
        }
      });
  }

  private referenceCartAndCustomer() {

    if (!this.cart.customerId)
      this.cartStoreService.referenceCartWithCustomer(this.cart.sessionId!, this.authenticationService.customerId!)
        .subscribe(
          () => this.router.navigate(['/payment'])
        );
    else
      this.router.navigate(['/payment']);
  }
}

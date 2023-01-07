import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { CartService } from '../shared/cart.service';
import { Cart } from '../shared/models/cart';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {

  cart: Cart = new Cart()

  constructor(private cartService: CartService,
    private authenticationService: AuthenticationService,
    protected router: Router) {
    cartService.cart$.subscribe(cart => this.cart = cart)
  }

  ngOnInit(): void {

  }

  addProduct(product: Product) {
    this.cartService.addProduct(product);
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

  createOrder() {
    this.referenceCartAndCustomer();
  }

  private referenceCartAndCustomer() {
    if (!this.cart.customerId) {
      const customerId = this.authenticationService.customerId;
      this.cartService.referenceCartAndCustomer(customerId);
    }
    this.router.navigate(['/payment']);
  }
}

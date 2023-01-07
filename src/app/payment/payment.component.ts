import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { CartService } from '../shared/cart.service';
import { Cart } from '../shared/models/cart';
import { OrderStoreService } from '../shared/order-store.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cart: Cart = new Cart();
  orderId: Number = 0;

  constructor(private authenticationService: AuthenticationService,
    private cartService: CartService,
    private orderService: OrderStoreService) {
    cartService.cart$.subscribe(cart => this.cart = cart);
  }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    

    this.orderService.createOrder(this.cart.id!)
    .subscribe(res => this.orderId = res);
  }

  
}

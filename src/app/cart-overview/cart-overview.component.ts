import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Cart } from '../shared/models/cart';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {

  cart: Cart = new Cart()

  constructor(private cartService: CartService) { 
    cartService.cart$.subscribe(cart => this.cart = cart)
  }

  ngOnInit(): void {
    
  }

}

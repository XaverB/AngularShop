import { Component, Input, OnInit } from '@angular/core';
import { CartStoreService } from '../shared/cart-store.service';
import { CartService } from '../shared/cart.service';
import { EventService } from '../shared/event.service';
import { Cart } from '../shared/models/cart';
import { Product } from '../shared/models/product';
import { ProductCart } from '../shared/models/productcart';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent implements OnInit {

  @Input() productCount: Number = 0;

  constructor(private eventService: EventService, private cartService: CartService) {
    this.cartService.cart$.subscribe(cart => this.productCount = cart.getProductCount());

  }

  ngOnInit(): void {
  }
}




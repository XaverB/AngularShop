import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { EventService } from 'src/app/shared/event.service';

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




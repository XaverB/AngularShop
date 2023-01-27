import { Component, Inject, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.css']
})
export class OrderListItemComponent implements OnInit {

  @Input() order: Order = new Order();

  constructor() { }

  ngOnInit(): void {
  }

  getDiscount(): number {
    return this.order.cart?.discountedPrice ?? 0;
  }

}

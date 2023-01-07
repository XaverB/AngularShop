import { Component, Input, OnInit } from '@angular/core';
import { ProductCart } from '../shared/models/productcart';

@Component({
  selector: 'app-cart-overview-list',
  templateUrl: './cart-overview-list.component.html',
  styleUrls: ['./cart-overview-list.component.css']
})
export class CartOverviewListComponent implements OnInit {

  @Input() productCarts: ProductCart[] = []

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductCart } from 'src/app/shared/models/productcart';

@Component({
  selector: 'app-cart-overview-list',
  templateUrl: './cart-overview-list.component.html',
  styleUrls: ['./cart-overview-list.component.css']
})
export class CartOverviewListComponent implements OnInit {

  @Input() productCarts: ProductCart[] = []
  @Output() addProduct = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

}

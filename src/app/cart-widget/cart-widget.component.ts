import { Component, OnInit } from '@angular/core';
import { CartStoreService } from '../shared/cart-store.service';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent implements OnInit {

  constructor(private cartStore: CartStoreService) { }

  ngOnInit(): void {
  }

}

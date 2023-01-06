import { Component, OnInit } from '@angular/core';
import { CartStoreService } from '../shared/cart-store.service';
import { Cart } from '../shared/models/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private cartStore: CartStoreService) { }

  ngOnInit(): void {

  }

 
}

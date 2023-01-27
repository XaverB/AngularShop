import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';
import { Order } from '../../shared/models/order';
import { OrderStoreService } from '../../shared/order-store.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private authenticationService: AuthenticationService,
    private orderStoreService: OrderStoreService) { }

  ngOnInit(): void {
    const customerId = this.authenticationService.customerId;

    this.orderStoreService.getAllByCustomerId(customerId!)
      .subscribe(res => this.orders = res);
  }
}

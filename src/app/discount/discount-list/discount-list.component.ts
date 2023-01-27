import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Discount } from 'src/app/shared/models/discount';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  @Input() discounts: Discount[] = []
  @Output() addDiscountsEvent = new EventEmitter<number[]>();

  constructor() { }

  ngOnInit(): void {
  }

  invokeApplyDiscounts() {
    const discountIds = this.discounts.map(d => d.id!);

    this.addDiscountsEvent.emit(discountIds);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Discount } from '../shared/models/discount';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  @Input() discounts: Discount[] = []
  @Output() addDiscountEvent = new EventEmitter<Discount>();

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Discount } from '../shared/models/discount';

@Component({
  selector: 'app-admin-discount-list',
  templateUrl: './admin-discount-list.component.html',
  styleUrls: ['./admin-discount-list.component.css']
})

export class AdminDiscountListComponent implements OnInit {

  @Input() discounts: Discount[] = [];
  @Output() deleteDiscountEvent = new EventEmitter<Discount>();

  constructor() { }

  ngOnInit(): void {
  }

}

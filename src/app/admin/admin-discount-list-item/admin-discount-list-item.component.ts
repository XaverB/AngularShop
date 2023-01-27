import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Discount } from 'src/app/shared/models/discount';

@Component({
  selector: 'app-admin-discount-list-item',
  templateUrl: './admin-discount-list-item.component.html',
  styleUrls: ['./admin-discount-list-item.component.css']
})
export class AdminDiscountListItemComponent implements OnInit {

  @Input() discount?: Discount;
  @Output() deleteDiscountEvent = new EventEmitter<Discount>();

  constructor() { }

  ngOnInit(): void {
  }

}

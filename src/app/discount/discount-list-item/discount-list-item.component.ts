import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Discount } from 'src/app/shared/models/discount';

@Component({
  selector: 'app-discount-list-item',
  templateUrl: './discount-list-item.component.html',
  styleUrls: ['./discount-list-item.component.css']
})
export class DiscountListItemComponent implements OnInit {

  @Input() discount: Discount = new Discount();
  @Output() addDiscountEvent = new EventEmitter<Discount>();

  constructor() { }

  ngOnInit(): void {
  }

}

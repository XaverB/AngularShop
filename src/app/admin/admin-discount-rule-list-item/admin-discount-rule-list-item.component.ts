import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiscountRule } from 'src/app/shared/models/discount';

@Component({
  selector: 'app-admin-discount-rule-list-item',
  templateUrl: './admin-discount-rule-list-item.component.html',
  styleUrls: ['./admin-discount-rule-list-item.component.css']
})
export class AdminDiscountRuleListItemComponent implements OnInit {


  @Input() rule?: DiscountRule;
  @Input() isInUse: boolean = false;
  @Output() deleteDiscountRuleEvent = new EventEmitter<DiscountRule>();

  constructor() { }

  ngOnInit(): void {
  }

}

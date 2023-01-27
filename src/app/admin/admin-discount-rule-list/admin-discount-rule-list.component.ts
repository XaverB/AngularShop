import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiscountRule } from 'src/app/shared/models/discount';

@Component({
  selector: 'app-admin-discount-rule-list',
  templateUrl: './admin-discount-rule-list.component.html',
  styleUrls: ['./admin-discount-rule-list.component.css']
})
export class AdminDiscountRuleListComponent implements OnInit {

  @Input() rules: DiscountRule[] = [];
  @Input() inUseRules: DiscountRule[] = []
  @Output() deleteDiscountRuleEvent = new EventEmitter<DiscountRule>();
;

  constructor() { }

  ngOnInit(): void {
  }

  isInUse(rule: DiscountRule): boolean {
    return this.inUseRules.findIndex(a => a.id == rule.id) >= 0;
  }

}

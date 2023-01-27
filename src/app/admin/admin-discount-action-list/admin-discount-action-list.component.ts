import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Discount, DiscountAction } from '../../shared/models/discount';

@Component({
  selector: 'app-admin-discount-action-list',
  templateUrl: './admin-discount-action-list.component.html',
  styleUrls: ['./admin-discount-action-list.component.css']
})
export class AdminDiscountActionListComponent implements OnInit {

  @Input() actions: DiscountAction[] = [];
  @Input() inUseActions: DiscountAction[] = [];
  @Output() deleteDiscountActionEvent = new EventEmitter<DiscountAction>();


  constructor() { }

  ngOnInit(): void {
  }

  isInUse(action: DiscountAction): boolean {
    return this.inUseActions.findIndex(a => a.id == action.id) >= 0;
  }

}

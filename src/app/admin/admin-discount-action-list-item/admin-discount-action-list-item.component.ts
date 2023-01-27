import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiscountAction } from 'src/app/shared/models/discount';

@Component({
  selector: 'app-admin-discount-action-list-item',
  templateUrl: './admin-discount-action-list-item.component.html',
  styleUrls: ['./admin-discount-action-list-item.component.css']
})
export class AdminDiscountActionListItemComponent implements OnInit {

  @Input() action?: DiscountAction;
  @Input() isInUse: boolean = false;
  @Output() deleteDiscountActionEvent = new EventEmitter<DiscountAction>();

  constructor() { }

  ngOnInit(): void {
  }

}

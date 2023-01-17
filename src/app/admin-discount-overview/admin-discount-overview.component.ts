import { HttpErrorResponse } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscountActionStoreService } from '../shared/discount-action-store.service';
import { DiscountRuleStoreService } from '../shared/discount-rule-store.service';
import { DiscountStoreService } from '../shared/discount-store.service';
import { Discount, DiscountAction, DiscountRule } from '../shared/models/discount';

@Component({
  selector: 'app-admin-discount-overview',
  templateUrl: './admin-discount-overview.component.html',
  styleUrls: ['./admin-discount-overview.component.css']
})
export class AdminDiscountOverviewComponent implements OnInit {

  discounts: Discount[] = [];
  actions: DiscountAction[] = [];
  inUseActions: DiscountAction[] = []

  rules: DiscountRule[] = [];
  inUseRules: DiscountRule[] = [];

  constructor(private discountStoreService: DiscountStoreService,
    private discountRuleStoreService: DiscountRuleStoreService,
    private discountActionStoreService: DiscountActionStoreService,
    private toastService: NgToastService) { }

  ngOnInit(): void {
    this.discountStoreService.getDiscountsByShopId(environment.shopId)
      .subscribe(discounts => {
        this.discounts = discounts;
        this.updateInUseData();      
      });

    this.discountRuleStoreService.getAll(environment.shopId)
      .subscribe(rules => {
        this.rules = rules;
        this.updateInUseData();      
      });

    this.discountActionStoreService.getAll(environment.shopId)
      .subscribe(actions => {
        this.actions = actions
        this.updateInUseData();      
      }
      );
  }

  updateInUseData() {
    this.inUseActions = this.discounts.map(d => d.discountAction!);
    this.inUseRules = this.discounts.map(d => d.discountRule!);
  }

  deleteDiscount(discount: Discount): void {
    if (!confirm(`Wollen Sie den Rabatt ${discount.discountAction?.name} - ${discount.discountRule?.name} wirklich löschen?`)) return;

    if (!discount.id) return;
    this.discountStoreService.deleteDiscount(discount.id)
      .pipe(tap(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastService.error({ summary: "Fehler", detail: "Rabatt wurde nicht gelöscht. Bitte versuchen Sie es später erneut", duration: 5000 });
          return;
        }

        this.toastService.success({ summary: "Erfolg", detail: "Rabatt wurde gelöscht.", duration: 5000 });
        this.discounts = this.discounts.filter(item => item.id !== discount.id);
        this.inUseActions = this.discounts.map(d => d.discountAction!);
        this.inUseRules = this.discounts.map(d => d.discountRule!);
      }))
      .subscribe();
  }

  deleteRule(rule: DiscountRule): void {
    if (!confirm(`Wollen Sie den Rabatt ${rule?.name} wirklich löschen?`)) return;

    if (!rule.id) return;
    this.discountRuleStoreService.delete(rule.id)
      .pipe(tap(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastService.error({ summary: "Fehler", detail: "Rabattregel wurde nicht gelöscht. Bitte versuchen Sie es später erneut", duration: 5000 });
          return;
        }

        this.toastService.success({ summary: "Erfolg", detail: "Rabattregel wurde gelöscht.", duration: 5000 });
        this.rules = this.rules.filter(item => item.id !== rule.id);
      }))
      .subscribe();
  }

  deleteAction(action: DiscountAction): void {
    if (!confirm(`Wollen Sie den Rabatt ${action?.name} wirklich löschen?`)) return;

    if (!action.id) return;
    this.discountActionStoreService.delete(action.id)
      .pipe(tap(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastService.error({ summary: "Fehler", detail: "Rabattaktion wurde nicht gelöscht. Bitte versuchen Sie es später erneut", duration: 5000 });
          return;
        }

        this.toastService.success({ summary: "Erfolg", detail: "Rabattaktion wurde gelöscht.", duration: 5000 });
        this.actions = this.actions.filter(item => item.id !== action.id);
      }))
      .subscribe();
  }

}

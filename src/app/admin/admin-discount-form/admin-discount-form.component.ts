import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { DiscountActionStoreService } from 'src/app/shared/discount-action-store.service';
import { DiscountRuleStoreService } from 'src/app/shared/discount-rule-store.service';
import { DiscountStoreService } from 'src/app/shared/discount-store.service';
import { DiscountAction, DiscountRule } from 'src/app/shared/models/discount';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-discount-form',
  templateUrl: './admin-discount-form.component.html',
  styleUrls: ['./admin-discount-form.component.css']
})
export class AdminDiscountFormComponent implements OnInit {

  form?: FormGroup;
  actions: DiscountAction[] = [];
  rules: DiscountRule[] = [];

  constructor(private discountRuleStoreService: DiscountRuleStoreService,
    private discountActionStoreService: DiscountActionStoreService,
    private discountService: DiscountStoreService,
    private formBuilder: FormBuilder,
    private toastService: NgToastService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      action: ['', [Validators.required]],
      rule: ['', [Validators.required]]
    });

    this.discountActionStoreService.getAll(environment.shopId)
      .subscribe(actions => {
        this.actions = actions;
        // we need to select the first element manually
        if (actions.length > 0)
          this.form?.controls['action'].setValue(this.actions[0].name, { onlySelf: true })
      }
      );

    this.discountRuleStoreService.getAll(environment.shopId)
      .subscribe(rules => {
        this.rules = rules;
        if (rules.length > 0)
          this.form?.controls['rule'].setValue(this.rules[0].name, { onlySelf: true })
      });


  }

  onSubmit() {
    const actionString = this.form?.get('action')?.value;
    const ruleString = this.form?.get('rule')?.value;

    const action = this.actions.find(a => a.name == actionString);
    if (!action) {
      this.toastService.error({ summary: 'Fehler', detail: 'Aktion ungültig.', duration: 5000 });
      return;
    }

    const rule = this.rules.find(r => r.name == ruleString)
    if (!rule) {
      this.toastService.error({ summary: 'Fehler', detail: 'Regel ungültig.', duration: 5000 });
      return;
    }

    this.discountService.create(action.id, rule.id).
      subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastService.error({ summary: 'Fehler', detail: 'Bitte versuchen Sie es später erneut 💀.', duration: 5000 });
        } else {
          this.toastService.success({ summary: 'Erfolg', detail: 'Rabatt erfolgreich erstellt.', duration: 5000 });
        }
      });
  }

}

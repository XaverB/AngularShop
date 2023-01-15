import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { DiscountRuleStoreService } from '../shared/discount-rule-store.service';
import { DiscountRule } from '../shared/models/discount';

@Component({
  selector: 'app-discount-rule-form',
  templateUrl: './discount-rule-form.component.html',
  styleUrls: ['./discount-rule-form.component.css']
})
export class DiscountRuleFormComponent implements OnInit {

  form?: FormGroup;
  totalCartAmount: number = 10.0;
  name: string = "";
  startDate: Date = new Date(Date.now() - (24 * 60 * 60 * 1000 /** 1 day */) * 5);
  endDate: Date = new Date(Date.now() + (24 * 60 * 60 * 1000 /** 1 day */) * 5);
  /** hard coded because it is okay for the customer */
  selectedRule: number = 1;

  constructor(private formBuilder: FormBuilder,
    private discountRuleStoreService: DiscountRuleStoreService,
    private toastService: NgToastService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required, this.validateDates]],
      totalCartAmount: ['', [Validators.required, Validators.min(1)]]
    });

    // set validators for date time
    this.onSelectChange(totalAmountType);
  }

  validateDates(control: FormControl) {
    const startDate = control?.get('startDate')?.value;
    const endDate = control?.get('endDate')?.value;
    if (startDate > endDate) {
      return { invalidDates: true };
    }
    return null;
  }

  onTotalCartAmountChanged(event: any) {
    const inputValue = event.target.value;
    const floatValue = parseFloat(inputValue.replace(/[^\d.-]/g, ''));
    console.log(floatValue);
  }

  onSubmit() {
    const value = this.form?.value;
    console.log(JSON.stringify(value));


    const rulePayload = this.selectedRule.toString() !== totalAmountType ? {
      shopId: environment.shopId,
      name: value.name,
      ruleSet: {
        minimumTotalAmount: value.totalAmount,
        /** bad for security */
        $discriminator: "TotalAmountDiscountRuleset"
      }
    }
      :
      {
        shopId: environment.shopId,
        name: value.name,
        ruleSet: {
          startDate: new Date(Date.parse(value.startDate)),
          endDate: new Date(Date.parse(value.endDate)),
          orderDate: new Date(),
          /** bad for security */
          $discriminator: "DateDiscountRuleset"
        }
      };

    this.discountRuleStoreService.create(rulePayload)
      .subscribe(res => {
        if (res instanceof HttpErrorResponse)
          this.toastService.error({ summary: 'Fehler', detail: 'Rabattregel konnte nicht angelegt werden', duration: 5000 });
        else {
          this.toastService.success({ summary: 'Erfolg!', detail: 'Rabattregel erfolgreich angelegt', duration: 5000 });

        }
      }
      )

  }
  // change validators regarding the selected rule type
  onSelectChange(value: any) {
    console.log(JSON.stringify(value));
    const isTotalAmount = value === totalAmountType;
    const isDateTime = value === dateType;

    if (isTotalAmount) {
      this.form?.get('totalCartAmount')!.clearValidators();
    } else {
      this.form?.get('totalCartAmount')!.setValidators([Validators.required, Validators.min(0)]);
    }
    this.form?.get('totalCartAmount')!.updateValueAndValidity();

    if (isDateTime) {
      this.form?.get('startDate')!.clearValidators();
      this.form?.get('endDate')!.clearValidators();
    } else {
      this.form?.get('startDate')!.setValidators([Validators.required]);
      this.form?.get('endDate')!.setValidators([Validators.required, this.validateDates]);
    }
    this.form?.get('startDate')!.updateValueAndValidity();
    this.form?.get('endDate')!.updateValueAndValidity();
  }
}

const totalAmountType = "1";
const dateType = "2";
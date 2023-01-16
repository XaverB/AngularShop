import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
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
      totalCartAmount: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required, this.validateDates]],
      endDate: ['', [Validators.required, this.validateDates]],
    });


    this.onSelectChange(totalAmountType);
  }

  validateDates(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const endDate = this.form && this.form.get("endDate")!.value;
      const startDate = this.form && this.form.get("startDate")!.value
      let invalid = false;
      if (startDate && endDate) {
        invalid = new Date(startDate).valueOf() > new Date(endDate).valueOf();
      }

      return invalid ? { invalidRange: { startDate, endDate } } : null;
    }
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
        /** bad for security */
        $discriminator: "TotalAmountDiscountRuleset",
        minimumTotalAmount: value.totalAmount
      }
    }
      :
      {
        shopId: environment.shopId,
        name: value.name,
        ruleSet: {
          /** bad for security */
          $discriminator: "DateDiscountRuleset",
          startDate: new Date(Date.parse(value.startDate)),
          endDate: new Date(Date.parse(value.endDate)),
          orderDate: new Date()
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
      this.form?.get('startDate')!.setValidators([Validators.required, this.validateDates]);
      this.form?.get('endDate')!.setValidators([Validators.required, this.validateDates]);
    }
    this.form?.get('startDate')!.updateValueAndValidity();
    this.form?.get('endDate')!.updateValueAndValidity();
  }
}

const totalAmountType = "1";
const dateType = "2";


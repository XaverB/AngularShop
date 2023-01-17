import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { DiscountActionStoreService } from '../shared/discount-action-store.service';

@Component({
  selector: 'app-discount-action-form',
  templateUrl: './discount-action-form.component.html',
  styleUrls: ['./discount-action-form.component.css']
})
export class DiscountActionFormComponent implements OnInit {

  form?: FormGroup;
  fixedValue: number = 10.0;
  percentValue: number = 0.01;
  name: string = "";
  selectedAction: number = 1;

  constructor(private formBuilder: FormBuilder,
    private discountActionStoreService: DiscountActionStoreService,
    private toastService: NgToastService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      fixedValue: ['', [Validators.required, Validators.min(1)]],
      percentValue: ['', [Validators.required, Validators.min(0.01)]]
    });
    this.updateValidators(percentType);
  }

  // change validators regarding the selected rule type
  onSelectChange(value: any) {
    this.updateValidators(value);
  }
  
  updateValidators(value: any) {
    console.log(JSON.stringify(value));
    const isFixedValue = value === fixedValueType;

    this.form?.get('percentValue')!.clearValidators();
    this.form?.get('fixedValue')!.clearValidators();

    if (isFixedValue) {

      this.form?.get('fixedValue')!.setValidators([Validators.required, Validators.min(1)]);
    } else {
      this.form?.get('percentValue')!.setValidators([Validators.required, Validators.min(0.01)]);
    }
    this.form?.get('percentValue')!.updateValueAndValidity();
    this.form?.get('fixedValue')!.updateValueAndValidity();
  }

  onSubmit() {
    const value = this.form?.value;
    console.log(JSON.stringify(value));


    const rulePayload = this.selectedAction.toString() === fixedValueType ? {
      shopId: environment.shopId,
      name: value.name,
      actionObject: {
        /** bad for security */
        $discriminator: "FixedValueDiscountAction",
        value: value.fixedValue
      }
    }
      :
      {
        shopId: environment.shopId,
        name: value.name,
        actionObject: {
          /** bad for security */
          $discriminator: "TotalPercentageDiscountAction",
          percentage: value.percentValue
        }
      };

    this.discountActionStoreService.create(rulePayload)
      .subscribe(res => {
        if (res instanceof HttpErrorResponse)
          this.toastService.error({ summary: 'Fehler', detail: 'Rabattaktion konnte nicht angelegt werden', duration: 5000 });
        else {
          this.toastService.success({ summary: 'Erfolg!', detail: 'Rabattaktion erfolgreich angelegt', duration: 5000 });
        }
      }
      )
  }
}

const fixedValueType = "2";
const percentType = "1";
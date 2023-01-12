import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';
import { CartService } from '../shared/cart.service';
import { CouponService } from '../shared/coupon.service';
import { uuidValidator } from '../shared/uuidValidator';

@Component({
  selector: 'app-apply-coupon',
  templateUrl: './apply-coupon.component.html',
  styleUrls: ['./apply-coupon.component.css']
})
export class ApplyCouponComponent implements OnInit {
  couponForm?: FormGroup;
  couponKey?: string;

  constructor(private couponStoreService: CouponService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      couponKey: ['', [Validators.required, Validators.max(100), uuidValidator]],
    });
  }

  onSubmit() {
    this.couponKey = this.couponForm?.value.couponKey;

    this.couponStoreService.applyCoupon(this.cartService.cart.id!, this.couponKey?.toString()!)
    .pipe(tap(() => this.cartService.initializeCart()))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toast.error({ detail: 'Fehler', summary: 'Bitte versuchen Sie es später erneut. Coupon konnte nicht angewendet werden..', duration: 5000 });
        } else {
          this.toast.success({ detail: 'Erfolg', summary: 'Coupon erfolgreich angewendet.', duration: 5000 });
        }
      });
  }
}

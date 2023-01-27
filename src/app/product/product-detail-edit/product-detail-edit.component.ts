import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/shared/models/product';
import { ProductStoreService } from 'src/app/shared/product-store.service';

@Component({
  selector: 'app-product-detail-edit',
  templateUrl: './product-detail-edit.component.html',
  styleUrls: ['./product-detail-edit.component.css']
})
export class ProductDetailEditComponent implements OnInit {
  productForm?: FormGroup;
  product: Product = new Product();

  // pattern from StackOverflow. Forgot to copy link 
  urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

  constructor(private formBuilder: FormBuilder,
    private productStoreService: ProductStoreService,
    private route: ActivatedRoute,
    private toast: NgToastService) { }

  ngOnInit() {
    this.initProductIfIdAvailable();

    this.productForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.max(5000)]],
      imageUrl: ['', [Validators.required, Validators.max(200)]],
      label: ['', [Validators.required, Validators.max(100)]],
      price: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  onSubmit() {
    this.product = this.productForm?.value;
    this.product.shopId = environment.shopId;
    this.product.id = this.getProductIdFromRoute() ?? 0;

    const isNew = this.getProductIdFromRoute() <= 0;


    const observable = isNew ? this.productStoreService.postProduct(this.product) : this.productStoreService.putProduct(this.product);

    observable.subscribe(res => {
      if (res instanceof HttpErrorResponse) {
        this.showError();
      } else {
        this.showSuccess();
      }
    });
  }

  getProductIdFromRoute(): number {
    const idString = this.route.snapshot.params['id'];
    if (!isFinite) return 0;

    return Number(idString);
  }

  initProductIfIdAvailable() {
    const id = this.getProductIdFromRoute();
    if (id <= 0) return;
    this.productStoreService.getById(id!).subscribe(res => {
      this.product = res;
      this.productForm?.patchValue({...this.product});

      
    });
  }

  
showError() {
  this.toast.error({detail: 'Fehler', summary: 'Bitte versuchen Sie es später erneut. Produkt wurde nicht bearbeitet.', duration:5000});
}

showSuccess() {
  this.toast.success({detail: 'Erfolg', summary: 'Produkt erfolgreich aktualisiert.', duration:5000});
}


}



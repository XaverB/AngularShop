import { HttpErrorResponse } from '@angular/common/http';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from '../../shared/authentication.service';
import { CartService } from '../../shared/cart.service';
import { Product } from '../../shared/models/product';
import { ProductStoreService } from '../../shared/product-store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product = new Product();

  constructor(private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private productStoreService: ProductStoreService,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private toastService: NgToastService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const id = params["id"];
    this.productStoreService.getById(id).subscribe(res => this.product = res);
  }

  imageUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.product.imageUrl}`)
  }


  addToShoppingCart() {
    console.log(`Invoking addToShoppingCartEvent with product (${this.product.id}).`);
    //this.eventService.emitAddProductToCart(this.product);
    this.cartService.addProduct(this.product);
  }

  isAdmin(): Boolean {
    return this.authenticationService.isAdmin();
  }

  deleteProduct() {
    if(!confirm(`Soll das Produkt ${this.product.label} wirklich gelöscht werden?`)) return;
      
    this.productStoreService.delete(this.product.id!)
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastService.error({ detail: 'Fehler', summary: 'Bitte versuchen Sie es später erneut.', duration: 5000 });
        } else {
          this.toastService.success({ detail: 'Erfolg', summary: 'Produkt gelöscht.', duration: 5000 });
          this.router.navigate(['/products']);
        }
      });
  }
}

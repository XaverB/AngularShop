import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { Product } from '../shared/models/product';
import { ProductStoreService } from '../shared/product-store.service';

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
    private cartService: CartService) { }

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
}

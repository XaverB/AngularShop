import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/shared/models/product';
import { ProductCart } from 'src/app/shared/models/productcart';

@Component({
  selector: 'app-cart-overview-list-item',
  templateUrl: './cart-overview-list-item.component.html',
  styleUrls: ['./cart-overview-list-item.component.css']
})
export class CartOverviewListItemComponent implements OnInit {

  @Input() productCart: ProductCart = new ProductCart();

  @Output() addProduct = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<Product>();

  public get product(): Product {
    return this.productCart.product ?? new Product()
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  imageUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.product.imageUrl}`)
  }
}

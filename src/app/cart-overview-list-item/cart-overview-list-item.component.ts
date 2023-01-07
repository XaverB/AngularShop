import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../shared/models/product';
import { ProductCart } from '../shared/models/productcart';

@Component({
  selector: 'app-cart-overview-list-item',
  templateUrl: './cart-overview-list-item.component.html',
  styleUrls: ['./cart-overview-list-item.component.css']
})
export class CartOverviewListItemComponent implements OnInit {

  @Input() productCart: ProductCart = new ProductCart();

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

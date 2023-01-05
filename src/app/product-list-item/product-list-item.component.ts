import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product = new Product();

  constructor(private sanitizer: DomSanitizer) { }

  imageUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.product.imageUrl}`)
}

  ngOnInit(): void {
  }

}

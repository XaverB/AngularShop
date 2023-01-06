import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../shared/cart.service';
import { EventService } from '../shared/event.service';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product = new Product();

  constructor(private sanitizer: DomSanitizer, private eventService: EventService,
    private cartService: CartService) { }

  imageUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.product.imageUrl}`)
  }

  addToShoppingCart() {
    console.log(`Invoking addToShoppingCartEvent with product (${this.product.id}).`);
    //this.eventService.emitAddProductToCart(this.product);
    this.cartService.addProduct(this.product);
  }

  ngOnInit(): void {
  }

}

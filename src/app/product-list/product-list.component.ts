import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductStoreService } from '../shared/product-store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Output() showDetailsEvent = new EventEmitter<Product>();

  products: Product[] = [];


  constructor(private productStoreService: ProductStoreService) { }

  showDetails(product: Product) {
    this.showDetailsEvent.emit(product);
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  private fetchAllProducts() {
    this.productStoreService.getAll().subscribe(res => this.products = res);
  }

  productInSearchSelected(product: Product) {
    ;
  }

  filterList(products: Product[]) {
    if (products.length) this.products = products;
    else this.fetchAllProducts(); // empty search box
  }

}

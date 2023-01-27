import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { max, tap } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductStoreService } from 'src/app/shared/product-store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Output() showDetailsEvent = new EventEmitter<Product>();
  products: Product[] = [];
  offset: number = 0;
  count: number = 10;
  maxProducts: number = 100;
  paginationItems: number[] = [];
  filter: string = "";

  constructor(private productStoreService: ProductStoreService,
    private activateRoute: ActivatedRoute) { }

  showDetails(product: Product) {
    this.showDetailsEvent.emit(product);
  }

  ngOnInit(): void {
    this.activateRoute.queryParams
    .pipe(tap(params => {
      {
        if (params['offset']) {
          this.offset = Number(params['offset']);
        } else {
          this.offset = 0;
        }

        if (params['filter']) {
          this.filter = params['filter'];
        } else {
          this.filter = "";
        }

        this.fetchAllProducts();
      }
    }))
    .subscribe();
  }

  private fetchAllProducts() {
    this.productStoreService.getProductsCount(this.filter)
    .pipe(tap(res => this.setPaginationItems(res)))
    .subscribe();

    this.productStoreService.search(this.filter, this.offset, this.count)
      .subscribe(res => this.products = res);
  }

  private setPaginationItems(maxProducts: number) {
    const count = maxProducts / this.count;
    return this.paginationItems = [...Array(Math.round(count)).keys()];
  }
}

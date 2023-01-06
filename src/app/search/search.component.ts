import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { Product } from '../shared/models/product';
import { ProductStoreService } from '../shared/product-store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isLoading: boolean = false;
  foundProducts: Product[] = [];

  @Output() productSelected = new EventEmitter<Product>();
  @Output() filterList = new EventEmitter<Product[]>();
  myKeyup = new EventEmitter<string>();

  constructor(private productStoreService: ProductStoreService) { }

  ngOnInit(): void {
    this.myKeyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.productStoreService.search(searchTerm)),
      tap(() => this.isLoading = false)
      ).subscribe(products => this.foundProducts = products);
  }
}

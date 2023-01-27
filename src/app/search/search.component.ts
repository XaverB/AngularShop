import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
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

  constructor(private productStoreService: ProductStoreService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.myKeyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      /** we are loading full product information here
       * we should just fetch names and fetch the full product information in the product-list,
       * but the service does not offer such a endpoint
       * therefore this is for demonstration purpose
       */
      switchMap(searchTerm => this.productStoreService.search(searchTerm, 0, 10)),
      tap(() => this.isLoading = false)
      ).subscribe(products => this.foundProducts = products);
  }

  isAdmin(): Boolean {
    return this.authenticationService.isAdmin();
  }
}

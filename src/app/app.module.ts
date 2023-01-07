import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddAppKeyInterceptorInterceptor } from './add-app-key-interceptor.interceptor';
import { EventService } from './shared/event.service';
import { SearchComponent } from './search/search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartOverviewComponent } from './cart-overview/cart-overview.component';
import { CartOverviewListComponent } from './cart-overview-list/cart-overview-list.component';
import { CartOverviewListItemComponent } from './cart-overview-list-item/cart-overview-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductListItemComponent,
    CartWidgetComponent,
    SearchComponent,
    ProductDetailComponent,
    CartOverviewComponent,
    CartOverviewListComponent,
    CartOverviewListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddAppKeyInterceptorInterceptor,
    multi: true,
  }, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

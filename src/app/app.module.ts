import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddAppKeyInterceptorInterceptor } from './add-app-key-interceptor.interceptor';
import { EventService } from './shared/event.service';
import { SearchComponent } from './search/search.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartOverviewComponent } from './cart/cart-overview/cart-overview.component';
import { LoginComponent } from './login/login.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PaymentComponent } from './payment/payment.component';
import { AuthCallbackComponent } from './authcallback/authcallback.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { HttpErrorInterceptor } from './httperror.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { ApplyCouponComponent } from './apply-coupon/apply-coupon.component';
import { UuidValidatorDirective } from './shared/uuid-validator.directive';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AdminDiscountOverviewComponent } from './admin/admin-discount-overview/admin-discount-overview.component';
import { AdminDiscountFormComponent } from './admin/admin-discount-form/admin-discount-form.component';
import { AdminDiscountListComponent } from './admin/admin-discount-list/admin-discount-list.component';
import { AdminDiscountListItemComponent } from './admin/admin-discount-list-item/admin-discount-list-item.component';
import { AdminDiscountRuleListComponent } from './admin/admin-discount-rule-list/admin-discount-rule-list.component';
import { AdminDiscountRuleListItemComponent } from './admin/admin-discount-rule-list-item/admin-discount-rule-list-item.component';
import { AdminDiscountActionListComponent } from './admin/admin-discount-action-list/admin-discount-action-list.component';
import { AdminDiscountActionListItemComponent } from './admin/admin-discount-action-list-item/admin-discount-action-list-item.component';
import { DiscountActionFormComponent } from './discount/discount-action-form/discount-action-form.component';
import { CartOverviewListItemComponent } from './cart/cart-overview-list-item/cart-overview-list-item.component';
import { CartOverviewListComponent } from './cart/cart-overview-list/cart-overview-list.component';
import { CartWidgetComponent } from './cart/cart-widget/cart-widget.component';
import { DiscountListItemComponent } from './discount/discount-list-item/discount-list-item.component';
import { DiscountListComponent } from './discount/discount-list/discount-list.component';
import { DiscountRuleFormComponent } from './discount/discount-rule-form/discount-rule-form.component';
import { OrderListItemComponent } from './order/order-list-item/order-list-item.component';
import { ProductDetailEditComponent } from './product/product-detail-edit/product-detail-edit.component';
import { ProductListItemComponent } from './product/product-list-item/product-list-item.component';
import { ProductListComponent } from './product/product-list/product-list.component';


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
    CartOverviewListItemComponent,
    LoginComponent,
    PaymentComponent,
    AuthCallbackComponent,
    OrderListComponent,
    OrderListItemComponent,
    DiscountListItemComponent,
    DiscountListComponent,
    ProductDetailEditComponent,
    ApplyCouponComponent,
    UuidValidatorDirective,
    StatisticsComponent,
    AdminDiscountOverviewComponent,
    AdminDiscountFormComponent,
    AdminDiscountListComponent,
    AdminDiscountListItemComponent,
    AdminDiscountRuleListComponent,
    AdminDiscountRuleListItemComponent,
    AdminDiscountActionListComponent,
    AdminDiscountActionListItemComponent,
    DiscountActionFormComponent,
    DiscountRuleFormComponent
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      /**
       * https://github.com/xieziyu/ngx-echarts
       */
      echarts: () => import('echarts'), 
    }),
    OAuthModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddAppKeyInterceptorInterceptor,
    multi: true,
  }, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

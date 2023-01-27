import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './authcallback/authcallback.component';
import { CanNavigateToUserGuard } from './CanNavigateToUserGuard';
import { CartOverviewComponent } from './cart/cart-overview/cart-overview.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DiscountActionFormComponent } from './discount/discount-action-form/discount-action-form.component';
import { AdminDiscountFormComponent } from './admin/admin-discount-form/admin-discount-form.component';
import { AdminDiscountOverviewComponent } from './admin/admin-discount-overview/admin-discount-overview.component';
import { DiscountRuleFormComponent } from './discount/discount-rule-form/discount-rule-form.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailEditComponent } from './product/product-detail-edit/product-detail-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'auth/callback',
    component: AuthCallbackComponent
  },
  {
    path: 'cart',
    component: CartOverviewComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'products/:id/edit',
    component: ProductDetailEditComponent
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [CanNavigateToUserGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [CanNavigateToUserGuard]
  },
  {
    path: 'discounts',
    component: AdminDiscountOverviewComponent,
    canActivate: [CanNavigateToUserGuard]
  },
  {
    path: 'discount',
    component: AdminDiscountFormComponent,
    canActivate: [CanNavigateToUserGuard]
  },
  {
    path: 'action',
    component: DiscountActionFormComponent,
    canActivate: [CanNavigateToUserGuard]
  },
  {
    path: 'rule',
    component: DiscountRuleFormComponent,
    canActivate: [CanNavigateToUserGuard]
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [CanNavigateToUserGuard]
  },
  {
    path: 'index.html',
    redirectTo: 'products',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

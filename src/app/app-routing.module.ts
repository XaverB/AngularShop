import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './authcallback/authcallback.component';
import { CanNavigateToUserGuard } from './CanNavigateToUserGuard';
import { CartOverviewComponent } from './cart-overview/cart-overview.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

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

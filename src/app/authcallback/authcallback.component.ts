import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { CartStoreService } from '../shared/cart-store.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-authcallback',
  templateUrl: './authcallback.component.html',
  styleUrls: ['./authcallback.component.css']
})

/** inspired by https://github.com/manfredsteyer/angular-oauth2-oidc/issues/424#issuecomment-1275521962 */
export class AuthCallbackComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private cartStoreService: CartStoreService,
    private cartService: CartService) { }

  ngOnInit(): void {
    const isLoggedInAndCartIsNotReferenced = this.authenticationService.isLoggedIn() && this.cartService.cart.customerId === undefined;
    if (isLoggedInAndCartIsNotReferenced) {
      this.cartStoreService.referenceCartWithCustomer(this.cartService.cart.sessionId!, this.cartService.cart.id!);
    }

    setTimeout(() => {
      try {
        const url = localStorage.getItem('returnUrl')

        if (url) this.router.navigateByUrl(url)

        else this.router.navigateByUrl(window.location.origin)
      } catch (error) {
        console.log('No return URL found');
      }
    }, 5000);
  }
}
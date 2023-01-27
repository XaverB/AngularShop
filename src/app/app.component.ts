import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from './shared/authentication.service';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';
import { ShopStoreService } from './shared/shop-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  shopName: string = "";

  constructor(private authService: AuthenticationService, private oauthService: OAuthService, private router: Router,
    private shopStoreService: ShopStoreService) {
    this.configureWithNewConfigApi();
  }

  ngOnInit(): void {
    this.shopStoreService.getShopName()
      .subscribe(res => this.shopName = res);

      console.log(`Shop: ${environment.shopId.toString()}`);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();


    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent)
        console.error(event);
      // } else {
      //   console.warn(event);
      // }
    });
  }

  logout() {
    this.authService.logout();
  }

  title = 'xavers-shop';
}

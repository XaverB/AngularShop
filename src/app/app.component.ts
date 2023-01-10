import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from './shared/authentication.service';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService, private oauthService: OAuthService, private router: Router) {
    this.configureWithNewConfigApi();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
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

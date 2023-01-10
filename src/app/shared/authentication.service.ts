import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private oauthService: OAuthService, private router: Router) { }

  login(returnUrl: string): boolean {
    this.oauthService.initCodeFlow(returnUrl || this.router.url);
    return true;
  }

  logout() {
    this.oauthService.logOut()
  }

  isLoggedIn() {
    const hasValidAccessToken = this.oauthService.hasValidAccessToken();
    const hasValidIdToken = this.oauthService.hasValidIdToken();
    return hasValidAccessToken && hasValidIdToken;
  }

  get user() { return this.oauthService.getIdentityClaims(); }

  get customerId(): null | number {
    
    return this.isLoggedIn() ? 501 : null;
  }
}
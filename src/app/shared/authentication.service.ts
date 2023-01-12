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

  isAdmin(): Boolean {

    if (!this.isLoggedIn()) return false;
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims.hasOwnProperty('groups')) return false;
    const groups: string[] = claims.groups;
    const isAdmin = groups.includes('admin');

    return isAdmin;
  }

  get user() { return this.oauthService.getIdentityClaims(); }

  get customerId(): null | number {
    if (!this.isLoggedIn()) return null;

    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims.hasOwnProperty('customerid')) return null;
    return Number(claims.customerid);
  }
}
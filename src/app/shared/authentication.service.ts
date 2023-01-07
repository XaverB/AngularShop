import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private oauthService: OAuthService) { }

  login(username: string, password: string): boolean {
    // if (username == 'test' && password == 'test') {
    //   sessionStorage.setItem('login', 'true');
    //   return true;
    // }
    // return false;
    this.oauthService.initCodeFlow();
    return true;
  }

  isLoggedIn() {
    const hasValidAccessToken = this.oauthService.hasValidAccessToken();
    const hasValidIdToken = this.oauthService.hasValidIdToken();
    return  hasValidAccessToken && hasValidIdToken;
  }

  get customerId(): Number {
    return 1; // TODO
  }
}
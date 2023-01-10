import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  login: any = {
    username: '',
    password: ''
  };

  private returnTo: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.returnTo = params['returnUrl'])
  }

  submitForm() {
    if (this.returnTo) localStorage.setItem('returnUrl', this.returnTo);
    else localStorage.setItem('returnUrl', 'products')
    if (this.auth.login(this.returnTo)) {
      this.router.navigate([this.returnTo]);
    } else {
      // TODO error message
    }
  }

}

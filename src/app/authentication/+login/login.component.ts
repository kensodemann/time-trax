import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'trx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailAddress: string;
  public password: string;
  private loginFailureMessage: MdSnackBarRef<any>;

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  login() {
    const router = this.router;
    this.authService.login(this.emailAddress, this.password).subscribe((success) => {
      if (success) {
        router.navigate(['timesheet', 'current']);
      } else {
        this.password = '';
        this.displayLoginFailure();
      }
    });
  }

  dismissErrorMessage() {
    if (this.loginFailureMessage) {
      this.loginFailureMessage.dismiss();
      this.loginFailureMessage = undefined;
    }
  }

  private displayLoginFailure() {
    this.loginFailureMessage = this.snackBar.open('Login Failed', 'Invalid E-Mail Address or Password');
  }
}

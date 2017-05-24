import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { IdentityService } from '../../core/identity/identity.service';

@Component({
  selector: 'trx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailAddress: string;
  public password: string;
  private loginFailureMessage: MdSnackBarRef<any>;

  constructor(private authService: AuthenticationService, private identity: IdentityService,
    private router: Router, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.identity.clear();
  }

  login() {
    const router = this.router;
    this.authService.login(this.emailAddress, this.password).subscribe((success) => {
      if (success) {
        this.identity.get().subscribe(u => router.navigate(['timesheet']));
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

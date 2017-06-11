import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';

import { ErrorMessageService } from '../../shared/services/error-message/error-message.service';
import { UserService } from '../../data/services/user/user.service';

@Component({
  selector: 'trx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  password: string;
  newPassword: string;
  verifyPassword: string;
  errorMessage: string;

  constructor(private router: Router, private snackBar: MdSnackBar, private user: UserService, private error: ErrorMessageService) { }

  ngOnInit() { }

  cancel() {
    this.navigateBack();
  }

  changePassword() {
    this.user.changePassword(this.password, this.newPassword)
      .catch(res => {
        this.errorMessage = this.error.getMessage(res);
        return Observable.empty();
      })
      .subscribe(() => {
        this.snackBar.open('Success', 'Your password has been changed successfully', { duration: 3000 });
        this.navigateBack();
      });
  }

  private navigateBack() {
    this.router.navigate(['user-administration', 'profile']);
  }

}

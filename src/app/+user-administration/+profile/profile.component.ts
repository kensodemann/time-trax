import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import { ErrorMessageService } from '../../shared/services/error-message/error-message.service';
import { IdentityService } from '../../core/identity/identity.service';
import { UserService } from '../../data/services/user/user.service';
import { User } from '../../data/models/user';

@Component({
  selector: 'trx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  username: string;

  errorMessage: string;

  private user: User;

  constructor(private location: Location, private snackBar: MdSnackBar, private identity: IdentityService,
    private users: UserService, private error: ErrorMessageService) { }

  ngOnInit() {
    this.identity.get()
      .switchMap((u) => this.users.get(u._id))
      .subscribe((user) => {
        this.user = user;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
      });
  }

  cancel(): void {
    this.location.back();
  }

  save(): void {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.username = this.username;
    this.users.save(this.user)
      .catch(res => {
        this.errorMessage = this.error.getMessage(res);
        return Observable.empty();
      })
      .subscribe(u => {
        this.snackBar.open('Success', 'Your profile has been updated', { duration: 3000 });
        this.location.back();
      });
  }
}

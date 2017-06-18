import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
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
  title: string;

  firstName: string;
  lastName: string;
  username: string;

  errorMessage: string;

  private successMessage: string;
  private user: User;

  constructor(private route: ActivatedRoute, private location: Location, private snackBar: MdSnackBar, private identity: IdentityService,
    private users: UserService, private error: ErrorMessageService) { }

  ngOnInit() {
    this.route.params
      .do(params => this.initialize(params.id))
      .switchMap((params) => {
        if (params.id) {
          return Observable.of(params.id);
        } else {
          return this.identity.get().map((u) => u._id);
        }
      }).subscribe(id => this.getUser(id));
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
        this.snackBar.open('Success', this.successMessage, { duration: 3000 });
        this.location.back();
      });
  }

  private getUser(id) {
    return this.users.get(id).subscribe((user) => {
      this.user = user;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.username = user.username;
    });
  }

  private initialize(id) {
    if (!id) {
      this.successMessage = 'Your profile updated';
      this.title = 'Your Profile';
    } else if (id === 'new') {
      this.successMessage = 'New user created';
      this.title = 'Create User';
     } else {
      this.successMessage = 'User profile updated';
      this.title = 'Edit User Profile'
    }
  }
}

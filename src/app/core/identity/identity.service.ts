import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { User } from '../../data/models/user';

@Injectable()
export class IdentityService {
  private user: Observable<User>;

  constructor(private http: Http) { }

  get(): Observable<User> {
    if (!this.user) {
      this.user = this.http.get(`${environment.dataService}/currentUser`)
        .map(res => new User(res.json()));
    }

    return this.user;
  }

  clear(): void {
    this.user = undefined;
  }

}

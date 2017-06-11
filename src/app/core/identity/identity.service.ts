import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { User } from '../../data/models/user';

@Injectable()
export class IdentityService {
  private user: Observable<User>;

  changed: Subject<User>;

  constructor(private http: Http) {
    this.changed = new Subject();
  }

  get(): Observable<User> {
    if (!this.user) {
      this.user = this.http.get(`${environment.dataService}/currentUser`)
        .map(res => new User(res.json()));
      this.user.subscribe(u => this.changed.next(u));
    }

    return this.user;
  }

  clear(): void {
    this.user = undefined;
    this.changed.next();
  }

}

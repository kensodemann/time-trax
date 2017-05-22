import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import { environment } from '../../../../environments/environment';
import { IdentityService } from '../../../core/identity/identity.service';
import { User } from '../../../data/models/user';

@Injectable()
export class UserService {

  constructor(private http: Http, private identity: IdentityService) { }

  changePassword(previousPassword: string, newPassword: string): Observable<any> {
    return this.identity.get()
      .switchMap(user => this.http.post(`${this.baseUrl(user._id)}/password`,
        { password: previousPassword, newPassword: newPassword }));
  }

  get(id: string): Observable<User> {
    return this.http.get(this.baseUrl(id)).map(res => new User(res.json()));
  }

  save(user: User): Observable<User> {
    return this.http.post(this.baseUrl(user._id), user).map(res => new User(res.json()));
  }

  private baseUrl(id: string) {
    return `${environment.dataService}/users` + (id ? `/${id}` : '');
  }
}

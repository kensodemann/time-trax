import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import { environment } from '../../../../environments/environment';
import { IdentityService } from '../../../core/identity/identity.service';

@Injectable()
export class UserService {

  constructor(private http: Http, private identity: IdentityService) { }

  changePassword(previousPassword: string, newPassword: string): Observable<any> {
    return this.identity.get()
      .switchMap(user => this.http.post(`${environment.dataService}/users/${user._id}/password`,
        { password: previousPassword, newPassword: newPassword }));
  }
}

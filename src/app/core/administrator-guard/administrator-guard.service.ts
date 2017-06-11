import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { IdentityService } from '../identity/identity.service';

@Injectable()
export class AdministratorGuardService implements CanActivate {

  constructor(private identity: IdentityService) { }

  canActivate(): Observable<boolean> {
    return this.identity.get()
      .catch(x => Observable.of(null))
      .map(u => !!u && u.roles.includes('admin'));
  }

}

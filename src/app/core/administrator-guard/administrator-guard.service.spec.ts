import { AdministratorGuardService } from './administrator-guard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { IdentityService } from '../identity/identity.service';
import { User } from '../../data/models/user';

class IdentityServiceMock {
  get(): Observable<User> {
    return Observable.empty();
  }
}

describe('IsAdministratorService', () => {
  let identity: IdentityServiceMock;
  let service: AdministratorGuardService;

  beforeEach(() => {
    identity = new IdentityServiceMock();
    service = new AdministratorGuardService(identity as IdentityService);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('emits false if the user is not logged in', () => {
      spyOn(identity, 'get').and.returnValue(Observable.throw(new Error('whatever, dude')));
      let result;
      service.canActivate().subscribe(x => result = x);
      expect(result).toEqual(false);
    });

     it('emits false if the logged in user has no roles', () => {
      spyOn(identity, 'get').and.returnValue(Observable.of(new User({
        _id: 42,
        username: 'joe@blow.com',
        roles: []
      })));
      let result;
      service.canActivate().subscribe(x => result = x);
      expect(result).toEqual(false);
    });

    it('emits false if the logged in user is not an admin', () => {
      spyOn(identity, 'get').and.returnValue(Observable.of(new User({
        _id: 42,
        username: 'joe@blow.com',
        roles: ['user', 'not-an-admin']
      })));
      let result;
      service.canActivate().subscribe(x => result = x);
      expect(result).toEqual(false);
    });

    it('emits true if the logged in user is an admin', () => {
      spyOn(identity, 'get').and.returnValue(Observable.of(new User({
        _id: 42,
        username: 'joe@blow.com',
        roles: ['admin']
      })));
      let result;
      service.canActivate().subscribe(x => result = x);
      expect(result).toEqual(true);
    });
  });
});

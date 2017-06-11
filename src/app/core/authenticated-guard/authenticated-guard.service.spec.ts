import { AuthenticatedGuardService } from './authenticated-guard.service';
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

describe('IsAuthenticatedService', () => {
  let service: AuthenticatedGuardService;
  let identity: IdentityServiceMock;

  beforeEach(() => {
    identity = new IdentityServiceMock();
    service = new AuthenticatedGuardService(identity as IdentityService);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('emits true if the user is logged in', () => {
      spyOn(identity, 'get').and.returnValue(Observable.of(new User({ _id: '42395', name: 'Bob' })));
      let result;
      service.canActivate().subscribe(x => result = x);
      expect(result).toEqual(true);
    });

    it('emits false if the user is not logged in', () => {
      spyOn(identity, 'get').and.returnValue(Observable.throw(new Error('whatever, dude')));
      let result;
      service.canActivate().subscribe(x => result = x);
      expect(result).toEqual(false);
    });
  });
});

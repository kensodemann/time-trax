import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { DateService } from '../../../shared/services/date/date.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user';
import { UserService } from './user.service';

class IdentityStub {
  get(): Observable<User> { return Observable.empty(); }
};

describe('UserService', () => {
  let service;
  let mockIdentity;
  let mockBackend;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);
    mockIdentity = new IdentityStub();

    service = new UserService(http, mockIdentity);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('change password', () => {
    it('gets the current identity', () => {
      spyOn(mockIdentity, 'get').and.callThrough();
      service.changePassword('IamOld', 'NewPassword');
      expect(mockIdentity.get).toHaveBeenCalledTimes(1);
    });

    it('posts the change password request', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      spyOn(mockIdentity, 'get').and.returnValue(Observable.of({ _id: '11387651' }));

      let result;
      service.changePassword('IamOld', 'NewPassword').subscribe(res => result = res);

      expect(connection.request.url).toEqual(`${environment.dataService}/users/11387651/password`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(JSON.parse(connection.request.getBody())).toEqual({
        password: 'IamOld',
        newPassword: 'NewPassword'
      });
    });
  });
});

import { Http, RequestMethod, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';

import { AuthenticationTokenService } from '../../../core/authentication-token/authentication-token.service';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../../environments/environment';

describe('Authentication Service', () => {
  let authenticationTokenService;
  let mockBackend;
  let service;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);
    const localStorageService = new LocalStorageService({});
    authenticationTokenService = new AuthenticationTokenService(localStorageService);

    service = new AuthenticationService(http, authenticationTokenService);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('posts to the login endpoint', () => {
      let connection: MockConnection;
      const credentials = {
        username: 'SuperBob',
        password: 'BigHarrySquidPant$'
      };
      mockBackend.connections.subscribe(c => connection = c);
      spyOn(authenticationTokenService, 'set');
      service.login(credentials.username, credentials.password);
      expect(connection.request.url).toEqual(`${environment.dataService}/login`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.text()).toEqual(JSON.stringify(credentials));
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          success: true,
          user: {
            firstName: 'Robert',
            lastName: 'Johnson'
          },
          token: 'IAmToken'
        }
      })));
    });

    it('results in true if the login is successful', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      spyOn(authenticationTokenService, 'set');
      service.login('user', 'password').subscribe((res) => {
        expect(res).toEqual(true);
      });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          success: true,
          user: {
            firstName: 'James',
            lastName: 'Jones'
          },
          token: 'IAmToken'
        }
      })));
    });

    it('results in false if the login is unsuccessful', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      spyOn(authenticationTokenService, 'set');
      service.login('user', 'password').subscribe((res) => {
        expect(res).toEqual(false);
      });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          success: false
        }
      })));
    });

    it('saves the token if the login is successful', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      spyOn(authenticationTokenService, 'set');
      service.login('user', 'password').subscribe((res) => {
        expect(authenticationTokenService.set).toHaveBeenCalledTimes(1);
        expect(authenticationTokenService.set).toHaveBeenCalledWith('IAmToken');
      });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          success: true,
          user: {
            firstName: 'James',
            lastName: 'Jones'
          },
          token: 'IAmToken'
        }
      })));
    });
  });

  describe('logout', () => {
    it('posts to the logout endpoint', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.logout();
      expect(connection.request.url).toEqual(`${environment.dataService}/logout`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.text()).toEqual(JSON.stringify({ logout: true }));
      connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    });

    it('clears the token', () => {
      spyOn(authenticationTokenService, 'clear');
      service.logout();
      expect(authenticationTokenService.clear).toHaveBeenCalledTimes(1);
    });
  });

  describe('token refresh', () => {
    it('schedules a refresh every 20 minutes', () => {
      spyOn(Observable, 'interval').and.returnValue(Observable.empty());
      service.scheduleTokenRefresh();
      expect(Observable.interval).toHaveBeenCalledTimes(1);
      expect(Observable.interval).toHaveBeenCalledWith(20 * 60 * 1000);
    });

    it('calls the fresh login token endpoint', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      spyOn(Observable, 'interval').and.returnValue(Observable.of(null));
      service.scheduleTokenRefresh();
      expect(connection.request.url).toEqual(`${environment.dataService}/freshLoginToken`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('sets a new token', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      spyOn(authenticationTokenService, 'set');
      spyOn(Observable, 'interval').and.returnValue(Observable.of(null));
      service.scheduleTokenRefresh();
      expect(connection.request.url).toEqual(`${environment.dataService}/freshLoginToken`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          token: 'IAmFreshToken'
        }
      })));
      expect(authenticationTokenService.set).toHaveBeenCalledTimes(1);
      expect(authenticationTokenService.set).toHaveBeenCalledWith('IAmFreshToken');
    });
  });
});

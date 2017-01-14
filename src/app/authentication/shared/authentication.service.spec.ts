import { Http, RequestMethod, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationTokenService } from '../../shared/authentication-token/authentication-token.service';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';

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
});

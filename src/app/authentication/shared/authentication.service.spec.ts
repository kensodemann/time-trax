import { addProviders, async, inject } from '@angular/core/testing';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environment';

describe('Authentication Service', () => {
  beforeEach(() => {
    addProviders([
      HTTP_PROVIDERS,
      provide(XHRBackend, { useClass: MockBackend }),
      AuthenticationService
    ]);
  });

  it('should exist',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service).toBeTruthy();
    }));

  describe('login', () => {
    it('posts to the login endpoint',
      inject([XHRBackend, AuthenticationService], (mockBackend, service: AuthenticationService) => {
        let connection: MockConnection;
        let credentials = {
          username: 'SuperBob',
          password: 'BigHarrySquidPant$'
        };
        mockBackend.connections.subscribe(c => connection = c);
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
      }));

    it('results in true if the login is successful',
      inject([XHRBackend, AuthenticationService], (mockBackend, service: AuthenticationService) => {
        let connection: MockConnection;
        mockBackend.connections.subscribe(c => connection = c);
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
      }));

    it('results in false if the login is successful',
      inject([XHRBackend, AuthenticationService], (mockBackend, service: AuthenticationService) => {
        let connection: MockConnection;
        mockBackend.connections.subscribe(c => connection = c);
        service.login('user', 'password').subscribe((res) => {
          expect(res).toEqual(false);
        });
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: {
            success: false
          }
        })));
      }));
  });

  describe('logout', () => {
    it('posts to the logout endpoint',
      inject([XHRBackend, AuthenticationService], (mockBackend, service: AuthenticationService) => {
        let connection: MockConnection;
        mockBackend.connections.subscribe(c => connection = c);
        service.logout();
        expect(connection.request.url).toEqual(`${environment.dataService}/logout`);
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.text()).toEqual(JSON.stringify({ logout: true }));
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, })));
      }));
  });
});

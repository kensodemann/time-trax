import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, RequestMethod, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationTokenService } from '../../shared/authentication-token.service';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';

describe('Authentication Service', () => {
  let localStorageService: Object;

  beforeEach(() => { localStorageService = {}; });
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthenticationService,
        AuthenticationTokenService,
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should exist',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service).toBeTruthy();
    }));

  describe('login', () => {
    it('posts to the login endpoint',
      inject([XHRBackend, AuthenticationTokenService, AuthenticationService], (mockBackend, authenticationTokenService: AuthenticationTokenService, service: AuthenticationService) => {
        let connection: MockConnection;
        let credentials = {
          username: 'SuperBob',
          password: 'BigHarrySquidPant$'
        };
        mockBackend.connections.subscribe(c => connection = c);
        spyOn(authenticationTokenService, 'setToken');
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
      inject([XHRBackend, AuthenticationTokenService, AuthenticationService], (mockBackend, authenticationTokenService: AuthenticationTokenService, service: AuthenticationService) => {
        let connection: MockConnection;
        mockBackend.connections.subscribe(c => connection = c);
        spyOn(authenticationTokenService, 'setToken');
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

    it('results in false if the login is unsuccessful',
      inject([XHRBackend, AuthenticationTokenService, AuthenticationService], (mockBackend, authenticationTokenService: AuthenticationTokenService, service: AuthenticationService) => {
        let connection: MockConnection;
        mockBackend.connections.subscribe(c => connection = c);
        spyOn(authenticationTokenService, 'setToken');
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

    it('saves the token if the login is successful',
      inject([XHRBackend, AuthenticationTokenService, AuthenticationService],
        (mockBackend, authenticationTokenService: AuthenticationTokenService, service: AuthenticationService) => {
          let connection: MockConnection;
          mockBackend.connections.subscribe(c => connection = c);
          spyOn(authenticationTokenService, 'setToken');
          service.login('user', 'password').subscribe((res) => {
            expect(authenticationTokenService.setToken).toHaveBeenCalledTimes(1);
            expect(authenticationTokenService.setToken).toHaveBeenCalledWith('IAmToken');
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

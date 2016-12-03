import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationTokenService } from './authentication-token.service';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

describe('AuthenticationToken Service', () => {
  let localStorageConfig = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationTokenService,
        LocalStorageService,
        { provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageConfig }
      ]
    });
  });

  it('exists',
    inject([AuthenticationTokenService], (service: AuthenticationTokenService) => {
      expect(service).toBeTruthy();
    }));

  describe('setting a token', () => {
    it('saves the token to local storage',
      inject([LocalStorageService, AuthenticationTokenService], (localStorage: LocalStorageService, service: AuthenticationTokenService) => {
        spyOn(localStorage, 'set')
        service.setToken('IAmACuteLittleLoginToken');
        expect(localStorage.set).toHaveBeenCalledTimes(1);
        expect(localStorage.set).toHaveBeenCalledWith('authenticationToken', 'IAmACuteLittleLoginToken');
      }));
  });

  describe('getting a token', () => {
    it('gets the token from local storage',
      inject([LocalStorageService, AuthenticationTokenService], (localStorage: LocalStorageService, service: AuthenticationTokenService) => {
        service.setToken('ThisIsTheToken');
        expect(service.getToken()).toEqual('ThisIsTheToken');
      }));

    it('gets the last set token',
      inject([LocalStorageService, AuthenticationTokenService], (localStorage: LocalStorageService, service: AuthenticationTokenService) => {
        service.setToken('ThisIsTheToken');
        service.setToken('ThisIsANewToken');
        expect(service.getToken()).toEqual('ThisIsANewToken');
      }));
  });
});

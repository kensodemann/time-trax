import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationTokenService } from './authentication-token.service';
import { LocalStorage } from 'h5webstorage';

describe('AuthenticationToken Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationTokenService, {provide: LocalStorage, useClass: MockLocalStorage}]
    });
  });

  it('exists',
    inject([AuthenticationTokenService], (service: AuthenticationTokenService) => {
      expect(service).toBeTruthy();
    }));

  describe('setting a token', () => {
    it('saves the token to local storage',
      inject([LocalStorage, AuthenticationTokenService], (localStorage : LocalStorage, service: AuthenticationTokenService) => {
        service.setToken('IAmACuteLittleLoginToken');
        expect(localStorage['authenticationToken']).toEqual('IAmACuteLittleLoginToken');
      }));
  });

  describe('getting a token', () => {
    it('gets the token from local storage',
      inject([LocalStorage, AuthenticationTokenService], (localStorage: LocalStorage, service: AuthenticationTokenService) => {
        localStorage['authenticationToken'] = 'ThisIsTheToken'
        expect(service.getToken()).toEqual('ThisIsTheToken');
      }));

    it('gets the last set token',
      inject([LocalStorage, AuthenticationTokenService], (localStorage: LocalStorage, service: AuthenticationTokenService) => {
        localStorage['authenticationToken'] = 'ThisIsTheToken'
        service.setToken('ThisIsANewToken');
        expect(service.getToken()).toEqual('ThisIsANewToken');
      }));
  });
  
  class MockLocalStorage {
    authenticationToken: string
  }
});

import { AuthenticationTokenService } from './authentication-token.service';
import { LocalStorageService } from 'angular-2-local-storage';

describe('AuthenticationToken Service', () => {
  let service;
  let localStorageService;

  beforeEach(() => {
    localStorageService = new LocalStorageService({});
    service = new AuthenticationTokenService(localStorageService);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('set', () => {
    it('saves the token to local storage', () => {
      spyOn(localStorageService, 'set');
      service.set('IAmACuteLittleLoginToken');
      expect(localStorageService.set).toHaveBeenCalledTimes(1);
      expect(localStorageService.set).toHaveBeenCalledWith('authenticationToken', 'IAmACuteLittleLoginToken');
    });
  });

  describe('get', () => {
    it('gets the token from local storage', () => {
      service.set('ThisIsTheToken');
      expect(service.get()).toEqual('ThisIsTheToken');
    });

    it('gets the last set token', () => {
      service.set('ThisIsTheToken');
      service.set('ThisIsANewToken');
      expect(service.get()).toEqual('ThisIsANewToken');
    });
  });

  describe('clear', () => {
    it('clears the token', () => {
      service.set('ThisIsMyFavoriteToken');
      service.clear();
      expect(service.get()).toBeNull();
    });
  });
});

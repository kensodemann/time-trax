import { Injectable } from '@angular/core';
import { LocalStorage } from 'h5webstorage';

@Injectable()
export class AuthenticationTokenService {

  constructor(private localStorage: LocalStorage) { }

  setToken(token: string) {
    this.localStorage['authenticationToken'] = token;
  }

  getToken(): string {
    return this.localStorage['authenticationToken'];
  }
}

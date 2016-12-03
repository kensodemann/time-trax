import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthenticationTokenService {
  private key = 'authenticationToken';

  constructor(private localStorage: LocalStorageService) { }

  setToken(token: string) {
    this.localStorage.set(this.key, token);
  }

  getToken(): string {
    return this.localStorage.get<string>(this.key);
  }
}

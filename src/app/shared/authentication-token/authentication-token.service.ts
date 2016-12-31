import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthenticationTokenService {
  private key = 'authenticationToken';

  constructor(private localStorage: LocalStorageService) { }

  set(token: string) {
    this.localStorage.set(this.key, token);
  }

  get(): string {
    return this.localStorage.get<string>(this.key);
  }

  clear() {
    this.localStorage.remove(this.key);
  }
}

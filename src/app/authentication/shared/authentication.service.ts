import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AuthenticationTokenService } from '../../shared/authentication-token/authentication-token.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private authenticationTokenService: AuthenticationTokenService) {}

  login(userId: string, password: string): Observable<boolean> {
    const credentials = {
      username: userId,
      password: password
    };
    return this.http.post(`${environment.dataService}/login`, JSON.stringify(credentials))
      .do(res => {
        if (res.json().success) {
          this.authenticationTokenService.set(res.json().token);
        }
      })
      .map(res => res.json().success);
  }

  logout(): Observable<Response> {
    this.authenticationTokenService.clear();
    return this.http.post(`${environment.dataService}/logout`, JSON.stringify({ logout: true }));
  }
}

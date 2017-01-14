import { Injectable } from '@angular/core';
import { ConnectionBackend, Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationTokenService } from '../authentication-token/authentication-token.service';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

@Injectable()
export class TimeTraxHttpService extends Http {
  constructor(connection: ConnectionBackend, defaultOptions: RequestOptions,
    private tokenService: AuthenticationTokenService, private router: Router) {
    super(connection, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.appendToken(options);
    return this.redirectIfNotLoggedIn(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.appendToken(options);
    options = this.appendContentTypeJson(options);
    return this.redirectIfNotLoggedIn(super.post(url, body, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.appendToken(options);
    return this.redirectIfNotLoggedIn(super.delete(url, options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.appendToken(options);
    options = this.appendContentTypeJson(options);
    return this.redirectIfNotLoggedIn(super.put(url, body, options));
  }

  private appendToken(options?: RequestOptionsArgs): RequestOptionsArgs {
    const token = this.tokenService.get();
    if (token) {
      options = this.buildOptions(options);
      options.headers.append('Authorization', `Bearer ${token}`);
    }
    return options;
  }

  private appendContentTypeJson(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = this.buildOptions(options);
    options.headers.append('content-type', 'application/json; charset=utf-8');
    return options;
  }

  private buildOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    return options;
  }

  private redirectIfNotLoggedIn(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status === 401) {
        this.router.navigate(['authentication', 'login']);
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });
  }
}

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { AuthenticationTokenModule } from '../authentication-token/authentication-token.module';

import { AuthenticationTokenService } from '../authentication-token/authentication-token.service';
import { TimeTraxHttpService } from './time-trax-http.service';

export function timeTraxHttpServiceFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
  tokenService: AuthenticationTokenService, router: Router) {
  return new TimeTraxHttpService(xhrBackend, requestOptions, tokenService, router);
}

@NgModule({
  imports: [
    AuthenticationTokenModule,
    HttpModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: timeTraxHttpServiceFactory,
      deps: [XHRBackend, RequestOptions, AuthenticationTokenService, Router]
    }
  ]
})
export class TimeTraxHttpModule { }

import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { AuthenticationTokenService } from '../../../core/authentication-token/authentication-token.service';
import { TimeTraxHttpService } from './time-trax-http.service';

export function timeTraxHttpServiceFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
  tokenService: AuthenticationTokenService, router: Router) {
  return new TimeTraxHttpService(xhrBackend, requestOptions, tokenService, router);
}

@NgModule({
  imports: [
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

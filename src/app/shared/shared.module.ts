import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationTokenService } from './authentication-token.service';
import { DateService } from './date.service';
import { TimeTraxHttpService } from './time-trax-http.service';

export function timeTraxHttpServiceFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
  tokenService: AuthenticationTokenService, router: Router) {
  return new TimeTraxHttpService(xhrBackend, requestOptions, tokenService, router);
}

@NgModule({
  imports: [
    MaterialModule.forRoot()
  ],
  providers: [
    AuthenticationTokenService,
    DateService,
    {
      provide: Http,
      useFactory: timeTraxHttpServiceFactory,
      deps: [XHRBackend, RequestOptions, AuthenticationTokenService, Router]
    }
  ],
})
export class SharedModule { }

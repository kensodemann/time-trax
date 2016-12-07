import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationTokenService } from './authentication-token.service';
import { TimeTraxHttpService } from './time-trax-http.service';

@NgModule({
  imports: [
    MaterialModule.forRoot()
  ],
  providers: [
    AuthenticationTokenService,
    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, tokenService: AuthenticationTokenService, router: Router) => new TimeTraxHttpService(xhrBackend, requestOptions, tokenService, router),
      deps: [XHRBackend, RequestOptions, AuthenticationTokenService, Router]
    }
  ],
})
export class SharedModule { }
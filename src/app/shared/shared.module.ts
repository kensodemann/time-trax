import { NgModule } from '@angular/core';

import { AuthenticationTokenModule } from './authentication-token/authentication-token.module';
import { DateModule } from './date/date.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { MessageDialogModule } from './message-dialog/message-dialog.module';
import { TimeTraxHttpModule } from './time-trax-http/time-trax-http.module';

@NgModule({
  exports: [
    AuthenticationTokenModule,
    DateModule,
    ErrorHandlerModule,
    MessageDialogModule,
    TimeTraxHttpModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';

import { AuthenticationTokenModule } from './authentication-token/authentication-token.module';
import { DateModule } from './date/date.module';
import { ErrorMessageModule } from './error-message/error-message.module';
import { MessageDialogModule } from './message-dialog/message-dialog.module';
import { TimeTraxHttpModule } from './time-trax-http/time-trax-http.module';

@NgModule({
  exports: [
    AuthenticationTokenModule,
    DateModule,
    ErrorMessageModule,
    MessageDialogModule,
    TimeTraxHttpModule
  ]
})
export class SharedModule { }

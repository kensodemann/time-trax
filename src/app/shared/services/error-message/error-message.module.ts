import { NgModule } from '@angular/core';

import { MessageDialogModule } from '../message-dialog/message-dialog.module';
import { ErrorMessageService } from './error-message.service';

@NgModule({
  imports: [MessageDialogModule],
  providers: [ErrorMessageService]
})
export class ErrorMessageModule { }

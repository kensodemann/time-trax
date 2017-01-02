import { NgModule } from '@angular/core';

import { MessageDialogModule } from '../message-dialog/message-dialog.module';
import { ErrorHandlerService } from './error-handler.service';

@NgModule({
  imports: [MessageDialogModule],
  providers: [ErrorHandlerService]
})
export class ErrorHandlerModule { }

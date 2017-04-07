import { NgModule } from '@angular/core';

import { ErrorDialogModule } from '../error-dialog/error-dialog.module';
import { ErrorMessageService } from './error-message.service';

@NgModule({
  imports: [ErrorDialogModule],
  providers: [ErrorMessageService]
})
export class ErrorMessageModule { }

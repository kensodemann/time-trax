import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';


import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MessageDialogService } from './message-dialog.service';

@NgModule({
  imports: [MaterialModule],
  declarations: [ErrorDialogComponent],
  providers: [MessageDialogService],
  entryComponents: [ErrorDialogComponent]
})
export class MessageDialogModule { }

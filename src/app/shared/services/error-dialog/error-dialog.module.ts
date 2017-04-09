import { NgModule } from '@angular/core';
import { MdButtonModule, MdDialogModule, MdIconModule } from '@angular/material';

import { ErrorDialogComponent } from './error-dialog.component';
import { ErrorDialogService } from './error-dialog.service';

@NgModule({
  imports: [
    MdButtonModule,
    MdDialogModule,
    MdIconModule
  ],
  declarations: [ErrorDialogComponent],
  providers: [ErrorDialogService],
  entryComponents: [ErrorDialogComponent]
})
export class ErrorDialogModule { }

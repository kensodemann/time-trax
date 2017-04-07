import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ErrorDialogComponent } from './error-dialog.component';
import { ErrorDialogService } from './error-dialog.service';

@NgModule({
  imports: [MaterialModule],
  declarations: [ErrorDialogComponent],
  providers: [ErrorDialogService],
  entryComponents: [ErrorDialogComponent]
})
export class ErrorDialogModule { }

import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { AskDialogComponent } from './ask-dialog.component';
import { AskDialogService } from './ask-dialog.service';

@NgModule({
  imports: [MaterialModule],
  declarations: [AskDialogComponent],
  providers: [AskDialogService],
  entryComponents: [AskDialogComponent]
})
export class AskDialogModule { }

import { NgModule } from '@angular/core';
import { MdButtonModule, MdDialogModule, MdIconModule } from '@angular/material';

import { AskDialogComponent } from './ask-dialog.component';
import { AskDialogService } from './ask-dialog.service';

@NgModule({
  imports: [
    MdButtonModule,
    MdDialogModule,
    MdIconModule
  ],
  declarations: [AskDialogComponent],
  providers: [AskDialogService],
  entryComponents: [AskDialogComponent]
})
export class AskDialogModule { }

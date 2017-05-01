import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdButtonModule, MdDialogModule, MdInputModule } from '@angular/material';

import { DataModule } from '../../data/data.module';
import { TaskTimerEditorComponent } from './task-timer-editor.component';
import { TaskTimerEditorService } from './task-timer-editor.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    MdAutocompleteModule,
    MdButtonModule,

    MdDialogModule,
    MdInputModule,
    ReactiveFormsModule,

    DataModule,
    SharedModule
  ],
  declarations: [TaskTimerEditorComponent],
  providers: [TaskTimerEditorService],
  entryComponents: [TaskTimerEditorComponent]
})
export class TaskTimerEditorModule { }

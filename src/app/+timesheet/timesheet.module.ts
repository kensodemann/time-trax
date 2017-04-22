import { NgModule } from '@angular/core';
import { MdIconModule } from '@angular/material';

import { TaskTimerComponent } from './shared/task-timer/task-timer.component';
import { TimesheetComponent } from './timesheet.component';
import { routing } from './timesheet.routing';
import { DataModule } from '../data/data.module';
import { TaskTimerEditorModule } from '../editors/task-timer-editor/task-timer-editor.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    DataModule,
    MdIconModule,
    routing,
    SharedModule,
    TaskTimerEditorModule
  ],
  declarations: [
    TaskTimerComponent,
    TimesheetComponent
  ],
  entryComponents: [TaskTimerComponent]
})
export class TimesheetModule { }

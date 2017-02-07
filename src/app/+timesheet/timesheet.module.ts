import { NgModule } from '@angular/core';

import { routing } from './timesheet.routing';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { TimesheetComponent } from './timesheet.component';

@NgModule({
  imports: [
    DataModule,
    routing,
    SharedModule
  ],
  declarations: [
    TaskTimerComponent,
    TimesheetComponent
  ],
  entryComponents: [TaskTimerComponent]
})
export class TimesheetModule { }

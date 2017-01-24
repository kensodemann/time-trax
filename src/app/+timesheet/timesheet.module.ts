import { NgModule } from '@angular/core';

import { routing } from './timesheet.routing';
import { SharedModule } from '../shared/shared.module';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { TimesheetComponent } from './timesheet.component';

@NgModule({
  imports: [
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

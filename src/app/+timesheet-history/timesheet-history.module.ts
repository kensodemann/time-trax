import { NgModule } from '@angular/core';

import { routing } from './timesheet-history.routing';
import { SharedModule } from '../shared/shared.module';
import { TimesheetHistoryComponent } from './timesheet-history.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [TimesheetHistoryComponent],
})
export class TimesheetHistoryModule { }

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { routing } from './timesheet-history.routing';
import { TimesheetHistoryComponent }   from './timesheet-history.component';

@NgModule({
  imports: [SharedModule, routing],
  declarations: [TimesheetHistoryComponent],
})
export class TimesheetHistoryModule { }
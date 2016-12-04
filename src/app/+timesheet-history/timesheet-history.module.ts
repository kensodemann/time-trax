import { NgModule } from '@angular/core';

import { routing } from './timesheet-history.routing';
import { TimesheetHistoryComponent }   from './timesheet-history.component';

@NgModule({
  imports: [routing],
  declarations: [TimesheetHistoryComponent],
})
export class TimesheetHistoryModule { }
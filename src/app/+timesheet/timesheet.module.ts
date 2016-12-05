import { NgModule } from '@angular/core';

import { routing } from './timesheet.routing';
import { TimesheetComponent }   from './timesheet.component';

@NgModule({
  imports: [routing],
  declarations: [TimesheetComponent],
})
export class TimesheetModule { }
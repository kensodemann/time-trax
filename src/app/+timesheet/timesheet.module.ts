import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { routing } from './timesheet.routing';
import { TimesheetComponent }   from './timesheet.component';

@NgModule({
  imports: [SharedModule, routing],
  declarations: [TimesheetComponent],
})
export class TimesheetModule { }
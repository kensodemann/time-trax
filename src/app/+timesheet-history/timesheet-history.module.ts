import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';

import { DataModule } from '../data/data.module';
import { routing } from './timesheet-history.routing';
import { SharedModule } from '../shared/shared.module';
import { TimesheetHistoryComponent } from './timesheet-history.component';

@NgModule({
  imports: [
    DataModule,
    MdListModule,
    routing,
    SharedModule
  ],
  declarations: [TimesheetHistoryComponent],
})
export class TimesheetHistoryModule { }

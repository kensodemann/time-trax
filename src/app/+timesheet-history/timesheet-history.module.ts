import { NgModule } from '@angular/core';
import { MdIconModule, MdListModule } from '@angular/material';

import { DataModule } from '../data/data.module';
import { TimesheetHistoryRoutingModule } from './timesheet-history-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TimesheetHistoryComponent } from './timesheet-history.component';

@NgModule({
  imports: [
    DataModule,
    MdIconModule,
    MdListModule,
    SharedModule,
    TimesheetHistoryRoutingModule
  ],
  declarations: [TimesheetHistoryComponent],
})
export class TimesheetHistoryModule { }

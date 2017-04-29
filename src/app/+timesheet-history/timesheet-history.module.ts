import { NgModule } from '@angular/core';
import { MdIconModule, MdListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DataModule } from '../data/data.module';
import { routing } from './timesheet-history.routing';
import { SharedModule } from '../shared/shared.module';
import { TimesheetHistoryComponent } from './timesheet-history.component';

@NgModule({
  imports: [
    DataModule,
    MdIconModule,
    MdListModule,
    RouterModule,
    routing,
    SharedModule
  ],
  declarations: [TimesheetHistoryComponent],
})
export class TimesheetHistoryModule { }

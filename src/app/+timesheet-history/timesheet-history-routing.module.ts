import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetHistoryComponent } from './timesheet-history.component';

const routes: Routes = [
  { path: '', component: TimesheetHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetHistoryRoutingModule { }

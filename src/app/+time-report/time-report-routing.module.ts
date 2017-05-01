import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeReportComponent } from './time-report.component';

const routes: Routes = [
  { path: '', component: TimeReportComponent },
  { path: ':id', component: TimeReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeReportRoutingModule { }

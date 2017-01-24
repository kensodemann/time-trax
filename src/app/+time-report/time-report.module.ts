import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { routing } from './time-report.routing';
import { TimeReportComponent } from './time-report.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [TimeReportComponent],
})
export class TimeReportModule { }

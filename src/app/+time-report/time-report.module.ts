import { NgModule } from '@angular/core';

import { routing } from './time-report.routing';
import { TimeReportComponent }   from './time-report.component';

@NgModule({
  imports: [routing],
  declarations: [TimeReportComponent],
})
export class TimeReportModule { }
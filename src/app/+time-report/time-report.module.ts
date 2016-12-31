import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { routing } from './time-report.routing';
import { TimeReportComponent } from './time-report.component';

@NgModule({
  imports: [
    MaterialModule,
    routing,
    SharedModule
  ],
  declarations: [TimeReportComponent],
})
export class TimeReportModule { }

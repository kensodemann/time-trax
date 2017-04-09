import { NgModule } from '@angular/core';
import { MdButtonModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { routing } from './time-report.routing';
import { TimeReportComponent } from './time-report.component';

@NgModule({
  imports: [
    MdButtonModule,
    routing,
    SharedModule
  ],
  declarations: [TimeReportComponent],
})
export class TimeReportModule { }

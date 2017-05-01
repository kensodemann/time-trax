import { NgModule } from '@angular/core';
import { MdCardModule } from '@angular/material';

import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';

import { TimeReportRoutingModule } from './time-report-routing.module';
import { TimeReportComponent } from './time-report.component';
import { TimeListComponent } from './shared/time-list/time-list.component';

@NgModule({
  imports: [
    DataModule,
    MdCardModule,
    SharedModule,
    TimeReportRoutingModule
  ],
  declarations: [
    TimeReportComponent,
    TimeListComponent
  ],
  entryComponents: [
    TimeListComponent
  ]
})
export class TimeReportModule { }

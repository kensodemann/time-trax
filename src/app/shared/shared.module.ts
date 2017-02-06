import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { AuthenticationModule } from './services/authentication/authentication.module';
import { DateModule } from './services/date/date.module';
import { ErrorMessageModule } from './services/error-message/error-message.module';
import { MessageDialogModule } from './services/message-dialog/message-dialog.module';
import { TimeTraxHttpModule } from './services/time-trax-http/time-trax-http.module';

import { TimesheetReportService } from './services/timesheet-report/timesheet-report.service';

import { HoursMinutesPipe } from './pipes/hours-minutes.pipe';
import { ProjectTitlePipe } from './pipes/project-title.pipe';
import { ValidTimeDirective } from './validators/valid-time.directive';
import { MillisecondsPipe } from './pipes/milliseconds.pipe';

@NgModule({
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,

    AuthenticationModule,
    DateModule,
    ErrorMessageModule,
    MessageDialogModule,
    TimeTraxHttpModule,

    HoursMinutesPipe,
    ProjectTitlePipe
  ],
  declarations: [
    HoursMinutesPipe,
    ProjectTitlePipe,
    ValidTimeDirective,
    MillisecondsPipe
  ],
  providers: [
    TimesheetReportService,
    HoursMinutesPipe
  ]
})
export class SharedModule { }

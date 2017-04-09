import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AskDialogModule } from './services/ask-dialog/ask-dialog.module';
import { AuthenticationModule } from './services/authentication/authentication.module';
import { DateModule } from './services/date/date.module';
import { ErrorMessageModule } from './services/error-message/error-message.module';
import { ErrorDialogModule } from './services/error-dialog/error-dialog.module';
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

    AskDialogModule,
    AuthenticationModule,
    DateModule,
    ErrorMessageModule,
    ErrorDialogModule,
    TimeTraxHttpModule,

    HoursMinutesPipe,
    MillisecondsPipe,
    ProjectTitlePipe
  ],
  declarations: [
    HoursMinutesPipe,
    MillisecondsPipe,
    ProjectTitlePipe,
    ValidTimeDirective
  ],
  providers: [
    TimesheetReportService,
    HoursMinutesPipe,
    MillisecondsPipe
  ]
})
export class SharedModule { }

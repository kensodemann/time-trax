import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ProjectService } from './project/project.service';
import { StageService } from './stage/stage.service';
import { TimesheetService } from './timesheet/timesheet.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    ProjectService,
    StageService,
    TimesheetService
  ]
})
export class DataServiceModule { }

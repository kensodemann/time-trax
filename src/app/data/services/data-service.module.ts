import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ProjectService } from './project/project.service';
import { StageService } from './stage/stage.service';
import { TimesheetService } from './timesheet/timesheet.service';
import { TaskTimerService } from './taskTimer/taskTimer.service';
import { VersionService } from './version/version.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    ProjectService,
    StageService,
    TaskTimerService,
    TimesheetService,
    VersionService
  ]
})
export class DataServiceModule { }

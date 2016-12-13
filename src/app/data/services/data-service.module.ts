import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ProjectService } from './project/project.service';
import { StageService } from './stage/stage.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    ProjectService,
    StageService
  ]
})
export class DataServiceModule { }

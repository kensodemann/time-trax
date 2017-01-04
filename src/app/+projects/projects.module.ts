import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { routing } from './projects.routing';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    DataModule,
    FormsModule,
    MaterialModule,
    routing,
    SharedModule
  ],
  declarations: [ProjectsComponent],
})
export class ProjectsModule { }

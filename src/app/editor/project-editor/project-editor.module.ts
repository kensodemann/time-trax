import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import { DataModule } from '../../data/data.module';

import { ProjectEditorComponent } from './project-editor.component';
import { ProjectEditorService } from './project-editor.service';

@NgModule({
  imports: [
    CommonModule,
    DataModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [ProjectEditorComponent],
  providers: [ProjectEditorService],
  entryComponents: [ProjectEditorComponent]
})
export class ProjectEditorModule { }

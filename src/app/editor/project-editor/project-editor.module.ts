import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataModule } from '../../data/data.module';
import { ProjectEditorComponent } from './project-editor.component';
import { ProjectEditorService } from './project-editor.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,

    DataModule,
    SharedModule
  ],
  declarations: [ProjectEditorComponent],
  providers: [ProjectEditorService],
  entryComponents: [ProjectEditorComponent]
})
export class ProjectEditorModule { }

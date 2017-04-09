import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule } from '@angular/material';

import { DataModule } from '../../data/data.module';
import { ProjectEditorComponent } from './project-editor.component';
import { ProjectEditorService } from './project-editor.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdInputModule,

    DataModule,
    SharedModule
  ],
  declarations: [ProjectEditorComponent],
  providers: [ProjectEditorService],
  entryComponents: [ProjectEditorComponent]
})
export class ProjectEditorModule { }

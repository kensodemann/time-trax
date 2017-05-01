import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule } from '@angular/material';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DataModule } from '../data/data.module';
import { ProjectEditorModule} from '../editors/project-editor/project-editor.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    DataModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
    ProjectEditorModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [ProjectsComponent],
})
export class ProjectsModule { }

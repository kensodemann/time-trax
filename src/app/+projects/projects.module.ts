import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { routing } from './projects.routing';
import { ProjectsComponent }   from './projects.component';

@NgModule({
  imports: [SharedModule, routing],
  declarations: [ProjectsComponent],
})
export class ProjectsModule { }

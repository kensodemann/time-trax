import { NgModule } from '@angular/core';

import { routing } from './projects.routing';
import { ProjectsComponent }   from './projects.component';

@NgModule({
  imports: [routing],
  declarations: [ProjectsComponent],
})
export class ProjectsModule { }

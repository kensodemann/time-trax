import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent }   from './about.component';
import { routing } from './about.routing';

@NgModule({
  imports: [SharedModule, routing],
  exports: [],
  declarations: [AboutComponent],
})
export class AboutModule { }
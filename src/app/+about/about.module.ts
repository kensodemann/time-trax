import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { DataModule } from '../data/data.module';
import { routing } from './about.routing';

@NgModule({
  imports: [DataModule, routing],
  exports: [],
  declarations: [AboutComponent]
})
export class AboutModule { }

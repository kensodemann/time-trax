import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { routing } from './about.routing';

@NgModule({
  imports: [
    DataModule,
    routing,
    SharedModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }

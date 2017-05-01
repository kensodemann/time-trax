import { NgModule } from '@angular/core';
import { MdIconModule } from '@angular/material';

import { AboutComponent } from './about.component';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    AboutRoutingModule,
    DataModule,
    MdIconModule,
    SharedModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }

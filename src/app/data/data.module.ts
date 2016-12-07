import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataServiceModule } from './services/data-service.module';

@NgModule({
  imports: [
    DataServiceModule
  ]
})
export class DataModule { }

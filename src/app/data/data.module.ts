import { NgModule } from '@angular/core';

import { DataServiceModule } from './services/data-service.module';

@NgModule({
  exports: [
    DataServiceModule
  ]
})
export class DataModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { UserAdministrationComponent } from './user-administration.component';
import { UserAdministrationtRoutingModule } from './user-administration-routing.module';

@NgModule({
  declarations: [UserAdministrationComponent],
  imports: [
    CommonModule,
    DataModule,
    SharedModule,
    UserAdministrationtRoutingModule
  ]
})
export class UserAdministrationModule { }

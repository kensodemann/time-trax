import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordModule } from './+change-password/change-password.module';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { UserAdministrationtRoutingModule } from './user-administration-routing.module';

@NgModule({
  imports: [
    ChangePasswordModule,
    CommonModule,
    DataModule,
    SharedModule,
    UserAdministrationtRoutingModule
  ]
})
export class UserAdministrationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UserListRoutingModule } from './user-list-routing.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    UserListRoutingModule,

    CommonModule,
    DataModule,
    RouterModule,
    SharedModule
  ],
  declarations: [UserListComponent]
})
export class UserListModule { }

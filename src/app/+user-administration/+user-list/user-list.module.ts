import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule } from '@angular/material';
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
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
    RouterModule,
    SharedModule
  ],
  declarations: [UserListComponent]
})
export class UserListModule { }

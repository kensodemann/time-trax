import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { MyProfileComponent } from './my-profile.component';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    MyProfileRoutingModule,

    CommonModule,
    DataModule,
    FormsModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
    RouterModule,
    SharedModule
  ],
  declarations: [MyProfileComponent]
})
export class MyProfileModule { }

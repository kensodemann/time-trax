import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    ChangePasswordRoutingModule,
    CommonModule,
    DataModule,
    FormsModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
    RouterModule,
    SharedModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }

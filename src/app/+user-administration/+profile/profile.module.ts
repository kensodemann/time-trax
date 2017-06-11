import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    ProfileRoutingModule,

    CommonModule,
    DataModule,
    FormsModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
    RouterModule,
    SharedModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule, MdSnackBar } from '@angular/material';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    AuthenticationRoutingModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule,
    SharedModule
  ],
  providers: [MdSnackBar]
})
export class AuthenticationModule { }

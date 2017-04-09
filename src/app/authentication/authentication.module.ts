import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule, MdSnackBar } from '@angular/material';

import { LoginComponent } from './+login/login.component';
import { LogoutComponent } from './+logout/logout.component';
import { routing } from './authentication.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule,
    routing,
    SharedModule
  ],
  providers: [MdSnackBar]
})
export class AuthenticationModule { }

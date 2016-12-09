import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdSnackBar } from '@angular/material';

import { LoginComponent } from './+login/login.component';
import { LogoutComponent } from './+logout/logout.component';
import { SharedModule } from './shared/shared.module';
import { routing } from './authentication.routing';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    FormsModule,
    MaterialModule,
    routing,
    SharedModule
  ],
  providers: [MdSnackBar]
})
export class AuthenticationModule { }
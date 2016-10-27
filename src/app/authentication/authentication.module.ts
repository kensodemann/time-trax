import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from './shared/authentication.service';
import { AuthenticationTokenService } from './shared/authentication-token.service';
import { LoginComponent } from './+login/login.component';
import { LogoutComponent } from './+logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { routing } from './authentication.routing';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    SharedModule,
    routing
  ],
  providers: [AuthenticationService, AuthenticationTokenService]
})
export class AuthenticationModule { }
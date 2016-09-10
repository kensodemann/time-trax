import { NgModule } from '@angular/core';

import { AuthenticationService } from './shared/authentication.service';
import { AuthenticationTokenService } from './shared/authentication-token.service';
import { LoginComponent } from './+login/login.component';
import { LogoutComponent } from './+logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { routing } from './authentication.routing';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [SharedModule, routing],
  providers: [AuthenticationService, AuthenticationTokenService]
})
export class AuthenticationModule { }
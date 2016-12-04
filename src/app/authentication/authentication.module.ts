import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './+login/login.component';
import { LogoutComponent } from './+logout/logout.component';
import { SharedModule } from './shared/shared.module';
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
    routing,
    SharedModule
  ]
})
export class AuthenticationModule { }
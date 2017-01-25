import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [HttpModule],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }

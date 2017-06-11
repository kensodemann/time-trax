import { NgModule } from '@angular/core';
import { AuthenticatedGuardService } from './authenticated-guard.service';

@NgModule({
  providers: [AuthenticatedGuardService]
})
export class AuthenticatedGuardModule { }

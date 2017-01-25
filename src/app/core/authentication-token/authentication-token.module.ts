import { NgModule } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AuthenticationTokenService } from './authentication-token.service';

@NgModule({
  imports: [LocalStorageModule],
  providers: [AuthenticationTokenService]
})
export class AuthenticationTokenModule { }

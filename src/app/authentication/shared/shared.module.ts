import { NgModule } from '@angular/core';

import { SharedModule as CommonSharedModule } from '../../shared/shared.module';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [CommonSharedModule],
  providers: [
    AuthenticationService
  ],
})
export class SharedModule { }

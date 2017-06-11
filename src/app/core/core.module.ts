import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AdministratorGuardModule } from './administrator-guard/administrator-guard.module';
import { AuthenticatedGuardModule } from './authenticated-guard/authenticated-guard.module';
import { AuthenticationTokenModule } from './authentication-token/authentication-token.module';
import { IdentityModule } from './identity/identity.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  exports: [
    AdministratorGuardModule,
    AuthenticatedGuardModule,
    AuthenticationTokenModule,
    IdentityModule
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

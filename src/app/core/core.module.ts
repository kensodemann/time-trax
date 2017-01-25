import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthenticationTokenModule } from './authentication-token/authentication-token.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  exports: [
    AuthenticationTokenModule
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

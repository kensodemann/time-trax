import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';

import { MdButtonModule } from '@angular2-material/button';
import { MdCoreModule } from '@angular2-material/core';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

let localStorageServiceConfig = {
  prefix: 'time-trax'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    MdButtonModule,
    MdCoreModule,
    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,

    SharedModule,
    routing
  ],
  bootstrap: [AppComponent],
  providers: [
    MdIconRegistry,
    LocalStorageService,
    {
      provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
    }
  ]
})
export class AppModule { }
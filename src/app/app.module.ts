import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SharedModule } from './shared/shared.module';

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
import 'hammerjs';

let localStorageServiceConfig = {
  prefix: 'time-trax'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule.forRoot(),
    SharedModule,
    routing
  ],
  bootstrap: [AppComponent],
  providers: [
    LocalStorageService,
    { provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig }
  ]
})
export class AppModule { }

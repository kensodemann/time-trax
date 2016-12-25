import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SharedModule } from './shared/shared.module';

import { LocalStorageModule } from 'angular-2-local-storage';
import 'hammerjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'time-trax'
    }),
    MaterialModule.forRoot(),
    SharedModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

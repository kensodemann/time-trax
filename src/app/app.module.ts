import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdIconModule, MdListModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { routing } from './app.routing';
import { SharedModule } from './shared/shared.module';

import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LocalStorageModule.withConfig({
      prefix: 'time-trax'
    }),
    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,

    CoreModule,
    SharedModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

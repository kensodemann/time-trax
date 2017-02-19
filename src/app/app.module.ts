import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { routing } from './app.routing';
import { SharedModule } from './shared/shared.module';

import { LocalStorageModule } from 'angular-2-local-storage';
import 'hammerjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    LocalStorageModule.withConfig({
      prefix: 'time-trax'
    }),
    MaterialModule,

    CoreModule,
    SharedModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';

import { ConfigureStorage, LOCAL_STORAGE_PROVIDER } from "h5webstorage";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    routing
  ],
  bootstrap: [AppComponent],
  providers: [ConfigureStorage({ prefix: "time-trax-" }), LOCAL_STORAGE_PROVIDER]
})
export class AppModule { }
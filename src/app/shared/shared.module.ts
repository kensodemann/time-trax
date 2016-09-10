import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdListModule } from '@angular2-material/list';
import { MdRippleModule } from '@angular2-material/core';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

@NgModule({
  exports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdRippleModule,
    MdSidenavModule,
    MdToolbarModule
  ],
})
export class SharedModule { }

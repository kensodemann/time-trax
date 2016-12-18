import { NgModule } from '@angular/core';

import { AboutComponent }   from './about.component';
import { routing } from './about.routing';

@NgModule({
  imports: [routing],
  exports: [],
  declarations: [AboutComponent],
})
export class AboutModule { }

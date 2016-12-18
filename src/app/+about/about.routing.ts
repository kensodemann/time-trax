import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

const ROUTES: Routes = [
  { path: '', component: AboutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(ROUTES);

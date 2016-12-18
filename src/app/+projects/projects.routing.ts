import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';

const ROUTES: Routes = [
  { path: '', component: ProjectsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(ROUTES);

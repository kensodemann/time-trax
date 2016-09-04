import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './+login';
import { LogoutComponent } from './+logout';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(ROUTES);
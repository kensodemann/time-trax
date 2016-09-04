import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetComponent } from './timesheet.component';

const ROUTES: Routes = [
  { path: '', component: TimesheetComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(ROUTES);
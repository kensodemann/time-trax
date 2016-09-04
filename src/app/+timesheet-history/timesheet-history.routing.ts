import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetHistoryComponent } from './timesheet-history.component';

const ROUTES: Routes = [
  { path: '', component: TimesheetHistoryComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(ROUTES);
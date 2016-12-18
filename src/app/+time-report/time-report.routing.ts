import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeReportComponent } from './time-report.component';

const ROUTES: Routes = [
  { path: '', component: TimeReportComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(ROUTES);

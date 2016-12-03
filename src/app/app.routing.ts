import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TimesheetComponent } from './+timesheet';
import { TimesheetHistoryComponent } from './+timesheet-history';
import { TimeReportComponent } from './+time-report';
import { AboutComponent } from './+about';

const ROUTES: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'timesheet-history', loadChildren: 'app/+timesheet-history/timesheet-history.module#TimesheetHistoryModule' },
  { path: 'about', loadChildren: 'app/+about/about.module#AboutModule' },
  { path: 'authentication', loadChildren: 'app/authentication/authentication.module#AuthenticationModule' },
  { path: 'projects', loadChildren: 'app/+projects/projects.module#ProjectsModule' },
  { path: 'time-report/:id', loadChildren: 'app/+time-report/time-report.module#TimeReportModule' },
  { path: 'timesheet/:id', loadChildren: 'app/+timesheet/timesheet.module#TimesheetModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
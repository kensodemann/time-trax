import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const ROUTES: Routes = [
  { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
  { path: 'timesheet-history', loadChildren: 'app/+timesheet-history/timesheet-history.module#TimesheetHistoryModule' },
  { path: 'about', loadChildren: 'app/+about/about.module#AboutModule' },
  { path: 'authentication', loadChildren: 'app/authentication/authentication.module#AuthenticationModule' },
  { path: 'projects', loadChildren: 'app/+projects/projects.module#ProjectsModule' },
  { path: 'time-report', loadChildren: 'app/+time-report/time-report.module#TimeReportModule' },
  { path: 'timesheet', loadChildren: 'app/+timesheet/timesheet.module#TimesheetModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);

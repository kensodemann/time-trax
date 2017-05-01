import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/timesheet', pathMatch: 'full' },
  { path: 'timesheet-history', loadChildren: 'app/+timesheet-history/timesheet-history.module#TimesheetHistoryModule' },
  { path: 'about', loadChildren: 'app/+about/about.module#AboutModule' },
  { path: 'authentication', loadChildren: 'app/+authentication/authentication.module#AuthenticationModule' },
  { path: 'projects', loadChildren: 'app/+projects/projects.module#ProjectsModule' },
  { path: 'time-report', loadChildren: 'app/+time-report/time-report.module#TimeReportModule' },
  { path: 'timesheet', loadChildren: 'app/+timesheet/timesheet.module#TimesheetModule' },
  { path: 'user-administration', loadChildren: 'app/+user-administration/user-administration.module#UserAdministrationModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

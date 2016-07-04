import { provideRouter, RouterConfig }  from '@angular/router';

import { ProjectsComponent } from './+projects';
import { TimesheetComponent } from './+timesheet';
import { TimesheetHistoryComponent } from './+timesheet-history';
import { TimeReportComponent } from './+time-report';
import { AboutComponent } from './+about';
import { LoginComponent } from './authentication/+login';
import { LogoutComponent } from './authentication/+logout';

export const ROUTES: RouterConfig = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'timesheet/:id', component: TimesheetComponent },
  { path: 'timesheet-history', component: TimesheetHistoryComponent },
  { path: 'time-report/:id', component: TimeReportComponent },
  { path: 'about', component: AboutComponent },
  { path: 'authentication/login', component: LoginComponent },
  { path: 'authentication/logout', component: LogoutComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(ROUTES)
];
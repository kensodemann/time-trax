import { Component, OnInit } from '@angular/core';
import { environment } from './environment';
import { MdButton } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdToolbar } from '@angular2-material/toolbar';
import { ProjectsComponent } from './+projects';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { TimesheetComponent } from './+timesheet';
import { TimesheetHistoryComponent } from './+timesheet-history';
import { TimeReportComponent } from './+time-report';
import { AboutComponent } from './+about';
import { LoginComponent } from './authentication/+login';
import { LogoutComponent } from './authentication/+logout';

@Component({
  moduleId: module.id,
  selector: 'time-trax-app',
  templateUrl: 'time-trax.component.html',
  styleUrls: ['time-trax.component.css'],
  directives: [MdButton, MdIcon, MD_LIST_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdToolbar, ROUTER_DIRECTIVES],
  providers: [MdIconRegistry, ROUTER_PROVIDERS]
})
@Routes([
  {path: '/projects', component: ProjectsComponent},
  {path: '/timesheet/:id', component: TimesheetComponent},
  {path: '/timesheet-history', component: TimesheetHistoryComponent},
  {path: '/time-report/:id', component: TimeReportComponent},
  {path: '/about', component: AboutComponent},
  {path: '/authentication/login', component: LoginComponent},
  {path: '/authentication/logout', component: LogoutComponent}
])
export class TimeTraxAppComponent implements OnInit {
  title = 'time-trax works!';
  dataService: string;

  ngOnInit() {
    this.dataService = environment.dataService;
  }
}

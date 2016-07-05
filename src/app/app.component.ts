import { Component, OnInit } from '@angular/core';
import { environment } from './environment';
import { MdButton } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdToolbar } from '@angular2-material/toolbar';
import { ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MdButton, MdIcon, MD_LIST_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdToolbar, ROUTER_DIRECTIVES],
  providers: [MdIconRegistry]
})
export class AppComponent implements OnInit {
  title = 'time-trax works!';
  dataService: string;

  ngOnInit() {
    this.dataService = environment.dataService;
  }
}

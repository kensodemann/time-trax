import { Component, OnInit } from '@angular/core';
import { environment } from './environment';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'time-trax works!';
  dataService: string;

  ngOnInit() {
    this.dataService = environment.dataService;
  }
}

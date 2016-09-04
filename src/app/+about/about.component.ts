import { Component, OnInit } from '@angular/core';
import { LocalStorage, WEB_STORAGE_PROVIDERS } from 'h5webstorage';

@Component({
  moduleId: module.id,
  selector: 'app-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css'],
  providers: [WEB_STORAGE_PROVIDERS]
})
export class AboutComponent implements OnInit {

  constructor(private ls: LocalStorage) {}

  ngOnInit() {
    this.ls['test-item'] = 'This is just a test. What does it look like?';
  }

}

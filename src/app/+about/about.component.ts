import { Component, OnInit } from '@angular/core';
import { Version } from '../data/models/version';
import { VersionService } from '../data/services/version/version.service';

import * as moment from 'moment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  version: Version;
  copyright = '2016 Kenneth W. Sodemann';

  constructor(private versionService: VersionService) { }

  ngOnInit() {
    this.versionService.get().subscribe(v => this.version = v);
  }
}

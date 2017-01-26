import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Version } from '../data/models/version';
import { VersionService } from '../data/services/version/version.service';
import { ErrorMessageService } from '../shared/services/error-message/error-message.service';

import * as moment from 'moment';

@Component({
  selector: 'trx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  version: Version;
  copyright = '2017 Kenneth W. Sodemann';

  constructor(private versionService: VersionService,
    private errorMessage: ErrorMessageService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.versionService.get()
      .catch(res => {
        this.errorMessage.show(res, this.viewContainerRef);
        return Observable.of(res);
      })
      .subscribe(v => this.version = v);
  }
}

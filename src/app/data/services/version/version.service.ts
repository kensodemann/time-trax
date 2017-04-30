import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import { Version } from '../../models/version';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class VersionService {
  private versionName = 'sopping escutchen';
  private versionTag = '1.0.0-Beta.2';

  constructor(private http: Http) { }

  get(): Observable<Version> {
    return this.http.get(`${environment.dataService}/versions`)
      .map(res => res.json())
      .map((res) => {
        return {
          server: res[0].name,
          client: `${this.versionTag} (${this.versionName})`,
          releaseDate: moment('2017-04-28')
        };
      });
  }

}

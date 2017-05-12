import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import { Version } from '../../models/version';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class VersionService {
  private versionName = 'oldest crater';
  private versionTag = '1.1.0';

  constructor(private http: Http) { }

  get(): Observable<any> {
    return this.http.get(`${environment.dataService}/versions`)
      .mergeMap(res => this.http.get('assets/version.json'),
      (server, client) => {
        const s = server.json();
        const c = client.json();
        return {
          server: s[0].name,
          client: `${c.id} (${c.name})`,
          releaseDate: moment(c.date)
        };
      });
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../data-service.interface';
import { DateService } from '../../../shared/services/date/date.service';
import { Timesheet } from '../../models/timesheet';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class TimesheetService implements DataService<Timesheet> {
  private url: string;

  constructor(private http: Http, private dates: DateService) {
    this.url = `${environment.dataService}/timesheets`;
  }

  getAll(): Observable<Array<Timesheet>> {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  get(id: string): Observable<Timesheet> {
    return this.http.get(this.url + `/${id}`)
      .map(res => res.json());
  }

  getCurrent(): Observable<Timesheet> {
    const endDate = this.dates.weekEndDate(new Date());
    return this.http.get(this.url + `?endDate=${endDate}`)
      .map(res => res.json())
      .catch((e) => {
        if (e.status === 404) {
          return Observable.of({
            endDate: endDate
          });
        } else {
          return Observable.throw(e);
        }
      });
  }

  save(timesheet: Timesheet): Observable<Timesheet> {
    const url = this.url + (timesheet._id ? `/${timesheet._id}` : '');

    return this.http.post(url, timesheet)
      .map(res => res.json());
  }
}

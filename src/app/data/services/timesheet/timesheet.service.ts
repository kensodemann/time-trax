import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DateService } from '../../../shared/date.service';
import { Timesheet } from '../../models/timesheet';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class TimesheetService {

  constructor(private http: Http, private dates: DateService) { }

  getAll(): Observable<Array<Timesheet>> {
    return this.http.get(`${environment.dataService}/timesheets`)
      .map(res => res.json());
  }

  get(id: string): Observable<Timesheet> {
    return this.http.get(`${environment.dataService}/timesheets/${id}`)
      .map(res => res.json());
  }

  getCurrent(): Observable<Timesheet> {
    let endDate = this.dates.weekEndDate(new Date());
    return this.http.get(`${environment.dataService}/timesheets?endDate=${endDate}`)
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

  post(timesheet: Timesheet): Observable<Timesheet> {
    let url = `${environment.dataService}/timesheets`;
    if (timesheet._id) {
      url += `/${timesheet._id}`;
    }

    return this.http.post(url, timesheet)
      .map(res => res.json());
  }
}

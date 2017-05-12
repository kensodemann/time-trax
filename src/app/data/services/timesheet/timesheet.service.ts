import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../data-service.interface';
import { DateService } from '../../../shared/services/date/date.service';
import { Timesheet } from '../../models/timesheet';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
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
      .map((res) => {
        const timesheets: Array<Timesheet> = [];
        const data = res.json();
        data.forEach(ts => timesheets.push(new Timesheet(ts)));
        return timesheets;
      });
  }

  get(id: string): Observable<Timesheet> {
    return this.http.get(this.url + `/${id}`)
      .map(res => new Timesheet(res.json()));
  }

  getCurrent(): Observable<Timesheet> {
    const endDate = this.dates.weekEndDate(new Date());
    return this.http.get(this.url + `?endDate=${endDate}`)
      .mergeMap(res => {
        const data = res.json()[0];
        if (data) {
          return Observable.of(new Timesheet(data));
        }

        return this.save({
          _id: undefined,
          endDate: endDate,
          userRid: undefined
        });
      });
  }

  save(timesheet: Timesheet): Observable<Timesheet> {
    const url = this.url + (timesheet._id ? `/${timesheet._id}` : '');

    return this.http.post(url, timesheet)
      .map(res => new Timesheet(res.json()));
  }
}

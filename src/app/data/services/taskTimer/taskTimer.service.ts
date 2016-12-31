import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TaskTimer } from '../../models/taskTimer';
import { environment } from '../../../../environments/environment';

import * as _ from 'lodash';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskTimerService {
  private taskTimers: Observable<Array<TaskTimer>>;
  private timesheetId: string;

  constructor(private http: Http) { }

  getAllForTimesheet(timesheetId: string): Observable<Array<TaskTimer>> {
    if (this.timesheetId !== timesheetId) {
      this.timesheetId = timesheetId;
      this.taskTimers = this.http.get(`${environment.dataService}/timesheets/${timesheetId}/taskTimers`)
        .map(res => res.json());
    }

    return this.taskTimers;
  }

  start(timer: TaskTimer): Observable<TaskTimer> {
    return this.stopRunningTimers()
      .flatMap(x => this.http.post(`${environment.dataService}/timesheets/${timer.timesheetRid}/taskTimers/${timer._id}/start`, timer)
        .map(res => res.json()));
  }

  stop(timer: TaskTimer): Observable<TaskTimer> {
    return this.http.post(`${environment.dataService}/timesheets/${timer.timesheetRid}/taskTimers/${timer._id}/stop`, timer)
      .map(res => res.json());
  }

  stopRunningTimers(): Observable<any> {
    if (!this.taskTimers) {
      return Observable.throw(new Error('No Timers Fetched Yet'));
    }

    return this.taskTimers.flatMap(timers => {
      let timersToStop: Array<Observable<any>> = _.chain(timers)
        .filter('isActive')
        .map(t => this.stop(t))
        .value();

      return timersToStop.length > 0 ? Observable.forkJoin(timersToStop) : Observable.of(null);
    });
  }
}

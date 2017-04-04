import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../data-service.interface';
import { TaskTimer } from '../../models/task-timer';
import { environment } from '../../../../environments/environment';

import * as _ from 'lodash';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskTimerService implements DataService<TaskTimer> {
  private taskTimers: Observable<Array<TaskTimer>>;
  private timesheetId: string;

  constructor(private http: Http) { }

  getAll(params: any): Observable<Array<TaskTimer>> {
    const timesheetId = params && params.timesheetId;

    if (!timesheetId) {
      throw new Error('TaskTimerService.getAll() must be called with a parameter object specifying the timesheetId');
    }

    if (this.timesheetId !== timesheetId) {
      this.timesheetId = timesheetId;
      this.taskTimers = this.http.get(`${environment.dataService}/timesheets/${timesheetId}/taskTimers`)
        .map((res) => {
          const taskTimers: Array<TaskTimer> = [];
          const data = res.json();
          data.forEach(tt => taskTimers.push(new TaskTimer(tt)));
          return taskTimers;
        });
    }

    return this.taskTimers;
  }

  save(taskTimer: TaskTimer): Observable<TaskTimer> {
    const url = `${environment.dataService}/timesheets/${taskTimer.timesheetRid}/taskTimers` + (taskTimer._id ? `/${taskTimer._id}` : '');
    return this.http.post(url, taskTimer)
      .map(res => new TaskTimer(res.json()));
  }

  start(timer: TaskTimer): Observable<TaskTimer> {
    return this.http.post(`${environment.dataService}/timesheets/${timer.timesheetRid}/taskTimers/${timer._id}/start`, timer)
      .map(res => new TaskTimer(res.json()));
  }

  stop(timer: TaskTimer): Observable<TaskTimer> {
    return this.http.post(`${environment.dataService}/timesheets/${timer.timesheetRid}/taskTimers/${timer._id}/stop`, timer)
      .map(res => new TaskTimer(res.json()));
  }
}

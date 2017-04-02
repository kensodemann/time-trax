import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { DailyTimeLog } from './daily-time-log';
import { TaskTimer } from '../../../data/models/task-timer';
import { Timesheet } from '../../../data/models/timesheet';

@Injectable()
export class TimesheetReportService {

  constructor() { }

  dailyTasks(timesheet: Timesheet, tasks: Array<TaskTimer>): Array<DailyTimeLog> {
    const week = this.generateWeek(timesheet.endDate);
    week.forEach((day) => { day.taskTimers = this.tasksForDay(tasks, day.date); });

    return week;
  }

  addTimer(days: Array<DailyTimeLog>, timer: TaskTimer): void {
    const day = this.day(days, timer.workDate);
    if (!day) {
      throw (new Error('timesheet-report service: attempt to add timer not in timesheet date range'));
    }
    day.taskTimers.push(timer);
  }

  private day(days: Array<DailyTimeLog>, dt: any) {
    const ms = moment(dt).valueOf();
    return _.find(days, day => day.date.getTime() === ms);
  }

  private generateWeek(endDate: any): Array<DailyTimeLog> {
    const m = moment(endDate);
    const week: Array<DailyTimeLog> = [];

    for (let i = 6; i >= 0; i--) {
      week.push(new DailyTimeLog(moment(m).subtract(i, 'days').toDate()));
    }

    return week;
  }

  private tasksForDay(tasks: Array<TaskTimer>, dt: Date): Array<TaskTimer> {
    return _.filter(tasks, (task) => {
      return moment(task.workDate).valueOf() === dt.getTime();
    });
  }
}

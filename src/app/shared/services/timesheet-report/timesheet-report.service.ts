import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { DailyTimeLog } from './daily-time-log';
import { TaskSummary } from './task-summary';
import { TaskTimer } from '../../../data/models/task-timer';
import { Timesheet } from '../../../data/models/timesheet';

@Injectable()
export class TimesheetReportService {

  constructor() { }

  addTimer(days: Array<DailyTimeLog>, timer: TaskTimer): void {
    const day = this.day(days, timer.workDate);
    if (!day) {
      throw (new Error('timesheet-report service: attempt to add timer not in timesheet date range'));
    }
    day.taskTimers.push(timer);
  }

  dailyTasks(timesheet: Timesheet, tasks: Array<TaskTimer>): Array<DailyTimeLog> {
    const week = this.generateWeek(timesheet.endDate);
    week.forEach((day) => {
      day.taskTimers = this.tasksForDay(tasks, day.date);
      day.jiraTasks = this.summarizedJiraTasks(day.taskTimers);
      day.sbvbTasks = this.summarizedSbvbTasks(day.taskTimers);
      day.milliseconds = this.totalTime(day.taskTimers);
    });

    return week;
  }

  private totalTime(tasks: Array<TaskTimer>): number {
    let ms = 0;
    tasks.forEach(task => ms += task.milliseconds);
    return ms;
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

  private summarizedJiraTasks(tasks: Array<TaskTimer>): Array<TaskSummary> {
    return _.chain(tasks)
      .filter(t => t.project.jiraTaskId)
      .uniqBy(t => t.project.jiraTaskId)
      .map((t) => {
        return {
          name: t.project.jiraTaskId,
          stage: undefined,
          milliseconds: this.millisecondsForJiraTask(tasks, t.project.jiraTaskId)
        };
      })
      .value();
  }

  private millisecondsForJiraTask(tasks: Array<TaskTimer>, jiraTaskId: string): number {
    return _.chain(tasks)
      .filter(x => x.project.jiraTaskId === jiraTaskId)
      .reduce((sum, t) => sum + t.milliseconds, 0)
      .value();
  }

  private summarizedSbvbTasks(tasks: Array<TaskTimer>): Array<TaskSummary> {
    return _.chain(tasks)
      .uniqBy(t => `task: ${t.project.sbvbTaskId} stage: ${t.stage.stageNumber}`)
      .map((t) => {
        return {
          name: t.project.sbvbTaskId,
          stage: t.stage,
          milliseconds: this.millisecondsForSbvbTask(tasks, t.project.sbvbTaskId, t.stage.stageNumber)
        };
      })
      .value();
  }

  private millisecondsForSbvbTask(tasks: Array<TaskTimer>, sbvbTaskId: string, stageNumber: number): number {
    return _.chain(tasks)
      .filter(x => x.project.sbvbTaskId === sbvbTaskId && x.stage.stageNumber === stageNumber)
      .reduce((sum, t) => sum + t.milliseconds, 0)
      .value();
  }

  private tasksForDay(tasks: Array<TaskTimer>, dt: Date): Array<TaskTimer> {
    return _.filter(tasks, (task) => {
      return moment(task.workDate).valueOf() === dt.getTime();
    });
  }
}

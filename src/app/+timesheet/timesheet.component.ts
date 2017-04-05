import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TaskTimer } from '../data/models/task-timer';
import { Timesheet } from '../data/models/timesheet';
import { TaskTimerService } from '../data/services/task-timer/task-timer.service';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';
import { TaskTimerEditorService } from '../editors/task-timer-editor/task-timer-editor.service';
import { DateService } from '../shared/services/date/date.service';
import { DailyTimeLog } from '../shared/services/timesheet-report/daily-time-log';
import { TimesheetReportService } from '../shared/services/timesheet-report/timesheet-report.service';

@Component({
  selector: 'trx-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit, OnDestroy {
  days: Array<DailyTimeLog>;

  private timesheet: Timesheet;
  private refreshInterval: Subscription;

  constructor(
    private dateService: DateService,
    private editor: TaskTimerEditorService,
    private report: TimesheetReportService,
    private taskTimerData: TaskTimerService,
    private timesheetData: TimesheetService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.timesheetData.getCurrent().subscribe(ts => {
      this.timesheet = ts;
      this.refresh();
    });

    this.refreshInterval = Observable.interval(15000).subscribe(res => this.refresh());
  }

  ngOnDestroy() {
    if (this.refreshInterval && !this.refreshInterval.closed) {
      this.refreshInterval.unsubscribe();
    }
  }

  addTaskTimer(d: Date) {
    this.editor.open(new TaskTimer({
      timesheetRid: this.timesheet._id,
      workDate: d
    }), this.viewContainerRef).subscribe((res) => {
      if (res) {
        this.report.addTimer(this.days, res);
      }
    });
  }

  editTaskTimer(timer: TaskTimer): void {
    this.editor.open(timer, this.viewContainerRef).subscribe((res) => {
      if (res) {
        timer.project = res.project;
        timer.stage = res.stage;
        timer.milliseconds = res.milliseconds;
      }
    });
  }

  deleteTaskTimer(timer: TaskTimer): void { console.log('this will delete'); }

  toggleTaskTimer(timer: TaskTimer): void {
    if (timer.isActive) {
      this.stopTimer(timer);
    } else {
      this.stopRunningTimers();
      this.startTimer(timer);
    }
  }

  private refresh() {
    this.taskTimerData.getAll({ timesheetId: this.timesheet._id }).subscribe(tt => {
      this.days = this.report.dailyTasks(this.timesheet, tt);
    });
  }

  private startTimer(timer: TaskTimer): void {
    this.taskTimerData.start(timer).subscribe(res => this.updateRunParameters(timer, res));
  }

  private stopRunningTimers(): void {
    if (this.days) {
      this.days.forEach(day => {
        day.taskTimers.forEach(timer => {
          if (timer.isActive) {
            this.stopTimer(timer);
          }
        });
      });
    }
  }

  private stopTimer(timer: TaskTimer): void {
    this.taskTimerData.stop(timer).subscribe(res => this.updateRunParameters(timer, res));
  }

  private updateRunParameters(timer: TaskTimer, httpResult: any): void {
    if (httpResult) {
      timer.isActive = httpResult.isActive;
      timer.milliseconds = httpResult.milliseconds;
      timer.startTime = httpResult.startTime;
      timer._currentTime = httpResult._currentTime;
    }
  }
}

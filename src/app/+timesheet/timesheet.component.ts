import { Component, OnInit, ViewContainerRef } from '@angular/core';

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
export class TimesheetComponent implements OnInit {
  days: Array<DailyTimeLog>;

  private timesheet: Timesheet;

  constructor(
    private dateService: DateService,
    private editor: TaskTimerEditorService,
    private report: TimesheetReportService,
    private taskTimerData: TaskTimerService,
    private timesheetData: TimesheetService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.timesheetData.getCurrent().subscribe(ts => {
      if (ts) {
        this.timesheet = ts;
        this.taskTimerData.getAll({ timesheetId: ts._id }).subscribe(tt => {
          this.days = this.report.dailyTasks(ts, tt);
        });
      } else {
        this.timesheetData.save({
          _id: undefined,
          endDate: this.dateService.weekEndDate(new Date()),
          userRid: undefined
        }).subscribe(newTs => {
          this.timesheet = newTs;
          this.days = this.report.dailyTasks(newTs, []);
        });
      }
    });
  }

  addTaskTimer(d: Date) {
    this.editor.open(new TaskTimer(this.timesheet._id, d), this.viewContainerRef);
  }
}

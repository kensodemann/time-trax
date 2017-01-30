import { Component, OnInit } from '@angular/core';

import { Timesheet } from '../data/models/timesheet';
import { TaskTimerService } from '../data/services/task-timer/task-timer.service';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';
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

  constructor(
    private dateService: DateService,
    private taskTimerData: TaskTimerService,
    private timesheetData: TimesheetService,
    private report: TimesheetReportService) { }

  ngOnInit() {
    this.timesheetData.getCurrent().subscribe(ts => {
      if (ts) {
        this.taskTimerData.getAll({ timesheetId: ts._id }).subscribe(tt => {
          this.days = this.report.dailyTasks(ts, tt);
        });
      } else {
        this.timesheetData.save({
          _id: undefined,
          endDate: this.dateService.weekEndDate(new Date()),
          userRid: undefined
        }).subscribe(newTs => this.days = this.report.dailyTasks(newTs, []));
      }
    });
  }

  addTaskTimer(d: Date) {
    console.log(`This will add a task timer for ${d}`);
  }
}

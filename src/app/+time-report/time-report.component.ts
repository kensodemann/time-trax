import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TaskTimerService } from '../data/services/task-timer/task-timer.service';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';
import { DailyTimeLog } from '../shared/services/timesheet-report/daily-time-log';
import { TimesheetReportService } from '../shared/services/timesheet-report/timesheet-report.service';

@Component({
  selector: 'trx-time-report',
  templateUrl: './time-report.component.html',
  styleUrls: ['./time-report.component.scss']
})
export class TimeReportComponent implements OnInit {
  days: Array<DailyTimeLog>;

  constructor(private route: ActivatedRoute, private timesheet: TimesheetService, private taskTimers: TaskTimerService, private report: TimesheetReportService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => params.id ? this.timesheet.get(params.id) : this.timesheet.getCurrent())
      .subscribe(ts => this.taskTimers.getAll({ timesheetId: ts._id })
        .subscribe(tt => this.days = this.report.dailyTasks(ts, tt)));
  }
}

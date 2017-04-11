import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { Timesheet } from '../data/models/timesheet';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';

@Component({
  selector: 'trx-timesheet-history',
  templateUrl: './timesheet-history.component.html',
  styleUrls: ['./timesheet-history.component.scss']
})
export class TimesheetHistoryComponent implements OnInit {
  timesheets: Array<Timesheet>;

  constructor(private timesheetData: TimesheetService) { }

  ngOnInit() {
    this.timesheetData.getAll().subscribe((res) => {
      this.timesheets = _.orderBy(res, 'endDate', 'desc');
    });
  }
}

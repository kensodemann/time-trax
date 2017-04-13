import { Component, OnInit, Input } from '@angular/core';

import { TaskSummary } from '../../../shared/services/timesheet-report/task-summary';

@Component({
  selector: 'trx-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.scss']
})
export class TimeListComponent implements OnInit {
  @Input() tasks: Array<TaskSummary>;

  constructor() { }

  ngOnInit() {
  }

}

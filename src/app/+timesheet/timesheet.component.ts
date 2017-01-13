import { Component, OnInit } from '@angular/core';

import { TaskTimer } from '../data/models/task-timer';

// This should be in its own file, just here for now for experimental reasons
class TimeLogDay {
  date: Date; // could also be a string in yyyy-mm-dd format, not sure yet
  timeLogs: Array<TaskTimer>;
}

@Component({
  selector: 'trx-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  days: Array<TimeLogDay>;

  constructor() { }

  ngOnInit() {
    // To support what we need, we will need to get the correct timesheet based on the route
    // we will then need to get the correct task timers
    // and we will need to generate a list of days for the timesheet
    //
    // It appears that the route definition will need to change to support having a timesheet Id

    // This is just mocked up test data, but we would get the real data from a service call here...
    this.days = [{
      date: new Date(2017, 0, 15),
      timeLogs: [{
        _id: '563e975eaaea5ad535776923',
        timesheetRid: '563e972eaaea5ad535776921',
        workDate: '2017-01-15',
        stage: {
          _id: '563e8367a1c166aa308e51da',
          stageNumber: 12,
          name: 'Anticipated Change Orders'
        },
        project: {
          _id: '563e974eaaea5ad535776922',
          name: 'Eat Cake',
          jiraTaskId: 'AA- 101',
          sbvbTaskId: 'RFP140159',
          status: 'active'
        },
        milliseconds: 5400000
      }, {
        _id: '563e975eaaea5ad535776924',
        timesheetRid: '563e972eaaea5ad535776921',
        workDate: '2017-01-15',
        stage: {
          _id: '563e8367a1c166aa308e51da',
          stageNumber: 12,
          name: 'Anticipated Change Orders'
        },
        project: {
          _id: '563e974eaaea5ad535776922',
          name: 'Eat Cake',
          jiraTaskId: 'AA- 101',
          sbvbTaskId: 'RFP140159',
          status: 'active'
        },
        milliseconds: 5400000,
        isActive: true
      }]
    }, {
      date: new Date(2017, 0, 16),
      timeLogs: []
    }, {
      date: new Date(2017, 0, 17),
      timeLogs: []
    }, {
      date: new Date(2017, 0, 18),
      timeLogs: []
    }, {
      date: new Date(2017, 0, 19),
      timeLogs: []
    }, {
      date: new Date(2017, 0, 20),
      timeLogs: []
    }, {
      date: new Date(2017, 0, 21),
      timeLogs: []
    }];
  }

  addTaskTimer(d: Date) {
    console.log(`This will add a task timer for ${d}`);
  }

}

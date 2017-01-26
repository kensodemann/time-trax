/* tslint:disable:no-unused-variable */

import { TaskTimer } from '../../../data/models/task-timer';
import { Timesheet } from '../../../data/models/timesheet';
import { TimesheetReportService } from './timesheet-report.service';

describe('TimesheetReportService', () => {
  let service: TimesheetReportService;
  beforeEach(() => {
    service = new TimesheetReportService();
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('dailyTasks', () => {
    it('contains an entry for each day in the timesheet', () => {
      const ts = new Timesheet();
      ts.endDate = '2017-01-28';
      const d = service.dailyTasks(ts, []);
      expect(d.length).toEqual(7);
      for (let i = 0; i < 7; i++) {
        expect(d[i].date).toEqual(new Date(2017, 0, 22 + i));
      }
    });

    it('divides the task timers by day', () => {
      const ts = new Timesheet();
      ts.endDate = '2017-01-28';

      const d = service.dailyTasks(ts, [newTaskTimer('2017-01-24'), newTaskTimer('2017-01-26'), newTaskTimer('2017-01-27'),
      newTaskTimer('2017-01-23'), newTaskTimer('2017-01-26'), newTaskTimer('2017-01-25'), newTaskTimer('2017-01-25'),
      newTaskTimer('2017-01-25'), newTaskTimer('2017-01-23'), newTaskTimer('2017-01-27'), newTaskTimer('2017-01-24'),
      newTaskTimer('2017-01-25'), newTaskTimer('2017-01-26'), newTaskTimer('2017-01-23'), newTaskTimer('2017-01-24'),
      newTaskTimer('2017-01-24'), newTaskTimer('2017-01-24')]);

      expect(d[0].taskTimers.length).toEqual(0, 'Sunday');
      expect(d[1].taskTimers.length).toEqual(3, 'Monday');
      expect(d[2].taskTimers.length).toEqual(5, 'Tuesday');
      expect(d[3].taskTimers.length).toEqual(4, 'Wednesday');
      expect(d[4].taskTimers.length).toEqual(3, 'Thursday');
      expect(d[5].taskTimers.length).toEqual(2, 'Friday');
      expect(d[6].taskTimers.length).toEqual(0, 'Saturday');
    });
  });

  function newTaskTimer(dt: string): TaskTimer {
    const tt = {
      _id: '427331459',
      timesheetRid: '11389578',
      workDate: dt,
      stage: null,
      project: null
    };

    return tt;
  }
});

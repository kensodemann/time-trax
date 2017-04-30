/* tslint:disable:no-unused-variable */

import { Project } from '../../../data/models/project';
import { Stage } from '../../../data/models/stage';
import { TaskTimer } from '../../../data/models/task-timer';
import { Timesheet } from '../../../data/models/timesheet';
import { TimesheetReportService } from './timesheet-report.service';

const allProjects: Array<Project> = [
  new Project({ _id: '99321', name: 'Test Project 1', jiraTaskId: 'ABC-123', sbvbTaskId: 'RFP11432' }),
  new Project({ _id: '99999', name: 'Test Project 2', jiraTaskId: 'XYZ-987', sbvbTaskId: 'RFP11420' }),
  new Project({ _id: '88888', name: 'Test Project 3', jiraTaskId: 'PDQ-314', sbvbTaskId: 'RFP11422' }),
  new Project({ _id: '77777', name: 'Test Project 4', jiraTaskId: 'PDQ-420', sbvbTaskId: 'RFP11422' }),
  new Project({ _id: '66666', name: 'Test Project 5 (no JIRA)', sbvbTaskId: 'RFP11422' })
];

const allStages: Array<Stage> = [
  new Stage({ _id: '1138', stageNumber: 0, name: 'Miscellandeous' }),
  new Stage({ _id: '314159', stageNumber: 1, name: 'Specification' }),
  new Stage({ _id: '42', stageNumber: 2, name: 'Coding' }),
  new Stage({ _id: '73', stageNumber: 3, name: 'Code Review' }),
  new Stage({ _id: '968676', stageNumber: 4, name: 'Testing' })
];

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
      const ts = new Timesheet({ endDate: '2017-01-28' });

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

    it('summarizes JIRA tasks per day', () => {
      const ts = new Timesheet({ endDate: '2017-04-15' });
      const d = service.dailyTasks(ts, [
        newTaskTimer('2017-04-10', 20123, allProjects[2], allStages[3]),
        newTaskTimer('2017-04-10', 42098, allProjects[3], allStages[3]),
        newTaskTimer('2017-04-10', 109935, allProjects[3], allStages[4]),
        newTaskTimer('2017-04-12', 399940, allProjects[3], allStages[3]),
        newTaskTimer('2017-04-10', 1111111, allProjects[1], allStages[2]),
        newTaskTimer('2017-04-12', 100395994, allProjects[3], allStages[4]),
        newTaskTimer('2017-04-11', 44599405, allProjects[1], allStages[3]),
        newTaskTimer('2017-04-11', 2993005, allProjects[2], allStages[4]),
        newTaskTimer('2017-04-10', 3885234, allProjects[0], allStages[0]),
        newTaskTimer('2017-04-11', 20002995, allProjects[3], allStages[4]),
        newTaskTimer('2017-04-11', 20002995, allProjects[4], allStages[4]),
        newTaskTimer('2017-04-10', 20002995, allProjects[4], allStages[4]),
        newTaskTimer('2017-04-12', 20002995, allProjects[4], allStages[4])
      ]);

      expect(d[0].jiraTasks.length).toEqual(0);
      expect(d[1].jiraTasks.length).toEqual(4);
      expect(d[2].jiraTasks.length).toEqual(3);
      expect(d[3].jiraTasks.length).toEqual(1);
      expect(d[4].jiraTasks.length).toEqual(0);
      expect(d[5].jiraTasks.length).toEqual(0);
      expect(d[6].jiraTasks.length).toEqual(0);

      expect(d[1].jiraTasks[0].name).toEqual(allProjects[2].jiraTaskId);
      expect(d[1].jiraTasks[1].name).toEqual(allProjects[3].jiraTaskId);
      expect(d[1].jiraTasks[2].name).toEqual(allProjects[1].jiraTaskId);
      expect(d[1].jiraTasks[3].name).toEqual(allProjects[0].jiraTaskId);
      expect(d[2].jiraTasks[0].name).toEqual(allProjects[1].jiraTaskId);
      expect(d[2].jiraTasks[1].name).toEqual(allProjects[2].jiraTaskId);
      expect(d[2].jiraTasks[2].name).toEqual(allProjects[3].jiraTaskId);
      expect(d[3].jiraTasks[0].name).toEqual(allProjects[3].jiraTaskId);

      expect(d[1].jiraTasks[0].stage).toBeUndefined();
      expect(d[1].jiraTasks[1].stage).toBeUndefined();
      expect(d[2].jiraTasks[0].stage).toBeUndefined();
      expect(d[2].jiraTasks[1].stage).toBeUndefined();
      expect(d[2].jiraTasks[2].stage).toBeUndefined();
      expect(d[3].jiraTasks[0].stage).toBeUndefined();

      expect(d[1].jiraTasks[0].milliseconds).toEqual(20123);
      expect(d[1].jiraTasks[1].milliseconds).toEqual(42098 + 109935);
      expect(d[1].jiraTasks[2].milliseconds).toEqual(1111111);
      expect(d[1].jiraTasks[3].milliseconds).toEqual(3885234);
      expect(d[2].jiraTasks[0].milliseconds).toEqual(44599405);
      expect(d[2].jiraTasks[1].milliseconds).toEqual(2993005);
      expect(d[2].jiraTasks[2].milliseconds).toEqual(20002995);
      expect(d[3].jiraTasks[0].milliseconds).toEqual(399940 + 100395994);
    });

    it('summarizes SBVB tasks per day', () => {
      const ts = new Timesheet({ endDate: '2017-04-15' });
      const d = service.dailyTasks(ts, [
        newTaskTimer('2017-04-10', 20123, allProjects[2], allStages[3]),
        newTaskTimer('2017-04-10', 42098, allProjects[3], allStages[3]),
        newTaskTimer('2017-04-10', 109935, allProjects[3], allStages[4]),
        newTaskTimer('2017-04-12', 399940, allProjects[3], allStages[3]),
        newTaskTimer('2017-04-10', 1111111, allProjects[1], allStages[2]),
        newTaskTimer('2017-04-12', 100395994, allProjects[3], allStages[4]),
        newTaskTimer('2017-04-11', 44599405, allProjects[1], allStages[3]),
        newTaskTimer('2017-04-11', 2993005, allProjects[2], allStages[4]),
        newTaskTimer('2017-04-10', 3885234, allProjects[0], allStages[0]),
        newTaskTimer('2017-04-11', 20002995, allProjects[3], allStages[4])
      ]);

      expect(d[0].sbvbTasks.length).toEqual(0);
      expect(d[1].sbvbTasks.length).toEqual(4);
      expect(d[2].sbvbTasks.length).toEqual(2);
      expect(d[3].sbvbTasks.length).toEqual(2);
      expect(d[4].sbvbTasks.length).toEqual(0);
      expect(d[5].sbvbTasks.length).toEqual(0);
      expect(d[6].sbvbTasks.length).toEqual(0);

      expect(d[1].sbvbTasks[0].name).toEqual(allProjects[2].sbvbTaskId);
      expect(d[1].sbvbTasks[1].name).toEqual(allProjects[2].sbvbTaskId);
      expect(d[1].sbvbTasks[2].name).toEqual(allProjects[1].sbvbTaskId);
      expect(d[1].sbvbTasks[3].name).toEqual(allProjects[0].sbvbTaskId);
      expect(d[2].sbvbTasks[0].name).toEqual(allProjects[1].sbvbTaskId);
      expect(d[2].sbvbTasks[1].name).toEqual(allProjects[2].sbvbTaskId);
      expect(d[3].sbvbTasks[0].name).toEqual(allProjects[3].sbvbTaskId);
      expect(d[3].sbvbTasks[1].name).toEqual(allProjects[3].sbvbTaskId);

      expect(d[1].sbvbTasks[0].stage).toEqual(allStages[3]);
      expect(d[1].sbvbTasks[1].stage).toEqual(allStages[4]);
      expect(d[1].sbvbTasks[2].stage).toEqual(allStages[2]);
      expect(d[1].sbvbTasks[3].stage).toEqual(allStages[0]);
      expect(d[2].sbvbTasks[0].stage).toEqual(allStages[3]);
      expect(d[2].sbvbTasks[1].stage).toEqual(allStages[4]);
      expect(d[3].sbvbTasks[0].stage).toEqual(allStages[3]);
      expect(d[3].sbvbTasks[1].stage).toEqual(allStages[4]);

      expect(d[1].sbvbTasks[0].milliseconds).toEqual(20123 + 42098);
      expect(d[1].sbvbTasks[1].milliseconds).toEqual(109935);
      expect(d[1].sbvbTasks[2].milliseconds).toEqual(1111111);
      expect(d[1].sbvbTasks[3].milliseconds).toEqual(3885234);
      expect(d[2].sbvbTasks[0].milliseconds).toEqual(44599405);
      expect(d[2].sbvbTasks[1].milliseconds).toEqual(2993005 + 20002995);
      expect(d[3].sbvbTasks[0].milliseconds).toEqual(399940);
      expect(d[3].sbvbTasks[1].milliseconds).toEqual(100395994);
    });

    it('calculates the total time per day', () => {
      const ts = new Timesheet({ endDate: '2017-04-15' });
      const d = service.dailyTasks(ts, [
        newTaskTimer('2017-04-10', 20123, allProjects[2], allStages[3]),
        newTaskTimer('2017-04-10', 42098, allProjects[3], allStages[3]),
        newTaskTimer('2017-04-10', 109935, allProjects[3], allStages[4]),
        newTaskTimer('2017-04-12', 399940, allProjects[3], allStages[3]),
        newTaskTimer('2017-04-10', 1111111, allProjects[1], allStages[2]),
        newTaskTimer('2017-04-12', 100395994, allProjects[3], allStages[4]),
        newTaskTimer('2017-04-11', 44599405, allProjects[1], allStages[3]),
        newTaskTimer('2017-04-11', 2993005, allProjects[2], allStages[4]),
        newTaskTimer('2017-04-10', 3885234, allProjects[0], allStages[0]),
        newTaskTimer('2017-04-11', 20002995, allProjects[3], allStages[4])
      ]);

      expect(d[0].milliseconds).toEqual(0);
      expect(d[1].milliseconds).toEqual(20123 + 42098 + 109935 + 1111111 + 3885234);
      expect(d[2].milliseconds).toEqual(44599405 + 2993005 + 20002995);
      expect(d[3].milliseconds).toEqual(399940 + 100395994);
      expect(d[4].milliseconds).toEqual(0);
      expect(d[5].milliseconds).toEqual(0);
      expect(d[6].milliseconds).toEqual(0);
    });
  });

  describe('addTask', () => {
    let days;
    beforeEach(() => {
      const ts = new Timesheet();
      ts.endDate = '2017-01-28';
      days = service.dailyTasks(ts, [newTaskTimer('2017-01-24'), newTaskTimer('2017-01-26'), newTaskTimer('2017-01-27'),
      newTaskTimer('2017-01-23'), newTaskTimer('2017-01-26'), newTaskTimer('2017-01-25'), newTaskTimer('2017-01-25'),
      newTaskTimer('2017-01-25'), newTaskTimer('2017-01-23'), newTaskTimer('2017-01-27'), newTaskTimer('2017-01-24'),
      newTaskTimer('2017-01-25'), newTaskTimer('2017-01-26'), newTaskTimer('2017-01-23'), newTaskTimer('2017-01-24'),
      newTaskTimer('2017-01-24'), newTaskTimer('2017-01-24')]);
    });

    it('adds the task to the correct day', () => {
      service.addTimer(days, newTaskTimer('2017-01-23'));
      expect(days[0].taskTimers.length).toEqual(0, 'Sunday');
      expect(days[1].taskTimers.length).toEqual(4, 'Monday');
      expect(days[2].taskTimers.length).toEqual(5, 'Tuesday');
      expect(days[3].taskTimers.length).toEqual(4, 'Wednesday');
      expect(days[4].taskTimers.length).toEqual(3, 'Thursday');
      expect(days[5].taskTimers.length).toEqual(2, 'Friday');
      expect(days[6].taskTimers.length).toEqual(0, 'Saturday');
    });

    it('adds the task to a day that previously had not tasks', () => {
      service.addTimer(days, newTaskTimer('2017-01-22'));
      expect(days[0].taskTimers.length).toEqual(1, 'Sunday');
      expect(days[1].taskTimers.length).toEqual(3, 'Monday');
      expect(days[2].taskTimers.length).toEqual(5, 'Tuesday');
      expect(days[3].taskTimers.length).toEqual(4, 'Wednesday');
      expect(days[4].taskTimers.length).toEqual(3, 'Thursday');
      expect(days[5].taskTimers.length).toEqual(2, 'Friday');
      expect(days[6].taskTimers.length).toEqual(0, 'Saturday');
    });

    it('throws an exception if the task is not for the week covered by the timesheet', () => {
      expect(() => { service.addTimer(days, newTaskTimer('2017-01-29')); })
        .toThrowError('timesheet-report service: attempt to add timer not in timesheet date range');
    });
  });

  function newTaskTimer(dt: string, milliseconds?: number, project?: Project, stage?: Stage): TaskTimer {
    const tt = {
      _id: '427331459',
      timesheetRid: '11389578',
      workDate: dt,
      stage: stage || new Stage(),
      project: project || new Project(),
      milliseconds: milliseconds
    };

    return new TaskTimer(tt);
  }
});

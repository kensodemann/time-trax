import { ViewContainerRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MdCardModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { TimeReportComponent } from './time-report.component';
import { TimeListComponent } from './shared/time-list/time-list.component';
import { Project } from '../data/models/project';
import { Stage } from '../data/models/stage';
import { TaskTimer } from '../data/models/task-timer';
import { Timesheet } from '../data/models/timesheet';
import { TaskTimerService } from '../data/services/task-timer/task-timer.service';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';
import { HoursMinutesPipe } from '../shared/pipes/hours-minutes.pipe';
import { TimesheetReportService } from '../shared/services/timesheet-report/timesheet-report.service';
import { ActivatedRoute, ActivatedRouteStub } from '../../../testing/router-stubs';

class TimesheetServiceStub {
  getCurrent(): Observable<Timesheet> { return Observable.empty(); }
  get(id: string): Observable<Timesheet> { return Observable.empty(); }
};

class TaskTimerServiceStub {
  getAll(params: any): Observable<Array<TaskTimer>> { return Observable.empty(); }
};

describe('TimeReportComponent', () => {
  let testTaskTimers;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HoursMinutesPipe,
        TimeListComponent,
        TimeReportComponent
      ],
      imports: [
        MdCardModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: TaskTimerService, useClass: TaskTimerServiceStub },
        { provide: TimesheetService, useClass: TimesheetServiceStub },
        TimesheetReportService
      ]
    });
  });

  let fixture;
  let app;
  let route;
  beforeEach(() => {
    initializeTestData();
    fixture = TestBed.createComponent(TimeReportComponent);
    app = fixture.debugElement.componentInstance;
    route = fixture.debugElement.injector.get(ActivatedRoute);
    route.testParams = {};
  });

  it('builds', async(() => {
    expect(app).toBeTruthy();
  }));

  describe('initialization', () => {
    describe('without parameters', () => {
      it('gets the current timesheet', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.empty());
        app.ngOnInit();
        expect(timesheetService.getCurrent).toHaveBeenCalledTimes(1);
      });

      it('gets the task timers for the current timesheet', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        const taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.empty());
        app.ngOnInit();
        expect(taskTimerService.getAll).toHaveBeenCalledTimes(1);
        expect(taskTimerService.getAll).toHaveBeenCalledWith({ timesheetId: '11383141594273' });
      });

      it('generates a report of the timers', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        const taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        const reportService = fixture.debugElement.injector.get(TimesheetReportService);
        spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
        spyOn(reportService, 'dailyTasks').and.callThrough();
        app.ngOnInit();
        expect(reportService.dailyTasks).toHaveBeenCalledTimes(1);
        expect(reportService.dailyTasks).toHaveBeenCalledWith({ _id: '11383141594273', endDate: '2017-02-04' }, testTaskTimers);
      });

      it('assigns the results of the report', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        const taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        const reportService = fixture.debugElement.injector.get(TimesheetReportService);
        spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
        spyOn(reportService, 'dailyTasks').and.callThrough();
        app.ngOnInit();
        expect(app.days.length).toEqual(7);
        expect(app.days[0].taskTimers.length).toEqual(0);
      });
    });

    describe('with an id parameter', () => {
      beforeEach(() => {
        route.testParams = { id: '73423141591138420' };
      });

      it('gets the current timesheet', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        spyOn(timesheetService, 'get').and.returnValue(Observable.empty());
        app.ngOnInit();
        expect(timesheetService.get).toHaveBeenCalledTimes(1);
        expect(timesheetService.get).toHaveBeenCalledWith('73423141591138420');
      });

      it('gets the task timers for the current timesheet', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        const taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        spyOn(timesheetService, 'get').and.returnValue(Observable.of({ _id: '73423141591138420', endDate: '2017-02-04' }));
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.empty());
        app.ngOnInit();
        expect(taskTimerService.getAll).toHaveBeenCalledTimes(1);
        expect(taskTimerService.getAll).toHaveBeenCalledWith({ timesheetId: '73423141591138420' });
      });

      it('generates a report of the timers', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        const taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        const reportService = fixture.debugElement.injector.get(TimesheetReportService);
        spyOn(timesheetService, 'get').and.returnValue(Observable.of({ _id: '73423141591138420', endDate: '2017-02-04' }));
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
        spyOn(reportService, 'dailyTasks').and.callThrough();
        app.ngOnInit();
        expect(reportService.dailyTasks).toHaveBeenCalledTimes(1);
        expect(reportService.dailyTasks).toHaveBeenCalledWith({ _id: '73423141591138420', endDate: '2017-02-04' }, testTaskTimers);
      });

      it('assigns the results of the report', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        const taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        const reportService = fixture.debugElement.injector.get(TimesheetReportService);
        spyOn(timesheetService, 'get').and.returnValue(Observable.of({ _id: '73423141591138420', endDate: '2017-02-04' }));
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
        spyOn(reportService, 'dailyTasks').and.callThrough();
        app.ngOnInit();
        expect(app.days.length).toEqual(7);
        expect(app.days[0].taskTimers.length).toEqual(0);
      });
    });
  });

  function initializeTestData() {
    testTaskTimers = [{
      _id: 1,
      timesheetRid: '11383141594273',
      workDate: '2017-02-03',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 112,
      timesheetRid: '11383141594273',
      workDate: '2017-02-01',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 123,
      timesheetRid: '11383141594273',
      workDate: '2017-02-02',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 134,
      timesheetRid: '11383141594273',
      workDate: '2017-01-30',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 156,
      timesheetRid: '11383141594273',
      workDate: '2017-01-31',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 174,
      timesheetRid: '11383141594273',
      workDate: '2017-01-31',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 189,
      timesheetRid: '11383141594273',
      workDate: '2017-02-03',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 201,
      timesheetRid: '11383141594273',
      workDate: '2017-02-03',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 903,
      timesheetRid: '11383141594273',
      workDate: '2017-02-01',
      project: new Project(),
      stage: new Stage()
    }, {
      _id: 9873,
      timesheetRid: '11383141594273',
      workDate: '2017-02-01',
      project: new Project(),
      stage: new Stage()
    }];
  }
});

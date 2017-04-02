import { TestBed, async } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { TaskTimerComponent } from './task-timer/task-timer.component';
import { TimesheetComponent } from './timesheet.component';
import { TaskTimer } from '../data/models/task-timer';
import { Timesheet } from '../data/models/timesheet';
import { TaskTimerService } from '../data/services/task-timer/task-timer.service';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';
import { TaskTimerEditorService } from '../editors/task-timer-editor/task-timer-editor.service';
import { HoursMinutesPipe } from '../shared/pipes/hours-minutes.pipe';
import { ProjectTitlePipe } from '../shared/pipes/project-title.pipe';
import { DateService } from '../shared/services/date/date.service';
import { TimesheetReportService } from '../shared/services/timesheet-report/timesheet-report.service';

class TimesheetServiceStub {
  getCurrent(): Observable<Timesheet> { return Observable.empty(); }
  save(ts: Timesheet): Observable<Timesheet> { return Observable.empty(); }
};

class TaskTimerServiceStub {
  getAll(params: any): Observable<Array<TaskTimer>> { return Observable.empty(); }
};

class TaskTimerEditorStub {
  open(taskTimer: TaskTimer, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

const testTaskTimers = [{
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-02-03'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-02-01'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-02-02'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-01-30'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-01-31'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-01-31'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-02-03'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-02-03'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-02-01'
}, {
  _id: 1,
  timesheetRid: '11383141594273',
  workDate: '2017-02-01'
}];

describe('Component: Timesheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        HoursMinutesPipe,
        ProjectTitlePipe,
        TaskTimerComponent,
        TimesheetComponent
      ],
      providers: [
        { provide: TaskTimerService, useClass: TaskTimerServiceStub },
        { provide: TaskTimerEditorService, useClass: TaskTimerEditorStub },
        { provide: TimesheetService, useClass: TimesheetServiceStub },
        DateService,
        TimesheetReportService
      ]
    });
  });

  it('builds', async(() => {
    const fixture = TestBed.createComponent(TimesheetComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('OnInit', () => {
    it('gets the current timesheet', () => {
      const fixture = TestBed.createComponent(TimesheetComponent);
      const app = fixture.debugElement.componentInstance;
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.empty());
      app.ngOnInit();
      expect(timesheetService.getCurrent).toHaveBeenCalledTimes(1);
    });

    describe('when there is a current timesheeet', () => {
      let app;
      let taskTimerService;
      beforeEach(() => {
        const fixture = TestBed.createComponent(TimesheetComponent);
        app = fixture.debugElement.componentInstance;
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
      });

      it('gets all of the task timers for the current timesheet', () => {
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.empty());
        app.ngOnInit();
        expect(taskTimerService.getAll).toHaveBeenCalledTimes(1);
        expect(taskTimerService.getAll).toHaveBeenCalledWith({ timesheetId: '11383141594273' });
      });

      it('separates the tasks by day', () => {
        spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
        app.ngOnInit();
        expect(app.days.length).toEqual(7);
        expect(app.days[0].date).toEqual(new Date(2017, 0, 29));
        expect(app.days[1].date).toEqual(new Date(2017, 0, 30));
        expect(app.days[2].date).toEqual(new Date(2017, 0, 31));
        expect(app.days[3].date).toEqual(new Date(2017, 1, 1));
        expect(app.days[4].date).toEqual(new Date(2017, 1, 2));
        expect(app.days[5].date).toEqual(new Date(2017, 1, 3));
        expect(app.days[6].date).toEqual(new Date(2017, 1, 4));
        expect(app.days[0].taskTimers.length).toEqual(0, 'Sunday');
        expect(app.days[1].taskTimers.length).toEqual(1, 'Monday');
        expect(app.days[2].taskTimers.length).toEqual(2, 'Tuesday');
        expect(app.days[3].taskTimers.length).toEqual(3, 'Wednesday');
        expect(app.days[4].taskTimers.length).toEqual(1, 'Thursday');
        expect(app.days[5].taskTimers.length).toEqual(3, 'Friday');
        expect(app.days[6].taskTimers.length).toEqual(0, 'Saturday');
      });
    });

    describe('when there is no current timesheet', () => {
      let app;
      let taskTimerService;
      let timesheetService;
      beforeEach(() => {
        const fixture = TestBed.createComponent(TimesheetComponent);
        app = fixture.debugElement.componentInstance;
        timesheetService = fixture.debugElement.injector.get(TimesheetService);
        taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
        spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of(undefined));
        jasmine.clock().mockDate(new Date(2017, 1, 2));
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('creates a new task timer', () => {
        spyOn(timesheetService, 'save').and.returnValue(Observable.of({ _id: '42731138314159', endDate: '2017-02-04', userRid: 'me' }));
        app.ngOnInit();
        expect(timesheetService.save).toHaveBeenCalledTimes(1);
        expect(timesheetService.save).toHaveBeenCalledWith({
          _id: undefined,
          endDate: '2017-02-04',
          userRid: undefined
        });
      });

      it('does not get task timers', () => {
        spyOn(timesheetService, 'save').and.returnValue(Observable.of({ _id: '42731138314159', endDate: '2017-02-04', userRid: 'me' }));
        spyOn(taskTimerService, 'getAll');
        app.ngOnInit();
        expect(taskTimerService.getAll).not.toHaveBeenCalled();
      });

      it('creates an empty schedule of daily tasks', () => {
        spyOn(timesheetService, 'save').and.returnValue(Observable.of({ _id: '42731138314159', endDate: '2017-02-04', userRid: 'me' }));
        app.ngOnInit();
        expect(app.days.length).toEqual(7);
        expect(app.days[0].date).toEqual(new Date(2017, 0, 29));
        expect(app.days[1].date).toEqual(new Date(2017, 0, 30));
        expect(app.days[2].date).toEqual(new Date(2017, 0, 31));
        expect(app.days[3].date).toEqual(new Date(2017, 1, 1));
        expect(app.days[4].date).toEqual(new Date(2017, 1, 2));
        expect(app.days[5].date).toEqual(new Date(2017, 1, 3));
        expect(app.days[6].date).toEqual(new Date(2017, 1, 4));
        expect(app.days[0].taskTimers.length).toEqual(0, 'Sunday');
        expect(app.days[1].taskTimers.length).toEqual(0, 'Monday');
        expect(app.days[2].taskTimers.length).toEqual(0, 'Tuesday');
        expect(app.days[3].taskTimers.length).toEqual(0, 'Wednesday');
        expect(app.days[4].taskTimers.length).toEqual(0, 'Thursday');
        expect(app.days[5].taskTimers.length).toEqual(0, 'Friday');
        expect(app.days[6].taskTimers.length).toEqual(0, 'Saturday');
      });
    });
  });

  describe('addTaskTimer - new timesheet', () => {
    let app;
    let editor;
    beforeEach(() => {
      const fixture = TestBed.createComponent(TimesheetComponent);
      app = fixture.debugElement.componentInstance;
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      editor = fixture.debugElement.injector.get(TaskTimerEditorService);
      spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of(undefined));
      spyOn(timesheetService, 'save').and.returnValue(Observable.of({ _id: '42731138314159', endDate: '2017-02-04', userRid: 'me' }));
      jasmine.clock().mockDate(new Date(2017, 1, 2));
      app.ngOnInit();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('opens the task timer editor', () => {
      spyOn(editor, 'open').and.returnValue(Observable.empty());
      app.addTaskTimer(new Date(2017, 1, 5));
      expect(editor.open).toHaveBeenCalledTimes(1);
      expect(editor.open.calls.argsFor(0)[0]).toEqual(new TaskTimer('42731138314159', '2017-02-05'));
    });
  });

  describe('addTaskTimer - existing timesheet', () => {
    let app;
    let editor;
    let timesheetReportService;
    beforeEach(() => {
      const fixture = TestBed.createComponent(TimesheetComponent);
      app = fixture.debugElement.componentInstance;
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      editor = fixture.debugElement.injector.get(TaskTimerEditorService);
      spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
      timesheetReportService = fixture.debugElement.injector.get(TimesheetReportService);
      app.ngOnInit();
    });

    it('opens the task timer editor', () => {
      spyOn(editor, 'open').and.returnValue(Observable.empty());
      app.addTaskTimer(new Date(2017, 1, 5));
      expect(editor.open).toHaveBeenCalledTimes(1);
      expect(editor.open.calls.argsFor(0)[0]).toEqual(new TaskTimer('11383141594273', '2017-02-05'));
    });

    it('adds the task timer to the loaded timesheet structure', () => {
      const newTimer = new TaskTimer('11383141594273', '2017-02-03');
      spyOn(editor, 'open').and.returnValue(Observable.of(newTimer));
      spyOn(timesheetReportService, 'addTimer');
      app.addTaskTimer(new Date(2017, 1, 3));
      expect(timesheetReportService.addTimer).toHaveBeenCalledTimes(1);
    });

    it('does not add a task timer if none is returned', () => {
      spyOn(editor, 'open').and.returnValue(Observable.of(null));
      spyOn(timesheetReportService, 'addTimer');
      app.addTaskTimer(new Date(2017, 1, 3));
      expect(timesheetReportService.addTimer).not.toHaveBeenCalled();
    });
  });
});

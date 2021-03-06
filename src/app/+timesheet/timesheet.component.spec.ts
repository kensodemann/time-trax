import { TestBed, async } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import { MdIconModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { TaskTimerComponent } from './shared/task-timer/task-timer.component';
import { TimesheetComponent } from './timesheet.component';
import { Project } from '../data/models/project';
import { Stage } from '../data/models/stage';
import { TaskTimer } from '../data/models/task-timer';
import { Timesheet } from '../data/models/timesheet';
import { TaskTimerService } from '../data/services/task-timer/task-timer.service';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';
import { TaskTimerEditorService } from '../editors/task-timer-editor/task-timer-editor.service';
import { HoursMinutesPipe } from '../shared/pipes/hours-minutes.pipe';
import { ProjectTitlePipe } from '../shared/pipes/project-title.pipe';
import { AskDialogService } from '../shared/services/ask-dialog/ask-dialog.service';
import { DateService } from '../shared/services/date/date.service';
import { TimesheetReportService } from '../shared/services/timesheet-report/timesheet-report.service';
import { ActivatedRoute, ActivatedRouteStub } from '../../../testing/router-stubs';

class DialogStub {
  open(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

class TimesheetServiceStub {
  getCurrent(): Observable<Timesheet> { return Observable.empty(); }
  get(id: string): Observable<Timesheet> { return Observable.empty(); }
};

class TaskTimerServiceStub {
  getAll(params: any): Observable<Array<TaskTimer>> { return Observable.empty(); }
  delete(timer: TaskTimer): Observable<TaskTimer> { return Observable.empty(); }
  start(timer: TaskTimer): Observable<TaskTimer> { return Observable.empty(); }
  stop(timer: TaskTimer): Observable<TaskTimer> { return Observable.empty(); }
};

class TaskTimerEditorStub {
  open(taskTimer: TaskTimer, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

let testTaskTimers;

describe('TimesheetComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MdIconModule
      ],
      declarations: [
        HoursMinutesPipe,
        ProjectTitlePipe,
        TaskTimerComponent,
        TimesheetComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: AskDialogService, useClass: DialogStub },
        { provide: TaskTimerService, useClass: TaskTimerServiceStub },
        { provide: TaskTimerEditorService, useClass: TaskTimerEditorStub },
        { provide: TimesheetService, useClass: TimesheetServiceStub },
        DateService,
        TimesheetReportService
      ]
    });
  });

  beforeEach(initializeTestData);

  let fixture;
  let app;
  let route;
  beforeEach(() => {
    initializeTestData();
    fixture = TestBed.createComponent(TimesheetComponent);
    app = fixture.debugElement.componentInstance;
    route = fixture.debugElement.injector.get(ActivatedRoute);
    route.testParams = {};
  });

  it('builds', async(() => {
    expect(app).toBeTruthy();
  }));

  describe('Initialization', () => {
    describe('without an id', () => {
      it('gets the current timesheet', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.empty());
        app.ngOnInit();
        expect(timesheetService.getCurrent).toHaveBeenCalledTimes(1);
      });

      describe('after getting the current timesheeet', () => {
        let taskTimerService;
        beforeEach(() => {
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
    });

    describe('with an id', () => {
      beforeEach(() => {
        route.testParams = { id: '73423141591138420' };
      });

      it('gets the specified timesheet', () => {
        const timesheetService = fixture.debugElement.injector.get(TimesheetService);
        spyOn(timesheetService, 'get').and.returnValue(Observable.empty());
        app.ngOnInit();
        expect(timesheetService.get).toHaveBeenCalledTimes(1);
        expect(timesheetService.get).toHaveBeenCalledWith('73423141591138420');
      });

      describe('after getting the specified timesheeet', () => {
        let taskTimerService;
        beforeEach(() => {
          const timesheetService = fixture.debugElement.injector.get(TimesheetService);
          taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
          spyOn(timesheetService, 'get').and.returnValue(Observable.of({ _id: '73423141591138420', endDate: '2017-02-04' }));
        });

        it('gets all of the task timers for the timesheet', () => {
          spyOn(taskTimerService, 'getAll').and.returnValue(Observable.empty());
          app.ngOnInit();
          expect(taskTimerService.getAll).toHaveBeenCalledTimes(1);
          expect(taskTimerService.getAll).toHaveBeenCalledWith({ timesheetId: '73423141591138420' });
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
    });
  });

  describe('task timer refresh', () => {
    let taskTimerService;
    beforeEach(() => {
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
      spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
    });

    it('is scheduled on init to run every 15 seconds', () => {
      spyOn(Observable, 'interval').and.returnValue(Observable.empty());
      app.ngOnInit();
      expect(Observable.interval).toHaveBeenCalledTimes(1);
      expect(Observable.interval).toHaveBeenCalledWith(15000);
    });

    it('refreshes the task timer data', () => {
      spyOn(Observable, 'interval').and.returnValue(Observable.of(null));
      spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
      app.ngOnInit();
      expect(taskTimerService.getAll).toHaveBeenCalledTimes(2);
    });
  });

  describe('adding a task timer', () => {
    let editor;
    let timesheetReportService;
    beforeEach(() => {
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
      expect(editor.open.calls.argsFor(0)[0]).toEqual(new TaskTimer({
        timesheetRid: '11383141594273',
        workDate: '2017-02-05'
      }));
    });

    it('adds the task timer to the loaded timesheet structure', () => {
      const newTimer = new TaskTimer({
        timesheetRid: '11383141594273',
        workDate: '2017-02-03'
      });
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

  describe('deleting a task timer', () => {
    let ask;
    let taskTimerService;
    beforeEach(() => {
      ask = fixture.debugElement.injector.get(AskDialogService);
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
      taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
      spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
      app.ngOnInit();
    });

    it('it asks the user if they would like to remove the task timer', () => {
      spyOn(ask, 'open').and.returnValue(Observable.empty());
      app.deleteTaskTimer(app.days[5].taskTimers[1]);
      expect(ask.open).toHaveBeenCalledTimes(1);
      expect(ask.open.calls.argsFor(0)[0]).toEqual('Delete Task?');
      expect(ask.open.calls.argsFor(0)[1]).toEqual('Are you sure you want to remove this task?');
    });

    it('deletes the task timer if the user says yes', () => {
      spyOn(ask, 'open').and.returnValue(Observable.of(true));
      spyOn(taskTimerService, 'delete').and.returnValue(Observable.empty());
      app.deleteTaskTimer(app.days[5].taskTimers[1]);
      expect(taskTimerService.delete).toHaveBeenCalledTimes(1);
      expect(taskTimerService.delete).toHaveBeenCalledWith(app.days[5].taskTimers[1]);
    });

    it('does not delete the task timer if the user says no', () => {
      spyOn(ask, 'open').and.returnValue(Observable.of(false));
      spyOn(taskTimerService, 'delete').and.returnValue(Observable.empty());
      app.deleteTaskTimer(app.days[5].taskTimers[1]);
      expect(taskTimerService.delete).not.toHaveBeenCalled();
    });

    it('refreshes the data', () => {
      taskTimerService.getAll.calls.reset();
      spyOn(ask, 'open').and.returnValue(Observable.of(true));
      spyOn(taskTimerService, 'delete').and.returnValue(Observable.of({}));
      app.deleteTaskTimer(app.days[5].taskTimers[1]);
      expect(taskTimerService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('editing a task timer', () => {
    let editor;
    beforeEach(() => {
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      editor = fixture.debugElement.injector.get(TaskTimerEditorService);
      spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
      const taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
      spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
      app.ngOnInit();
    });

    it('opens the task timer editor, passing the timer', () => {
      spyOn(editor, 'open').and.returnValue(Observable.empty());
      app.editTaskTimer(app.days[3].taskTimers[1]);
      expect(editor.open).toHaveBeenCalledTimes(1);
      expect(editor.open.calls.argsFor(0)[0]).toEqual({
        _id: 903,
        timesheetRid: '11383141594273',
        workDate: '2017-02-01',
        project: new Project(),
        stage: new Stage()
      });
    });

    it('updates the task timer with the returned data', () => {
      spyOn(editor, 'open').and.returnValue(Observable.of({
        _id: 903,
        timesheetRid: '11383141594273',
        workDate: '2017-02-01',
        project: {
          _id: 42,
          name: 'Douglas'
        },
        stage: {
          _id: '1138',
          stageNumber: 4,
          name: 'Coding'
        },
        milliseconds: 1000
      }));
      app.editTaskTimer(app.days[3].taskTimers[1]);
      expect(app.days[3].taskTimers[1]).toEqual({
        _id: 903,
        timesheetRid: '11383141594273',
        workDate: '2017-02-01',
        project: {
          _id: 42,
          name: 'Douglas'
        },
        stage: {
          _id: '1138',
          stageNumber: 4,
          name: 'Coding'
        },
        milliseconds: 1000
      });
    });

    it('does not update the task timer if nothing is returned', () => {
      spyOn(editor, 'open').and.returnValue(Observable.of(null));
      app.editTaskTimer(app.days[3].taskTimers[1]);
      expect(app.days[3].taskTimers[1]).toEqual({
        _id: 903,
        timesheetRid: '11383141594273',
        workDate: '2017-02-01',
        project: new Project(),
        stage: new Stage()
      });
    });
  });

  describe('toggling a task timer', () => {
    let editor;
    let taskTimerService;
    beforeEach(() => {
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      editor = fixture.debugElement.injector.get(TaskTimerEditorService);
      spyOn(timesheetService, 'getCurrent').and.returnValue(Observable.of({ _id: '11383141594273', endDate: '2017-02-04' }));
      taskTimerService = fixture.debugElement.injector.get(TaskTimerService);
      spyOn(taskTimerService, 'getAll').and.returnValue(Observable.of(testTaskTimers));
      app.ngOnInit();
    });

    describe('when the timer is active', () => {
      beforeEach(() => {
        app.days[3].taskTimers[1].isActive = true;
        app.days[3].taskTimers[1].milliseconds = 1000;
        app.days[3].taskTimers[1].startTime = 1234;
      });

      it('calls stop', () => {
        spyOn(taskTimerService, 'stop').and.returnValue(Observable.empty());
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(taskTimerService.stop).toHaveBeenCalledTimes(1);
        expect(taskTimerService.stop).toHaveBeenCalledWith(app.days[3].taskTimers[1]);
      });

      it('copies the start/stop properties back to the timer', () => {
        spyOn(taskTimerService, 'stop').and.returnValue(Observable.of(new TaskTimer({
          _id: 903,
          timesheetRid: '11383141594273',
          workDate: '2017-02-01',
          isActive: false,
          milliseconds: 99385
        })));
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(app.days[3].taskTimers[1].isActive).toEqual(false);
        expect(app.days[3].taskTimers[1].milliseconds).toEqual(99385);
        expect(app.days[3].taskTimers[1].startTime).toBeUndefined();
      });

      it('does not call stop if it is already stopping', () => {
        spyOn(taskTimerService, 'stop').and.returnValue(Observable.never());
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(taskTimerService.stop).toHaveBeenCalledTimes(1);
      });

      it('allows calling of stop after original stop is complete', () => {
        spyOn(taskTimerService, 'stop').and.returnValue(Observable.of(new TaskTimer({
          _id: 903,
          timesheetRid: '11383141594273',
          workDate: '2017-02-01',
          isActive: true,
          milliseconds: 99385
        })));
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(taskTimerService.stop).toHaveBeenCalledTimes(2);
      });
    });

    describe('when the timer is inactive', () => {
      beforeEach(() => {
        app.days[3].taskTimers[1].isActive = false;
        app.days[3].taskTimers[1].milliseconds = 4200;
      });

      it('calls stop on any timer that is currently active', () => {
        app.days[4].taskTimers[0].isActive = true;
        app.days[5].taskTimers[2].isActive = true;
        spyOn(taskTimerService, 'start').and.returnValue(Observable.empty());
        spyOn(taskTimerService, 'stop').and.returnValue(Observable.empty());
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(taskTimerService.stop).toHaveBeenCalledTimes(2);
      });

      it('copies the start/stop properties back to the stopped timers', () => {
        app.days[5].taskTimers[2].isActive = true;
        app.days[5].taskTimers[2].startTime = 188483995;
        app.days[5].taskTimers[2]._currentTime = 193853943;
        spyOn(taskTimerService, 'start').and.returnValue(Observable.empty());
        spyOn(taskTimerService, 'stop').and.returnValue(Observable.of(new TaskTimer({
          _id: 201,
          timesheetRid: '11383141594273',
          workDate: '2017-02-03',
          isActive: false,
          milliseconds: 4212,
        })));
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(taskTimerService.stop).toHaveBeenCalledTimes(1);
        expect(app.days[5].taskTimers[2].isActive).toEqual(false);
        expect(app.days[5].taskTimers[2].startTime).toBeUndefined();
        expect(app.days[5].taskTimers[2]._currentTime).toBeUndefined();
      });

      it('calls start', () => {
        spyOn(taskTimerService, 'start').and.returnValue(Observable.empty());
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(taskTimerService.start).toHaveBeenCalledTimes(1);
        expect(taskTimerService.start).toHaveBeenCalledWith(app.days[3].taskTimers[1]);
      });

      it('copies the start/stop properties back to the timer', () => {
        spyOn(taskTimerService, 'start').and.returnValue(Observable.of(new TaskTimer({
          _id: 903,
          timesheetRid: '11383141594273',
          workDate: '2017-02-01',
          isActive: true,
          milliseconds: 4212,
          startTime: 3049
        })));
        app.toggleTaskTimer(app.days[3].taskTimers[1]);
        expect(app.days[3].taskTimers[1].isActive).toEqual(true);
        expect(app.days[3].taskTimers[1].milliseconds).toEqual(4212);
        expect(app.days[3].taskTimers[1].startTime).toEqual(3049);
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

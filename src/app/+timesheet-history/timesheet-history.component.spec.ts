import { TestBed, async } from '@angular/core/testing';
import { MdListModule } from '@angular/material';
import { Router, RouterModule } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TimesheetHistoryComponent } from './timesheet-history.component';
import { Timesheet } from '../data/models/timesheet';
import { TimesheetService } from '../data/services/timesheet/timesheet.service';

class TimesheetServiceStub {
  getAll(): Observable<Array<Timesheet>> { return Observable.empty(); }
};

class RouterStub {
  navigate() { }
};

describe('TimesheetHistoryComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MdListModule,
        RouterModule
      ],
      declarations: [
        TimesheetHistoryComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: TimesheetService, useClass: TimesheetServiceStub }
      ]
    });
  });

  it('builds', async(() => {
    const fixture = TestBed.createComponent(TimesheetHistoryComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    const fixture = TestBed.createComponent(TimesheetHistoryComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));

  describe('initialization', () => {
    it('gets all timesheets for the current user', () => {
      const fixture = TestBed.createComponent(TimesheetHistoryComponent);
      const app = fixture.debugElement.componentInstance;
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      spyOn(timesheetService, 'getAll').and.callThrough();
      app.ngOnInit();
      expect(timesheetService.getAll).toHaveBeenCalledTimes(1);
    });

    it('assigns the returned timesheets sorted by date newest first', () => {
      const fixture = TestBed.createComponent(TimesheetHistoryComponent);
      const app = fixture.debugElement.componentInstance;
      const timesheetService = fixture.debugElement.injector.get(TimesheetService);
      spyOn(timesheetService, 'getAll').and.returnValue(Observable.of([{
        _id: '113813495',
        endDate: '2017-03-15',
        userRid: 'kws'
      }, {
        _id: '99940593',
        endDate: '2017-02-15',
        userRid: 'kws'
      }, {
        _id: '22995003',
        endDate: '2017-02-22',
        userRid: 'kws'
      }, {
        _id: '88899375',
        endDate: '2017-03-22',
        userRid: 'kws'
      }, {
        _id: '333277584',
        endDate: '2017-04-05',
        userRid: 'kws'
      }]));
      app.ngOnInit();
      expect(app.timesheets).toEqual([{
        _id: '333277584',
        endDate: '2017-04-05',
        userRid: 'kws'
      }, {
        _id: '88899375',
        endDate: '2017-03-22',
        userRid: 'kws'
      }, {
        _id: '113813495',
        endDate: '2017-03-15',
        userRid: 'kws'
      }, {
        _id: '22995003',
        endDate: '2017-02-22',
        userRid: 'kws'
      }, {
        _id: '99940593',
        endDate: '2017-02-15',
        userRid: 'kws'
      }]);
    });
  });

  describe('edit', () => {
    it('navigates to the specified timesheet', () => {
      const fixture = TestBed.createComponent(TimesheetHistoryComponent);
      const app = fixture.debugElement.componentInstance;
      const router = fixture.debugElement.injector.get(Router);

      spyOn(router, 'navigate');

      app.edit({
        _id: '113813495',
        endDate: '2017-03-15',
        userRid: 'kws'
      });
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['timesheet', '113813495']);
    });
  });

  describe('view', () => {
    it('navigates to the specified time report', () => {
      const fixture = TestBed.createComponent(TimesheetHistoryComponent);
      const app = fixture.debugElement.componentInstance;
      const router = fixture.debugElement.injector.get(Router);

      spyOn(router, 'navigate');

      app.view({
        _id: '113813495',
        endDate: '2017-03-15',
        userRid: 'kws'
      });
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['time-report', '113813495']);
    });
  });
});

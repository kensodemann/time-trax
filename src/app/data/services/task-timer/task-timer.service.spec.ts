/* tslint:disable:no-unused-variable */

import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../models/project';
import { TaskTimer } from '../../models/task-timer';
import { TaskTimerService } from './task-timer.service';
import { environment } from '../../../../environments/environment';

describe('TaskTimerService', () => {
  let service;

  let mockBackend;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);

    service = new TaskTimerService(http);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('get all', () => {
    it('throws an error if called with no parameter', () => {
      expect(function() { service.getAll(); })
        .toThrowError('TaskTimerService.getAll() must be called with a parameter object specifying the timesheetId');
    });

    it('throws an error if called with a parameter specifying somethting other than a timesheetId', () => {
      expect(function() { service.getAll({ projectId: '42' }); })
        .toThrowError('TaskTimerService.getAll() must be called with a parameter object specifying the timesheetId');
    });

    it('sends a request to get all task timers for the timesheet', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.getAll({ timesheetId: '1138' });
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('returns timers via an observable', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getAll({ timesheetId: '1138' }).subscribe(res => result = res);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          timesheetRid: '1138',
          workDate: '2016-11-30'
        }, {
          _id: '73',
          timesheetRid: '1138',
          workDate: '2016-12-01'
        }, {
          _id: '134159',
          timesheetRid: '1138',
          workDate: '2016-12-01'
        }]
      })));
      expect(result).toEqual([new TaskTimer({
        _id: '42',
        timesheetRid: '1138',
        workDate: '2016-11-30'
      }), new TaskTimer({
        _id: '73',
        timesheetRid: '1138',
        workDate: '2016-12-01'
      }), new TaskTimer({
        _id: '134159',
        timesheetRid: '1138',
        workDate: '2016-12-01'
      })]);
    });

    it('caches the timers', () => {
      let connection: MockConnection;
      let connectionCount = 0;
      mockBackend.connections.subscribe((c) => {
        connection = c;
        connectionCount++;
      });

      let result;
      service.getAll({ timesheetId: '1138' }).subscribe(res => result = res);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          timesheetRid: '1138',
          workDate: '2016-11-30'
        }, {
          _id: '73',
          timesheetRid: '1138',
          workDate: '2016-12-01'
        }, {
          _id: '134159',
          timesheetRid: '1138',
          workDate: '2016-12-01'
        }]
      })));

      for (let x = 0; x < 100; x++) {
        service.getAll({ timesheetId: '1138' }).subscribe(res => result = res);
      }

      expect(connectionCount).toEqual(1);
      expect(result).toEqual([new TaskTimer({
        _id: '42',
        timesheetRid: '1138',
        workDate: '2016-11-30'
      }), new TaskTimer({
        _id: '73',
        timesheetRid: '1138',
        workDate: '2016-12-01'
      }), new TaskTimer({
        _id: '134159',
        timesheetRid: '1138',
        workDate: '2016-12-01'
      })]);

      service.getAll({ timesheetId: '7342' });
      expect(connectionCount).toEqual(2);
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/7342/taskTimers`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });
  });

  describe('save', () => {
    it('posts new task timers', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      const tt = new TaskTimer({
        timesheetRid: '314159',
        workDate: '2017-03-19',
        project: {
          _id: '42',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995'
        },
        stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
        milliseconds: 8857753
      });

      let result;
      service.save(tt).subscribe((res) => { result = res; });

      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/314159/taskTimers`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(JSON.parse(connection.request.getBody())).toEqual({
        timesheetRid: '314159',
        workDate: '2017-03-19',
        project: {
          _id: '42',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995'
        },
        stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
        milliseconds: 8857753
      });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '113842314159',
          timesheetRid: '314159',
          workDate: '2017-03-19',
          project: {
            _id: '42',
            name: 'Butthead',
            jiraTaskId: 'BB-2203',
            sbvbTaskId: 'RFP004995'
          },
          stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
          milliseconds: 8857753
        }
      })));
      expect(result).toEqual(new TaskTimer({
        _id: '113842314159',
        timesheetRid: '314159',
        workDate: '2017-03-19',
        project: {
          _id: '42',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995'
        },
        stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
        milliseconds: 8857753
      }));
    });

    it('posts existing task timer', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      const tt = new TaskTimer({
        _id: '11383141594273',
        timesheetRid: '314159',
        workDate: '2017-03-19',
        project: {
          _id: '42',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995'
        },
        stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
        milliseconds: 8857753
      });

      let result;
      service.save(tt).subscribe((res) => { result = res; });

      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/314159/taskTimers/11383141594273`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(JSON.parse(connection.request.getBody())).toEqual({
        _id: '11383141594273',
        timesheetRid: '314159',
        workDate: '2017-03-19',
        project: {
          _id: '42',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995'
        },
        stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
        milliseconds: 8857753
      });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '11383141594273',
          timesheetRid: '314159',
          workDate: '2017-03-19',
          project: {
            _id: '42',
            name: 'Butthead',
            jiraTaskId: 'BB-2203',
            sbvbTaskId: 'RFP004995'
          },
          stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
          milliseconds: 8857753
        }
      })));
      expect(result).toEqual(new TaskTimer({
        _id: '11383141594273',
        timesheetRid: '314159',
        workDate: '2017-03-19',
        project: {
          _id: '42',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995'
        },
        stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
        milliseconds: 8857753
      }));
    });
  });

  describe('start', () => {
    it('sends a request to start the given timer', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.getAll({ timesheetId: '1138' }).subscribe();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          timesheetRid: '1138',
          workDate: '2016-11-30'
        }]
      })));

      service.start({
        _id: '42',
        timesheetRid: '1138'
      }).subscribe();
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers/42/start`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
    });

    it('returns the started timer', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.getAll({ timesheetId: '1138' }).subscribe();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          timesheetRid: '1138',
          workDate: '2016-11-30'
        }]
      })));

      let result;
      service.start({
        _id: '42',
        timesheetRid: '1138'
      }).subscribe(res => result = res);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          timesheetRid: '1138',
          startTime: 1194950,
          isActive: true
        }
      })));
      expect(result).toEqual(new TaskTimer({
        _id: '42',
        timesheetRid: '1138',
        startTime: 1194950,
        isActive: true
      }));
    });
  });

  describe('stop', () => {
    it('sends a request to stop the given timer', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.stop({
        _id: '42',
        timesheetRid: '1138'
      }).subscribe();
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers/42/stop`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
    });

    it('returns the stopped timer', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.stop({
        _id: '42',
        timesheetRid: '1138'
      }).subscribe(res => result = res);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          timesheetRid: '1138',
          milliseconds: 199503,
          isActive: false
        }
      })));
      expect(result).toEqual(new TaskTimer({
        _id: '42',
        timesheetRid: '1138',
        milliseconds: 199503,
        isActive: false
      }));
    });
  });

  describe('delete', () => {
    it('sends a request to delete the item', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.delete({
        _id: '42',
        timesheetRid: '1138'
      }).subscribe();
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers/42`);
      expect(connection.request.method).toEqual(RequestMethod.Delete);
    });

    it('returns nothing', () => {
      let connection: MockConnection;
      let result;
      mockBackend.connections.subscribe(c => connection = c);
      service.delete({
        _id: '42',
        timesheetRid: '1138'
      }).subscribe(res => result = res);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200
      })));
      expect(result).toBeUndefined();
    });
  });
});

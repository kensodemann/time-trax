/* tslint:disable:no-unused-variable */

import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { TaskTimerService } from './taskTimer.service';
import { environment } from '../../../../environments/environment';

describe('TaskTimerService', () => {
  let service;

  let http;
  let mockBackend;

  beforeEach(() => {
    let opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    http = new Http(mockBackend, opt);

    service = new TaskTimerService(http);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('get all for timesheet', () => {
    it('sends a request to get all task timers for the timesheet', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.getAllForTimesheet('1138');
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('returns timers via an observable', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getAllForTimesheet('1138').subscribe(res => result = res);
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
      expect(result).toEqual([{
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
      }]);
    });

    it('caches the timers', () => {
      let connection: MockConnection;
      let connectionCount = 0;
      mockBackend.connections.subscribe((c) => {
        connection = c;
        connectionCount++;
      });

      let result;
      service.getAllForTimesheet('1138').subscribe(res => result = res);
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
        service.getAllForTimesheet('1138').subscribe(res => result = res);
      }

      expect(connectionCount).toEqual(1);
      expect(result).toEqual([{
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
      }]);

      service.getAllForTimesheet('7342');
      expect(connectionCount).toEqual(2);
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/7342/taskTimers`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });
  });

  describe('start', () => {
    it('sends a request to start the given timer', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.getAllForTimesheet('1138').subscribe();
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

      service.getAllForTimesheet('1138').subscribe();
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
      expect(result).toEqual({
        _id: '42',
        timesheetRid: '1138',
        startTime: 1194950,
        isActive: true
      });
    });

    it('stops other started timers before starting the timer', () => {
      let connection: MockConnection;
      let connections: Array<MockConnection> = [];
      mockBackend.connections.subscribe(c => {
        connection = c;
        connections.push(c);
      });

      service.getAllForTimesheet('1138').subscribe();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          timesheetRid: '1138',
          workDate: '2016-11-30'
        }, {
          _id: '73',
          timesheetRid: '1138',
          workDate: '2016-12-01',
          isActive: true
        }, {
          _id: '134159',
          timesheetRid: '1138',
          workDate: '2016-12-01'
        }, {
          _id: '320',
          timesheetRid: '1138',
          workDate: '2016-12-03'
        }, {
          _id: '531',
          timesheetRid: '1138',
          workDate: '2016-12-02',
          isActive: true
        }, {
          _id: '705',
          timesheetRid: '1138',
          workDate: '2016-12-01'
        }]
      })));
      connections = [];

      let result;
      service.start({
        _id: '42',
        timesheetRid: '1138'
      }).subscribe(res => result = res);
      expect(connections.length).toEqual(2);
      expect(connections[0].request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers/73/stop`);
      expect(connections[0].request.method).toEqual(RequestMethod.Post);
      expect(connections[1].request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers/531/stop`);
      expect(connections[1].request.method).toEqual(RequestMethod.Post);

      connections[0].mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '73',
          timesheetRid: '1138',
          workDate: '2016-12-01',
          isActive: false
        }
      })));
      expect(connections.length).toEqual(2);
      connections[1].mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '531',
          timesheetRid: '1138',
          workDate: '2016-12-02',
          isActive: false
        }
      })));
      expect(connections.length).toEqual(3);
      expect(connections[2].request.url).toEqual(`${environment.dataService}/timesheets/1138/taskTimers/42/start`);
      expect(connections[2].request.method).toEqual(RequestMethod.Post);

      connections[2].mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          timesheetRid: '1138',
          startTime: 1194950,
          isActive: true
        }
      })));
      expect(result).toEqual({
        _id: '42',
        timesheetRid: '1138',
        startTime: 1194950,
        isActive: true
      });
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
      expect(result).toEqual({
        _id: '42',
        timesheetRid: '1138',
        milliseconds: 199503,
        isActive: false
      });
    });
  });
});

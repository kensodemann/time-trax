/* tslint:disable:no-unused-variable */

import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { TimesheetService } from './timesheet.service';
import { DateService } from '../../../shared/date/date.service';
import { environment } from '../../../../environments/environment';

describe('TimesheetService', () => {
  let service;

  let mockBackend;

  beforeEach(() => {
    let opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    let http = new Http(mockBackend, opt);
    let dates = new DateService();

    service = new TimesheetService(http, dates);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('gets all of the timesheets', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.getAll();
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('returns the data from the response', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getAll().subscribe((res) => { result = res; });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          endDate: '2016-11-30',
          userRid: 'me'
        }, {
          _id: '314',
          endDate: '2016-12-06',
          userRid: 'me'
        }]
      })));
      expect(result).toEqual([{
        _id: '42',
        endDate: '2016-11-30',
        userRid: 'me'
      }, {
        _id: '314',
        endDate: '2016-12-06',
        userRid: 'me'
      }]);
    });
  });

  describe('get', () => {
    it('gets the specified timesheet', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.get('314159');
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/314159`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('returns the data from the response', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.get('42').subscribe((res) => { result = res; });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          endDate: '2016-11-30',
          userRid: 'me'
        }
      })));
      expect(result).toEqual({
        _id: '42',
        endDate: '2016-11-30',
        userRid: 'me'
      });
    });
  });

  describe('getCurrent', () => {
    beforeEach(() => {
      jasmine.clock().mockDate(new Date(2016, 11, 21));
    });

    it('gets the timesheet for the current week ending date', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.getCurrent();
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets?endDate=2016-12-24`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('returns the data from the response', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getCurrent().subscribe((res) => { result = res; });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          endDate: '2016-12-24',
          userRid: 'me'
        }
      })));
      expect(result).toEqual({
        _id: '42',
        endDate: '2016-12-24',
        userRid: 'me'
      });
    });

    it('returns a newly created timesheet if one did not exist for the current week', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getCurrent().subscribe(
        (res) => { result = res; }
      );
      let response = new Response(new ResponseOptions({
        status: 404
      }));
      connection.mockError(response as any as Error);
      expect(result).toEqual({
        endDate: '2016-12-24'
      });
    });

    it('re-throws non-404 errors', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      let err;
      service.getCurrent().subscribe(
        (res) => { result = res; },
        (e) => { err = e; }
      );
      let response = new Response(new ResponseOptions({
        status: 400
      }));
      connection.mockError(response as any as Error);
      expect(result).toBeUndefined();
      expect(err.status).toEqual(400);
    });
  });

  describe('save', () => {
    it('posts using the _id if one is present', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.post({
        _id: '42',
        endDate: '2016-12-24',
        userRid: 'me'
      });
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets/42`);
      expect(connection.request.json()).toEqual({
        _id: '42',
        endDate: '2016-12-24',
        userRid: 'me'
      });
      expect(connection.request.method).toEqual(RequestMethod.Post);
    });

    it('posts without the _id if it is not present', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.post({
        endDate: '2016-12-24',
        userRid: 'me'
      });
      expect(connection.request.url).toEqual(`${environment.dataService}/timesheets`);
      expect(connection.request.json()).toEqual({
        endDate: '2016-12-24',
        userRid: 'me'
      });
      expect(connection.request.method).toEqual(RequestMethod.Post);
    });

    it('returns the result of the post', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.post({
        endDate: '2016-12-24',
        userRid: 'me'
      }).subscribe(res => result = res);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '73',
          endDate: '2016-12-24',
          userRid: 'me'
        }
      })));
      expect(result).toEqual({
        _id: '73',
        endDate: '2016-12-24',
        userRid: 'me'
      });
    });
  });
});

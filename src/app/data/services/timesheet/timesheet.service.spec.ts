/* tslint:disable:no-unused-variable */

import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Timesheet } from '../../models/timesheet';
import { TimesheetService } from './timesheet.service';
import { DateService } from '../../../shared/services/date/date.service';
import { environment } from '../../../../environments/environment';

describe('TimesheetService', () => {
  let service;
  let mockBackend;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);
    const dates = new DateService();

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
      expect(result).toEqual([new Timesheet({
        _id: '42',
        endDate: '2016-11-30',
        userRid: 'me'
      }), new Timesheet({
        _id: '314',
        endDate: '2016-12-06',
        userRid: 'me'
      })]);
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
      expect(result).toEqual(new Timesheet({
        _id: '42',
        endDate: '2016-11-30',
        userRid: 'me'
      }));
    });
  });

  describe('getCurrent', () => {
    beforeEach(() => {
      jasmine.clock().mockDate(new Date(2016, 11, 21));
    });

    afterEach(() => {
      jasmine.clock().uninstall();
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
        body: [{
          _id: '42',
          endDate: '2016-12-24',
          userRid: 'me'
        }]
      })));
      expect(result).toEqual(new Timesheet({
        _id: '42',
        endDate: '2016-12-24',
        userRid: 'me'
      }));
    });

    it('returns undefined if there is no current timesheet', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getCurrent().subscribe((res) => { result = res; });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: []
      })));
      expect(result).toBeUndefined();
    });
  });

  describe('save', () => {
    it('posts using the _id if one is present', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.save({
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

      service.save({
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
      service.save({
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
      expect(result).toEqual(new Timesheet({
        _id: '73',
        endDate: '2016-12-24',
        userRid: 'me'
      }));
    });
  });
});

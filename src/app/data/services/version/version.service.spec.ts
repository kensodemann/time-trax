import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import * as moment from 'moment';

import { Version } from '../../models/version';
import { VersionService } from './version.service';
import { environment } from '../../../../environments/environment';

describe('TimesheetService', () => {
  let service;

  let mockBackend;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);

    service = new VersionService(http);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('gets version information from the data service', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.get();
      expect(connection.request.url).toEqual(`${environment.dataService}/versions`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('reads the client version informtion after the server information is obtained', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      service.get().subscribe();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{ id: '2.0.4', name: 'Misty (2.0.4)', releaseDate: '2016-07-15' }]
      })));
      expect(connection.request.url).toEqual('assets/version.json');
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('returns the server version string', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result: Version;
      service.get().subscribe((res) => { result = res; });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{ id: '2.0.4', name: 'Misty (2.0.4)', releaseDate: '2016-07-15' },
        { id: '2.0.3', name: 'Zoey (2.0.3)', releaseDate: '2016-05-21' },
        { id: '2.0.2', name: 'Oliver (2.0.2)', releaseDate: '2016-05-04' },
        { id: '2.0.1', name: 'Lilly (2.0.1)', releaseDate: '2015-11-26' },
        { id: '2.0.0', name: 'BETA (2.0.0)', releaseDate: '2015-11-22' }]
      })));
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          id: '1.2.0',
          name: 'rusty nail',
          date: '2017-05-10'
        }
      })));
      expect(result.server).toEqual('Misty (2.0.4)');
    });

    it('adds a client version string', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result: Version;
      service.get().subscribe((res) => { result = res; });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{ id: '2.0.4', name: 'Misty (2.0.4)', releaseDate: '2016-07-15' }]
      })));
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          id: '1.2.0',
          name: 'rusty nail',
          date: '2017-05-10'
        }
      })));
      expect(result.client).toEqual('1.2.0 (rusty nail)');
    });

    it('add a client release date', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result: Version;
      service.get().subscribe((res) => { result = res; });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{ id: '2.0.4', name: 'Misty (2.0.4)', releaseDate: '2016-07-15' }]
      })));
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          id: '1.2.0',
          name: 'rusty nail',
          date: '2017-05-10'
        }
      })));
      expect(result.releaseDate).toEqual(moment('2017-05-10'));
    });
  });
});

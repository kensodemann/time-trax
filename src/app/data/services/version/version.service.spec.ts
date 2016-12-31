/* tslint:disable:no-unused-variable */

import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Version } from '../../models/version';
import { VersionService } from './version.service';
import { environment } from '../../../../environments/environment';

describe('TimesheetService', () => {
  let service;

  let mockBackend;

  beforeEach(() => {
    let opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    let http = new Http(mockBackend, opt);

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
      expect(result.client).toBeTruthy();
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
      expect(result.releaseDate).toBeTruthy();
    });
  });
});

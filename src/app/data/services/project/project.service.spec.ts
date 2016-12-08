/* tslint:disable:no-unused-variable */

import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ProjectService } from './project.service';
import { environment } from '../../../../environments/environment';

describe('ProjectService', () => {
  let service;

  let http;
  let mockBackend;

  beforeEach(() => {
    let opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    http = new Http(mockBackend, opt);

    service = new ProjectService(http);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('gets all of the projects', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getAll().subscribe((res) => { result = res; });
      expect(connection.request.url).toEqual(`${environment.dataService}/projects`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          name: 'Deep Thought'
        }, {
          _id: '1138',
          name: 'Thad Harvey Xaviar'
        }]
      })));
      expect(result).toEqual([{
        _id: '42',
        name: 'Deep Thought'
      }, {
        _id: '1138',
        name: 'Thad Harvey Xaviar'
      }]);
    });
  });
});

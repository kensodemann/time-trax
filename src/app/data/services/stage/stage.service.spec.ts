import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Stage } from '../../models/stage';
import { StageService } from './stage.service';
import { environment } from '../../../../environments/environment';

describe('StageService', () => {
  let service;
  let mockBackend;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);

    service = new StageService(http);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('gets all of the stages', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.getAll().subscribe(res => result = res);
      expect(connection.request.url).toEqual(`${environment.dataService}/stages`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          stageNumber: 1,
          name: 'Deep Thought'
        }, {
          _id: '1138',
          stageNumber: 2,
          name: 'Drackonian Crackdown'
        }, {
          _id: '314159',
          stageNumber: 3,
          name: 'Eat Pie'
        }]
      })));
      expect(result).toEqual([new Stage({
        _id: '42',
        stageNumber: 1,
        name: 'Deep Thought'
      }), new Stage({
        _id: '1138',
        stageNumber: 2,
        name: 'Drackonian Crackdown'
      }), new Stage({
        _id: '314159',
        stageNumber: 3,
        name: 'Eat Pie'
      })]);
    });

    it('caches the result so stages are not fetched more than once', () => {
      let connection: MockConnection;
      let connectionCount = 0;
      mockBackend.connections.subscribe((c) => {
        connection = c;
        connectionCount++;
      });

      let result;

      service.getAll();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: [{
          _id: '42',
          stageNumber: 1,
          name: 'Deep Thought'
        }, {
          _id: '1138',
          stageNumber: 2,
          name: 'Drackonian Crackdown'
        }, {
          _id: '314159',
          stageNumber: 3,
          name: 'Eat Pie'
        }]
      })));

      for (let x = 0; x < 100; x++) {
        service.getAll().subscribe(res => result = res);
      }

      expect(connectionCount).toEqual(1);
      expect(result).toEqual([new Stage({
        _id: '42',
        stageNumber: 1,
        name: 'Deep Thought'
      }), new Stage({
        _id: '1138',
        stageNumber: 2,
        name: 'Drackonian Crackdown'
      }), new Stage({
        _id: '314159',
        stageNumber: 3,
        name: 'Eat Pie'
      })]);
    });
  });
});

/* tslint:disable:no-unused-variable */

import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Project } from '../../models/project';
import { ProjectService } from './project.service';
import { environment } from '../../../../environments/environment';

describe('ProjectService', () => {
  let service;
  let mockBackend;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);

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

  describe('get', () => {
    it('gets the specified project', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.get('42731138').subscribe((res) => { result = res; });
      expect(connection.request.url).toEqual(`${environment.dataService}/projects/42731138`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42731138',
          name: 'Deep Geeky Thoughts About Total Control'
        }
      })));
      expect(result).toEqual({
        _id: '42731138',
        name: 'Deep Geeky Thoughts About Total Control'
      });
    });

    it('throws an exception if called without an id', function() {
      expect(function() { service.get(); }).toThrowError('ProjectService.get() called without id');
    });
  });

  describe('save', () => {
    it('posts new projects', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      const prj = new Project();
      prj.name = 'Butthead';
      prj.jiraTaskId = 'BB-2203';
      prj.sbvbTaskId = 'RFP004995';

      let result;
      service.save(prj).subscribe((res) => { result = res; });

      expect(connection.request.url).toEqual(`${environment.dataService}/projects`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '113842314159',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995',
          status: 'active'
        }
      })));
      expect(result).toEqual({
        _id: '113842314159',
        name: 'Butthead',
        jiraTaskId: 'BB-2203',
        sbvbTaskId: 'RFP004995',
        status: 'active'
      });
    });

    it('posts existing projects', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      const prj = new Project();
      prj._id = '11383141594273';
      prj.name = 'Butthead';
      prj.jiraTaskId = 'BB-2203';
      prj.sbvbTaskId = 'RFP004995';

      let result;
      service.save(prj).subscribe((res) => { result = res; });

      expect(connection.request.url).toEqual(`${environment.dataService}/projects/11383141594273`);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '11383141594273',
          name: 'Butthead',
          jiraTaskId: 'BB-2203',
          sbvbTaskId: 'RFP004995',
          status: 'active'
        }
      })));
      expect(result).toEqual({
        _id: '11383141594273',
        name: 'Butthead',
        jiraTaskId: 'BB-2203',
        sbvbTaskId: 'RFP004995',
        status: 'active'
      });
    });
  });
});

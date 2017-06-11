import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { environment } from '../../../environments/environment';
import { IdentityService } from './identity.service';
import { User } from '../../data/models/user';

describe('IdentityService', () => {
  let service;
  let mockBackend;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);

    service = new IdentityService(http);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('gets the current user', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);

      let result;
      service.get().subscribe((res) => { result = res; });
      expect(connection.request.url).toEqual(`${environment.dataService}/currentUser`);
      expect(connection.request.method).toEqual(RequestMethod.Get);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          firstName: 'Deep',
          lastName: 'Thought',
          username: 'dadams',
          isDefaultAdmin: false,
          roles: ['user']
        }
      })));
      expect(result).toEqual(new User({
        _id: '42',
        firstName: 'Deep',
        lastName: 'Thought',
        username: 'dadams',
        isDefaultAdmin: false,
        roles: ['user']
      }));
    });

    it('caches the user', () => {
      let connection: MockConnection;
      let connectionCount = 0;
      mockBackend.connections.subscribe((c) => {
        connection = c;
        connectionCount++;
      });

      let result;

      service.get();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          firstName: 'Deep',
          lastName: 'Thought',
          username: 'dadams',
          isDefaultAdmin: false,
          roles: ['user']
        }
      })));

      for (let x = 0; x < 100; x++) {
        service.get().subscribe(res => result = res);
      }

      expect(connectionCount).toEqual(1);
      expect(result).toEqual(new User({
        _id: '42',
        firstName: 'Deep',
        lastName: 'Thought',
        username: 'dadams',
        isDefaultAdmin: false,
        roles: ['user']
      }));
    });
  });

  describe('clear', () => {
    it('causes the user to be fetched again', () => {
      let connection: MockConnection;
      let connectionCount = 0;
      mockBackend.connections.subscribe((c) => {
        connection = c;
        connectionCount++;
      });

      let result;

      service.get();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          firstName: 'Deep',
          lastName: 'Thought',
          username: 'dadams',
          isDefaultAdmin: false,
          roles: ['user']
        }
      })));

      for (let x = 0; x < 100; x++) {
        service.get().subscribe(res => result = res);
      }

      expect(connectionCount).toEqual(1);

      service.clear();
      service.get().subscribe(res => result = res);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '73',
          firstName: 'Sheldon',
          lastName: 'Cooper',
          username: 'physix',
          isDefaultAdmin: true,
          roles: ['flash', 'professor', 'PITA']
        }
      })));

      expect(connectionCount).toEqual(2);
      expect(result).toEqual(new User({
        _id: '73',
        firstName: 'Sheldon',
        lastName: 'Cooper',
        username: 'physix',
        isDefaultAdmin: true,
        roles: ['flash', 'professor', 'PITA']
      }));
    });
  });

  describe('changed', () => {
    it('fires when the user changes', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      let identityChanges = 0;
      service.changed.subscribe(c => identityChanges++);

      service.get().subscribe((res) => { });
      expect(identityChanges).toEqual(0);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '42',
          firstName: 'Deep',
          lastName: 'Thought',
          username: 'dadams',
          isDefaultAdmin: false,
          roles: ['user']
        }
      })));
      expect(identityChanges).toEqual(1);

      for (let x = 0; x < 100; x++) {
        service.get().subscribe(res => { });
      }
      expect(identityChanges).toEqual(1);

      service.clear();
      expect(identityChanges).toEqual(2);

      service.get().subscribe((res) => { });
      expect(identityChanges).toEqual(2);
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          _id: '73',
          firstName: 'Less',
          lastName: 'Lesterman',
          username: 'lll',
          isDefaultAdmin: false,
          roles: ['user', 'admin']
        }
      })));
      expect(identityChanges).toEqual(3);
    });
  });
});

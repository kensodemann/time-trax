/* tslint:disable:no-unused-variable */

import { RequestMethod, BaseRequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationTokenService } from './authentication-token.service';
import { TimeTraxHttpService } from './time-trax-http.service';

describe('TimeTraxHttpService', () => {
  let token: string;
  let tokenService;
  let mockBackend;
  let mockRouter;
  let service;

  beforeEach(() => {
    token = null;
    tokenService = {
      get(): string { return token; }
    };
    let opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    mockRouter = {
      navigate() { }
    };
    service = new TimeTraxHttpService(mockBackend, opt, tokenService as AuthenticationTokenService, mockRouter as Router);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('sends a get request', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.get('http://test.dr.who/companions');
      expect(connection.request.url).toEqual('http://test.dr.who/companions');
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('does not add an Authorization header if there no token', () => {
      let connection: MockConnection;
      token = null;

      mockBackend.connections.subscribe(c => connection = c);
      service.get('http://test.dr.who/companions');
      expect(connection.request.headers.get('Authorization')).toBeNull();
    });

    it('adds an Authorization header if there is a token', () => {
      let connection: MockConnection;
      token = 'IAmABigFatToken';

      mockBackend.connections.subscribe(c => connection = c);
      service.get('http://test.dr.who/companions');
      expect(connection.request.headers.get('Authorization')).toEqual('Bearer IAmABigFatToken');
    });
  });

  describe('post', () => {
    it('sends a post request', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.post('http://test.dr.who/companions', { name: 'Rose Tyler' });
      expect(connection.request.url).toEqual('http://test.dr.who/companions');
      expect(connection.request.method).toEqual(RequestMethod.Post);
    });

    it('adds a content-type header', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.post();
      service.post('http://test.dr.who/companions', { name: 'Rose Tyler' });
      expect(connection.request.headers.get('content-type')).toEqual('application/json; charset=utf-8');
    });

    it('does not add an Authorization header if there no token', () => {
      let connection: MockConnection;
      token = null;

      mockBackend.connections.subscribe(c => connection = c);
      service.post('http://test.dr.who/companions', { name: 'Rose Tyler' });
      expect(connection.request.headers.get('Authorization')).toBeNull();
    });

    it('adds an Authorization header if there is a token', () => {
      let connection: MockConnection;
      token = 'IAmABigFatToken';

      mockBackend.connections.subscribe(c => connection = c);
      service.post('http://test.dr.who/companions', { name: 'Rose Tyler' });
      expect(connection.request.headers.get('Authorization')).toEqual('Bearer IAmABigFatToken');
    });
  });

  describe('delete', () => {
    it('sends a delete request', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.delete('http://test.dr.who/companions/73');
      expect(connection.request.url).toEqual('http://test.dr.who/companions/73');
      expect(connection.request.method).toEqual(RequestMethod.Delete);
    });

    it('does add an Authorization header if there no token', () => {
      let connection: MockConnection;
      token = null;

      mockBackend.connections.subscribe(c => connection = c);
      service.delete('http://test.dr.who/companions/73');
      expect(connection.request.headers.get('Authorization')).toBeNull();
    });

    it('adds an Authorization header if there is a token', () => {
      let connection: MockConnection;
      token = 'IAmABigFatToken';

      mockBackend.connections.subscribe(c => connection = c);
      service.delete('http://test.dr.who/companions/73');
      expect(connection.request.headers.get('Authorization')).toEqual('Bearer IAmABigFatToken');
    });
  });

  describe('put', () => {
    it('sends a put request', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.put('http://test.dr.who/companions/42', { id: '42', name: 'Amy Pond' });
      expect(connection.request.url).toEqual('http://test.dr.who/companions/42');
      expect(connection.request.method).toEqual(RequestMethod.Put);
    });

    it('does not add an Authorization header if there no token', () => {
      let connection: MockConnection;
      token = null;

      mockBackend.connections.subscribe(c => connection = c);
      service.put('http://test.dr.who/companions/42', { id: '42', name: 'Amy Pond' });
      expect(connection.request.headers.get('Authorization')).toBeNull();
    });

    it('adds an Authorization header if there is a token', () => {
      let connection: MockConnection;
      token = 'IAmABigFatToken';

      mockBackend.connections.subscribe(c => connection = c);
      service.put('http://test.dr.who/companions/42', { id: '42', name: 'Amy Pond' });
      expect(connection.request.headers.get('Authorization')).toEqual('Bearer IAmABigFatToken');
    });
  });
});

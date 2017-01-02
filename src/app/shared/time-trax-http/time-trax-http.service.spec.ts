/* tslint:disable:no-unused-variable */

import { RequestMethod, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationTokenService } from '../authentication-token/authentication-token.service';
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

    it('redirects to login on a 401 error', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      service.get('http://test.dr.who/companions').subscribe();
      let response = new Response(new ResponseOptions({
        status: 401
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['authentication', 'login']);
    });

    it('rethrows non 401 errors', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      let err;
      service.get('http://test.dr.who/companions')
        .subscribe(() => { }, (e) => { err = e; });

      let response = new Response(new ResponseOptions({
        status: 400,
        body: {
          reason: 'I do not like to do things for you'
        }
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(err.status).toEqual(400);
      expect(err._body.reason).toEqual('I do not like to do things for you');
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
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
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

    it('redirects to login on a 401 error', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      service.post('http://test.dr.who/companions', { name: 'Rose Tyler' }).subscribe();
      let response = new Response(new ResponseOptions({
        status: 401
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['authentication', 'login']);
    });

    it('rethrows non 401 errors', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      let err;
      service.post('http://test.dr.who/companions', { name: 'Rose Tyler' })
        .subscribe(() => { }, (e) => { err = e; });

      let response = new Response(new ResponseOptions({
        status: 400,
        body: {
          reason: 'I do not like to do things for you'
        }
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(err.status).toEqual(400);
      expect(err._body.reason).toEqual('I do not like to do things for you');
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

    it('redirects to login on a 401 error', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      service.delete('http://test.dr.who/companions/73').subscribe();
      let response = new Response(new ResponseOptions({
        status: 401
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['authentication', 'login']);
    });

    it('rethrows non 401 errors', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      let err;
      service.delete('http://test.dr.who/companions/73')
        .subscribe(() => { }, (e) => { err = e; });

      let response = new Response(new ResponseOptions({
        status: 400,
        body: {
          reason: 'I do not like to do things for you'
        }
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(err.status).toEqual(400);
      expect(err._body.reason).toEqual('I do not like to do things for you');
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

    it('redirects to login on a 401 error', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      service.put('http://test.dr.who/companions/42', { id: '42', name: 'Amy Pond' }).subscribe();
      let response = new Response(new ResponseOptions({
        status: 401
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['authentication', 'login']);
    });

    it('rethrows non 401 errors', () => {
      let connection: MockConnection;
      token = null;

      spyOn(mockRouter, 'navigate');
      mockBackend.connections.subscribe(c => connection = c);
      let err;
      service.put('http://test.dr.who/companions/42', { id: '42', name: 'Amy Pond' })
        .subscribe(() => { }, (e) => { err = e; });

      let response = new Response(new ResponseOptions({
        status: 400,
        body: {
          reason: 'I do not like to do things for you'
        }
      }));
      connection.mockError(response as any as Error);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(err.status).toEqual(400);
      expect(err._body.reason).toEqual('I do not like to do things for you');
    });
  });
});

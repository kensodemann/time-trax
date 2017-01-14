/* tslint:disable:no-unused-variable */

import { ViewContainerRef } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ErrorMessageService } from './error-message.service';

class MessageDialogStub {
  error(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

describe('ErrorMessageService', () => {
  let dialog;
  let service;
  beforeEach(() => {
    dialog = new MessageDialogStub();
    service = new ErrorMessageService(dialog);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('getMessage', () => {
    it('returns the reason from the body if there is one', () => {
      const opt = new ResponseOptions({
        body: JSON.stringify({
          reason: 'Because you suck eggs'
        }),
        status: 400,
        statusText: 'Errors Gone Wild!'
      });
      const res = new Response(opt);
      expect(service.getMessage(res)).toEqual('Because you suck eggs');
    });

    it('returns the statusText if there is no reason in the body', () => {
      const opt = new ResponseOptions({
        body: JSON.stringify({
          fooBar: 'Because you suck eggs'
        }),
        status: 400,
        statusText: 'Errors Gone Wild!'
      });
      const res = new Response(opt);
      expect(service.getMessage(res)).toEqual('Errors Gone Wild!');
    });

    it('returns "Unknown Error" if there is no reason and no statusText', () => {
      const opt = new ResponseOptions({
        status: 400,
        body: {}
      });
      const res = new Response(opt);
      expect(service.getMessage(res)).toEqual('Unknown Error');
    });
  });

  describe('show', () => {
    it('shows the error in a message dialog', () => {
      const vcr = {
        name: 'I am a view container ref (fake)'
      };

      const opt = new ResponseOptions({
        body: JSON.stringify({
          reason: 'Because you suck eggs'
        }),
        status: 400,
        statusText: 'Errors Gone Wild!'
      });
      const res = new Response(opt);

      spyOn(dialog, 'error');

      service.show(res, vcr);
      expect(dialog.error).toHaveBeenCalledTimes(1);
    });

    it('returns the Observable of the message dialog', () => {
      const vcr = {
        name: 'I am a view container ref (fake)'
      };

      const opt = new ResponseOptions({
        body: JSON.stringify({
          reason: 'Because you suck eggs'
        }),
        status: 400,
        statusText: 'Errors Gone Wild!'
      });
      const res = new Response(opt);

      spyOn(dialog, 'error').and.returnValue(Observable.of('Toast'));

      let result: string;
      service.show(res, vcr).subscribe(r => result = r);
      expect(result).toEqual('Toast');
    });
  });
});

/* tslint:disable:no-unused-variable */

import { ViewContainerRef } from '@angular/core';
import { MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MessageDialogService } from './message-dialog.service';

class DialogStub {
  Component: any;
  componentInstance: ErrorDialogComponent;
  config: MdDialogConfig;
  ref: MdDialogRef<ErrorDialogComponent>;

  constructor() {
    this.ref = new MdDialogRef<ErrorDialogComponent>(null);
  }

  open(Component: any, config: MdDialogConfig): MdDialogRef<ErrorDialogComponent> {
    this.Component = Component;
    this.config = config;

    this.componentInstance = new Component();
    this.ref.componentInstance = this.componentInstance;
    return this.ref;
  }
};

describe('MessageDialogService', () => {
  let dialog;
  let service;
  beforeEach(() => {
    dialog = new DialogStub();
    service = new MessageDialogService(dialog);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('error dialog', () => {
    it('opens the dialog', () => {
      let vcr = { name: 'I am a view component ref' };
      service.error('title', 'message', vcr);
      expect(dialog.Component).toEqual(ErrorDialogComponent);
      expect(dialog.config.viewContainerRef).toEqual(vcr);
    });

    it('sets the title', () => {
      service.error('title', 'message', null);
      expect(dialog.componentInstance.title).toEqual('title');
    });

    it('sets the message', () => {
      service.error('title', 'message', null);
      expect(dialog.componentInstance.message).toEqual('message');
    });

    it('returns the after closed observable', () => {
      spyOn(dialog.ref, 'afterClosed').and.returnValue(Observable.of('toast'));
      let result: string;
      service.error('title', 'message', null).subscribe(res => result = res);
      expect(result).toEqual('toast');
    });
  });
});

/* tslint:disable:no-unused-variable */

import { MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorDialogComponent } from './error-dialog.component';
import { ErrorDialogService } from './error-dialog.service';

class DialogStub {
  Component: any;
  componentInstance: ErrorDialogComponent;
  config: MdDialogConfig;
  ref: MdDialogRef<ErrorDialogComponent>;

  constructor() {
    this.ref = new MdDialogRef<ErrorDialogComponent>(null, null);
  }

  open(Component: any, config: MdDialogConfig): MdDialogRef<ErrorDialogComponent> {
    this.Component = Component;
    this.config = config;

    this.componentInstance = new Component();
    this.ref.componentInstance = this.componentInstance;
    return this.ref;
  }
};

describe('Service: Error Dialog', () => {
  let dialog;
  let errorDialog;
  beforeEach(() => {
    dialog = new DialogStub();
    errorDialog = new ErrorDialogService(dialog);
  });

  it('exists', () => {
    expect(errorDialog).toBeTruthy();
  });

  describe('open', () => {
    it('opens the dialog', () => {
      const vcr = { name: 'I am a view component ref' };
      errorDialog.open('title', 'message', vcr);
      expect(dialog.Component).toEqual(ErrorDialogComponent);
      expect(dialog.config.viewContainerRef).toEqual(vcr);
    });

    it('sets the title', () => {
      errorDialog.open('title', 'message', null);
      expect(dialog.componentInstance.title).toEqual('title');
    });

    it('sets the message', () => {
      errorDialog.open('title', 'message', null);
      expect(dialog.componentInstance.message).toEqual('message');
    });

    it('returns the after closed observable', () => {
      spyOn(dialog.ref, 'afterClosed').and.returnValue(Observable.of('toast'));
      let result: string;
      errorDialog.open('title', 'message', null).subscribe(res => result = res);
      expect(result).toEqual('toast');
    });
  });
});

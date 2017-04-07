import { MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AskDialogComponent } from './ask-dialog.component';
import { AskDialogService } from './ask-dialog.service';

class DialogStub {
  Component: any;
  componentInstance: AskDialogComponent;
  config: MdDialogConfig;
  ref: MdDialogRef<AskDialogComponent>;

  constructor() {
    this.ref = new MdDialogRef<AskDialogComponent>(null, null);
  }

  open(Component: any, config: MdDialogConfig): MdDialogRef<AskDialogComponent> {
    this.Component = Component;
    this.config = config;

    this.componentInstance = new Component();
    this.ref.componentInstance = this.componentInstance;
    return this.ref;
  }
};

describe('Service: AskDialog', () => {
  let dialog;
  let askDialog;
  beforeEach(() => {
    dialog = new DialogStub();
    askDialog = new AskDialogService(dialog);
  });

  it('exists', () => {
    expect(askDialog).toBeTruthy();
  });

  describe('open', () => {
    it('opens the dialog', () => {
      const vcr = { name: 'I am a view component ref' };
      askDialog.open('title', 'message', vcr);
      expect(dialog.Component).toEqual(AskDialogComponent);
      expect(dialog.config.viewContainerRef).toEqual(vcr);
    });

    it('sets the title', () => {
      askDialog.open('title', 'message', null);
      expect(dialog.componentInstance.title).toEqual('title');
    });

    it('sets the message', () => {
      askDialog.open('title', 'message', null);
      expect(dialog.componentInstance.message).toEqual('message');
    });

    it('returns the after closed observable', () => {
      spyOn(dialog.ref, 'afterClosed').and.returnValue(Observable.of('toast'));
      let result: string;
      askDialog.open('title', 'message', null).subscribe(res => result = res);
      expect(result).toEqual('toast');
    });
  });
});

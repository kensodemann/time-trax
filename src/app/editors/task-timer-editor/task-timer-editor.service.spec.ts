/* tslint:disable:no-unused-variable */

import { MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { TaskTimer } from '../../data/models/task-timer';
import { TaskTimerEditorComponent } from './task-timer-editor.component';
import { TaskTimerEditorService } from './task-timer-editor.service';

class DialogStub {
  Component: any;
  componentInstance: TaskTimerEditorComponent;
  config: MdDialogConfig;
  ref: MdDialogRef<TaskTimerEditorComponent>;

  constructor() {
    this.ref = new MdDialogRef<TaskTimerEditorComponent>(null, null);
  }

  open(Component: any, config: MdDialogConfig): MdDialogRef<TaskTimerEditorComponent> {
    this.Component = Component;
    this.config = config;

    this.componentInstance = new Component();
    this.ref.componentInstance = this.componentInstance;
    return this.ref;
  }
};

describe('TaskTimerEditorService', () => {
  let dialog;
  let service: TaskTimerEditorService;
  beforeEach(() => {
    dialog = new DialogStub();
    service = new TaskTimerEditorService(dialog);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('open', () => {
    let tt: TaskTimer;
    beforeEach(() => {
      tt = new TaskTimer('42', '2017-01-16');
    });

    it('opens the dialog', () => {
      const vcr = {
        name: 'I am a view component ref',
        element: null,
        injector: null,
        parentInjector: null,
        clear: null,
        get: null,
        length: null,
        createEmbeddedView: null,
        createComponent: null,
        insert: null,
        move: null,
        indexOf: null,
        remove: null,
        detach: null
      };
      service.open(tt, vcr);
      expect(dialog.Component).toEqual(TaskTimerEditorComponent);
      expect(dialog.config.viewContainerRef).toEqual(vcr);
    });

    it('sets the title and button label for a new project', () => {
      tt._id = undefined;
      service.open(tt, null);
      expect(dialog.componentInstance.title).toEqual('New Task');
      expect(dialog.componentInstance.buttonLabel).toEqual('Create');
    });

    it('sets the title and button label for editing an existing project', () => {
      tt._id = '11384273314159';
      service.open(tt, null);
      expect(dialog.componentInstance.title).toEqual('Modify Task');
      expect(dialog.componentInstance.buttonLabel).toEqual('Done');
    });

    it('returns the after closed observable', () => {
      spyOn(dialog.ref, 'afterClosed').and.returnValue(Observable.of('toast'));
      let result: string;
      service.open(tt, null).subscribe(res => result = res);
      expect(result).toEqual('toast');
    });
  });
});

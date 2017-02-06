import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { TaskTimer } from '../../data/models/task-timer';
import { TaskTimerEditorComponent } from './task-timer-editor.component';

@Injectable()
export class TaskTimerEditorService {

  constructor(private dialog: MdDialog) { }

  open(taskTimer: TaskTimer, viewContainerRef: ViewContainerRef): Observable<any> {
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    config.disableClose = true;

    const dialog = this.dialog.open(TaskTimerEditorComponent, config);

    dialog.componentInstance.initialize(taskTimer);

    return dialog.afterClosed();
  }

}

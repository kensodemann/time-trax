import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable()
export class MessageDialogService {

  constructor(private dialog: MdDialog) { }

  error(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<any> {
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    let dialogRef = this.dialog.open(ErrorDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}

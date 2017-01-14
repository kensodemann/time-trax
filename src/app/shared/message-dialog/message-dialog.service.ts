import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable()
export class MessageDialogService {

  constructor(private dialog: MdDialog) { }

  error(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<any> {
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    const dialogRef = this.dialog.open(ErrorDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}

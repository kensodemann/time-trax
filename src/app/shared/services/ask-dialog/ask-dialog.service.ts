import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AskDialogComponent } from './ask-dialog.component';

@Injectable()
export class AskDialogService {

  constructor(private dialog: MdDialog) { }

  open(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<any> {
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    config.disableClose = true;

    const dialogRef = this.dialog.open(AskDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}

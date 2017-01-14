import { Injectable, ViewContainerRef } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MessageDialogService } from '../message-dialog/message-dialog.service';

@Injectable()
export class ErrorMessageService {

  constructor(private dialog: MessageDialogService) { }

  getMessage(res: Response): string {
    const body = res.json();
    return body.reason || res.statusText || 'Unknown Error';
  }

  show(res: Response, viewContainerRef: ViewContainerRef): Observable<any> {
    const message = this.getMessage(res);
    return this.dialog.error('Error', message, viewContainerRef);
  }

}

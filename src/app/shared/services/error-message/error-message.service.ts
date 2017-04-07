import { Injectable, ViewContainerRef } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable()
export class ErrorMessageService {

  constructor(private dialog: ErrorDialogService) { }

  getMessage(res: Response): string {
    const body = res.json();
    return body.reason || res.statusText || 'Unknown Error';
  }

  show(res: Response, viewContainerRef: ViewContainerRef): Observable<any> {
    const message = this.getMessage(res);
    return this.dialog.open('Error', message, viewContainerRef);
  }

}

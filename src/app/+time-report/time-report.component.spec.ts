import { ViewContainerRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MessageDialogService } from '../shared/message-dialog/message-dialog.service';
import { TimeReportComponent } from './time-report.component';

class MessageDialogStub {
  error(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

describe('Component: Time Report', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeReportComponent
      ],
      providers: [
        { provide: MessageDialogService, useClass: MessageDialogStub }
      ]
    });
  });

  it('builds', async(() => {
    const fixture = TestBed.createComponent(TimeReportComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    const fixture = TestBed.createComponent(TimeReportComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

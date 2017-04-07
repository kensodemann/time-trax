import { ViewContainerRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { AskDialogService } from '../shared/services/ask-dialog/ask-dialog.service';
import { ErrorDialogService } from '../shared/services/error-dialog/error-dialog.service';
import { TimeReportComponent } from './time-report.component';

class DialogStub {
  open(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<any> {
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
        { provide: AskDialogService, useClass: DialogStub },
        { provide: ErrorDialogService, useClass: DialogStub }
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

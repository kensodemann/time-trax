import { TestBed, async } from '@angular/core/testing';
import { TimeReportComponent } from './time-report.component';

describe('Component: Time Report', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeReportComponent
      ],
    });
  });

  it('builds', async(() => {
    let fixture = TestBed.createComponent(TimeReportComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    let fixture = TestBed.createComponent(TimeReportComponent);
    let app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

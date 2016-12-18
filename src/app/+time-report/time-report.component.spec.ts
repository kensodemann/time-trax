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

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(TimeReportComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

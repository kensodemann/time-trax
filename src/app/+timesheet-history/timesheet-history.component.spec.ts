import { TestBed, async } from '@angular/core/testing';
import { TimesheetHistoryComponent } from './timesheet-history.component';

describe('Component: Timesheet History', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimesheetHistoryComponent
      ],
    });
  });

  it('builds', async(() => {
    const fixture = TestBed.createComponent(TimesheetHistoryComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    const fixture = TestBed.createComponent(TimesheetHistoryComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

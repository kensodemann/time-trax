import { TestBed, async } from '@angular/core/testing';
import { TimesheetComponent } from './timesheet.component';

describe('Component: Timesheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimesheetComponent
      ],
    });
  });

  it('builds', async(() => {
    const fixture = TestBed.createComponent(TimesheetComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    const fixture = TestBed.createComponent(TimesheetComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

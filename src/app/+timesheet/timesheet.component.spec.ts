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
    let fixture = TestBed.createComponent(TimesheetComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    let fixture = TestBed.createComponent(TimesheetComponent);
    let app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

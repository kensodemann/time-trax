import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TimesheetHistoryComponent } from './timesheet-history.component';

describe('Component: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimesheetHistoryComponent
      ],
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(TimesheetHistoryComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
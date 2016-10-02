import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TimesheetComponent } from './timesheet.component';

describe('Component: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimesheetComponent
      ],
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(TimesheetComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
import { TestBed, async } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { HoursMinutesPipe } from '../shared/pipes/hours-minutes.pipe';
import { ProjectTitlePipe } from '../shared/pipes/project-title.pipe';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { TimesheetComponent } from './timesheet.component';

describe('Component: Timesheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        HoursMinutesPipe,
        ProjectTitlePipe,
        TaskTimerComponent,
        TimesheetComponent
      ]
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

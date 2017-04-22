import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeListComponent } from './time-list.component';
import { HoursMinutesPipe } from '../../../shared/pipes/hours-minutes.pipe';

describe('TimeListComponent', () => {
  let component: TimeListComponent;
  let fixture: ComponentFixture<TimeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HoursMinutesPipe,
        TimeListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

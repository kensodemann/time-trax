/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MdIconModule } from '@angular/material';

import { HoursMinutesPipe } from '../../shared/pipes/hours-minutes.pipe';
import { ProjectTitlePipe } from '../../shared/pipes/project-title.pipe';
import { TaskTimerComponent } from './task-timer.component';

describe('TaskTimerComponent', () => {
  let component: TaskTimerComponent;
  let fixture: ComponentFixture<TaskTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdIconModule
      ],
      declarations: [
        HoursMinutesPipe,
        ProjectTitlePipe,
        TaskTimerComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

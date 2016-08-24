import {addProviders, ComponentFixture, inject, TestComponentBuilder} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TimesheetComponent } from './timesheet.component';

describe('Component: Timesheet', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([TimesheetComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function(tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([TimesheetComponent],
    (component: TimesheetComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(TimesheetComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(TimesheetComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-timesheet></app-timesheet>
  `,
  directives: [TimesheetComponent]
})
class TimesheetComponentTestController {
}


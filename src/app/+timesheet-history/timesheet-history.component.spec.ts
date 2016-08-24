import { addProviders, ComponentFixture, inject, TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TimesheetHistoryComponent } from './timesheet-history.component';

describe('Component: TimesheetHistory', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([TimesheetHistoryComponent]);
  })

  beforeEach(inject([TestComponentBuilder], function(tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([TimesheetHistoryComponent],
    (component: TimesheetHistoryComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(TimesheetHistoryComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(TimesheetHistoryComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-timesheet-history></app-timesheet-history>
  `,
  directives: [TimesheetHistoryComponent]
})
class TimesheetHistoryComponentTestController {
}


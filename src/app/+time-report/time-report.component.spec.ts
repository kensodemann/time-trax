import {addProviders, ComponentFixture, inject, TestComponentBuilder} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TimeReportComponent } from './time-report.component';

describe('Component: TimeReport', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([TimeReportComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function(tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([TimeReportComponent],
    (component: TimeReportComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(TimeReportComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(TimeReportComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-time-report></app-time-report>
  `,
  directives: [TimeReportComponent]
})
class TimeReportComponentTestController {
}


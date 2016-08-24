import { addProviders, ComponentFixture, inject, TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AboutComponent } from './about.component';

describe('Component: About', () => {
  let builder: TestComponentBuilder;
  
  beforeEach(() => {
    addProviders([AboutComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([AboutComponent],
      (component: AboutComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(AboutComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(AboutComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-about></app-about>
  `,
  directives: [AboutComponent]
})
class AboutComponentTestController {
}


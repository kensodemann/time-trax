import { addProviders, ComponentFixture, inject, TestComponentBuilder} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProjectsComponent } from './projects.component';

describe('Component: Projects', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([ProjectsComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function(tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ProjectsComponent],
    (component: ProjectsComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ProjectsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ProjectsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-projects></app-projects>
  `,
  directives: [ProjectsComponent]
})
class ProjectsComponentTestController {
}


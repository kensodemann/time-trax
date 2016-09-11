import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';

describe('Component: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent
      ],
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(ProjectsComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
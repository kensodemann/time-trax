import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('Component: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ],
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(AboutComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

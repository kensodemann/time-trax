import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';

describe('Component: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogoutComponent
      ],
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(LogoutComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
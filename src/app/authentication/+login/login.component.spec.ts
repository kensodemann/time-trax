import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('Component: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(LoginComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
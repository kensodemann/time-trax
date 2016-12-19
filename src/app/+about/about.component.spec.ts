import { TestBed, async } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('Component: About', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ],
    });
  });

  it('builds', async(() => {
    let fixture = TestBed.createComponent(AboutComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    let fixture = TestBed.createComponent(AboutComponent);
    let app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

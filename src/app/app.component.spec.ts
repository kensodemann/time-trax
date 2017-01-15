/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../testing/router-stubs';
import { AppComponent } from './app.component';

describe('App: TimeTrax', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      imports: [
        MaterialModule.forRoot()
      ]
    });
    TestBed.compileComponents();
  });

  it('builds', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

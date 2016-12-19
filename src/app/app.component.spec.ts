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
  });

  it('builds', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('implements OnInit', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));
});

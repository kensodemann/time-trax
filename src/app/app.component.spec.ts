/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';

import { MaterialModule, MdIconRegistry } from '@angular/material';

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
        MaterialModule
      ],
      providers: [
        MdIconRegistry
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have as title \'time-trax works!\'', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('time-trax works!');
  }));
});

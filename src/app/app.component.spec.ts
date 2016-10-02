/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';

import { MdButtonModule } from '@angular2-material/button';
import { MdCoreModule } from '@angular2-material/core';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

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
        MdButtonModule,
        MdIconModule,
        MdListModule,
        MdSidenavModule,
        MdToolbarModule
      ],
      providers: [MdIconRegistry]
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

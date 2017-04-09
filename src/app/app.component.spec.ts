/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { MdIconModule } from '@angular/material';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../testing/router-stubs';

import { AppComponent } from './app.component';
import { AuthenticationService } from './shared/services/authentication/authentication.service';

class AuthenticationServiceStub {
  scheduleTokenRefresh() { }
};

describe('App: TimeTrax', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      imports: [
        MdIconModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
      ]
    });
    TestBed.compileComponents();
  });

  it('builds', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('OnInit', () => {
    it('sets up the token refresh', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
      spyOn(authenticationService, 'scheduleTokenRefresh');
      app.ngOnInit();
      expect(authenticationService.scheduleTokenRefresh).toHaveBeenCalledTimes(1);
    }));
  });

});

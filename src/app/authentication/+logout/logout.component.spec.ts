import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';

import { AuthenticationService } from '../shared/authentication.service';

describe('Component: Logout', () => {
  beforeEach(() => {
    class AuthenticationServiceStub {
      logout() { }
    };

    class RouterStub {
      navigate() { }
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule
      ],
      declarations: [
        LogoutComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(LogoutComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('logout', () => {
    it('calls the logout function', () => {
      let fixture = TestBed.createComponent(LogoutComponent);
      let app = fixture.debugElement.componentInstance;
      let auth = fixture.debugElement.injector.get(AuthenticationService);

      spyOn(auth, 'logout');

      app.logout();
      expect(auth.logout).toHaveBeenCalledTimes(1);
    });

    it('navigates to the login page', () => {
      let fixture = TestBed.createComponent(LogoutComponent);
      let app = fixture.debugElement.componentInstance;
      let router = fixture.debugElement.injector.get(Router);

      spyOn(router, 'navigate');

      app.logout();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['authentication', 'login']);
    });
  });

  describe('stay', () => {
    it('navigates to the current timesheet', () => {
      let fixture = TestBed.createComponent(LogoutComponent);
      let app = fixture.debugElement.componentInstance;
      let router = fixture.debugElement.injector.get(Router);

      spyOn(router, 'navigate');

      app.stay();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['timesheet', 'current']);
    });
  });
});

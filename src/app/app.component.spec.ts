/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { MdIconModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../testing/router-stubs';

import { AppComponent } from './app.component';
import { AdministratorGuardService } from './core/administrator-guard/administrator-guard.service';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { IdentityService } from './core/identity/identity.service';
import { User } from './data/models/user';

class AdministratorGuardServiceMock {
  canActivate(): Observable<boolean> {
    return Observable.of(false);
  }
}

class AuthenticationServiceMock {
  scheduleTokenRefresh() { }
};

class IdentityServiceMock {
  changed: Subject<User>;

  constructor() {
    this.changed = new Subject();
  }

  get(): Observable<User> {
    return Observable.of(new User({
      _id: '73',
      username: 'sciasp@bb.com'
    }));
  }
}


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
        { provide: AdministratorGuardService, useClass: AdministratorGuardServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: IdentityService, useClass: IdentityServiceMock }
      ]
    });
    TestBed.compileComponents();
  });

  let fixture;
  let app;
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('builds', async(() => {
    expect(app).toBeTruthy();
  }));

  describe('OnInit', () => {
    it('sets up the token refresh', async(() => {
      const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
      spyOn(authenticationService, 'scheduleTokenRefresh');
      app.ngOnInit();
      expect(authenticationService.scheduleTokenRefresh).toHaveBeenCalledTimes(1);
    }));

    it('gets the identity of the current user', () => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      spyOn(identity, 'get').and.callThrough();
      app.ngOnInit();
      expect(identity.get).toHaveBeenCalledTimes(1);
    });

    it('sets the userIsAdmin flag false if the guard will not allow navigation to admin areas', () => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      const guard = fixture.debugElement.injector.get(AdministratorGuardService);
      spyOn(guard, 'canActivate').and.returnValue(Observable.of(false));
      app.ngOnInit();
      identity.changed.next(new User({ _id: '73', username: 'sciasp@bb.com' }));
      expect(app.userIsAdmin).toEqual(false);
    });

    it('sets the userIsAdmin flag true if the guard will allow navigation to admin areas', () => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      const guard = fixture.debugElement.injector.get(AdministratorGuardService);
      spyOn(guard, 'canActivate').and.returnValue(Observable.of(true));
      app.ngOnInit();
      identity.changed.next(new User({ _id: '73', username: 'sciasp@bb.com' }));
      expect(app.userIsAdmin).toEqual(true);
    });
  });

  describe('identity change', () => {
    let guard;
    beforeEach(() => {
      guard = fixture.debugElement.injector.get(AdministratorGuardService);
      spyOn(guard, 'canActivate').and.returnValue(Observable.of(true));
      app.ngOnInit();
      guard.canActivate.calls.reset();
    });

    it('calls the guard to set the userIsAdmin flag if there is a user', () => {
      app.userIsAdmin = false;
      const identity = fixture.debugElement.injector.get(IdentityService);
      identity.changed.next(new User({ _id: '42', username: 'deepthought' }));
      expect(guard.canActivate).toHaveBeenCalledTimes(1);
      expect(app.userIsAdmin).toEqual(true);
    });

    it('sets the userIsAdmin flag to false if there is no user', () => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      identity.changed.next();
      expect(guard.canActivate).not.toHaveBeenCalled();
      expect(app.userIsAdmin).toEqual(false);
    });
  });

});

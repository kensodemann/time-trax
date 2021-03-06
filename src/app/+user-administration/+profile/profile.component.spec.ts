import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdSnackBarModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../../../testing/router-stubs';

import { ProfileComponent } from './profile.component';
import { ErrorDialogService } from '../../shared/services/error-dialog/error-dialog.service';
import { ErrorMessageService } from '../../shared/services/error-message/error-message.service';
import { IdentityService } from '../../core/identity/identity.service';
import { User } from '../../data/models/user';
import { UserService } from '../../data/services/user/user.service';

class ErrorDialogStub { }

class IdentityStub {
  get(): Observable<User> {
    return Observable.empty();
  }
}

class LocationStub {
  back() { }
}

class MdSnackBarStub {
  open(message: string, actionLabel: string, config: MdSnackBarConfig) { }
}

class UserStub {
  get(id: string): Observable<User> {
    return Observable.empty();
  }

  save(user: User): Observable<User> {
    return Observable.empty();
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      imports: [
        FormsModule,
        MdButtonModule,
        MdInputModule,
        NoopAnimationsModule
      ],
      providers: [
        ErrorMessageService,
        { provide: ErrorDialogService, useClass: ErrorDialogStub },
        { provide: IdentityService, useClass: IdentityStub },
        { provide: Location, useClass: LocationStub },
        { provide: MdSnackBar, useClass: MdSnackBarStub },
        { provide: UserService, useClass: UserStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('gets the current user', () => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      spyOn(identity, 'get').and.callThrough();
      component.ngOnInit();
      expect(identity.get).toHaveBeenCalledTimes(1);
    });

    it('gets the full user information for this current user', () => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      spyOn(identity, 'get').and.returnValue(Observable.of({
        _id: '777423',
        username: 'bm@willy.com'
      }));
      const users = fixture.debugElement.injector.get(UserService);
      spyOn(users, 'get').and.returnValue(Observable.of({
        _id: '777423',
        firstName: 'Billy',
        lastName: 'Madison',
        username: 'bm@willy.com'
      }));
      component.ngOnInit();
      expect(users.get).toHaveBeenCalledTimes(1);
      expect(users.get).toHaveBeenCalledWith('777423');
    });

    it('populates the fields with information from the current user', () => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      spyOn(identity, 'get').and.returnValue(Observable.of({
        _id: '777423',
        username: 'bm@willy.com'
      }));
      const users = fixture.debugElement.injector.get(UserService);
      spyOn(users, 'get').and.returnValue(Observable.of({
        _id: '777423',
        firstName: 'Billy',
        lastName: 'Madison',
        username: 'bm@willy.com'
      }));
      component.ngOnInit();
      expect(component.firstName).toEqual('Billy');
      expect(component.lastName).toEqual('Madison');
      expect(component.username).toEqual('bm@willy.com');
    });
  });

  describe('cancel', () => {
    it('navigates back to the prior location', () => {
      const location = fixture.debugElement.injector.get(Location);
      spyOn(location, 'back');
      component.cancel();
      expect(location.back).toHaveBeenCalledTimes(1);
    });
  });

  describe('save', () => {
    beforeEach(() => {
      const identity = fixture.debugElement.injector.get(IdentityService);
      spyOn(identity, 'get').and.returnValue(Observable.of({
        _id: '777423',
        username: 'bm@willy.com'
      }));
      const users = fixture.debugElement.injector.get(UserService);
      spyOn(users, 'get').and.returnValue(Observable.of(new User({
        _id: '777423',
        firstName: 'Billy',
        lastName: 'Madison',
        username: 'bm@willy.com'
      })));
      component.ngOnInit();
    });

    it('saves the value', () => {
      const user = fixture.debugElement.injector.get(UserService);
      spyOn(user, 'save').and.returnValue(Observable.of({}));
      component.firstName = 'William';
      component.lastName = 'Harrison';
      component.username = 'wh@willy.com';
      component.save();
      expect(user.save).toHaveBeenCalledTimes(1);
      expect(user.save).toHaveBeenCalledWith(new User({
        _id: '777423',
        firstName: 'William',
        lastName: 'Harrison',
        username: 'wh@willy.com'
      }));
    });

    describe('on success', () => {
      beforeEach(() => {
        const user = fixture.debugElement.injector.get(UserService);
        spyOn(user, 'save').and.returnValue(Observable.of({}));
      });

      it('displays a snack bar', () => {
        const snackBar = fixture.debugElement.injector.get(MdSnackBar);
        spyOn(snackBar, 'open');
        component.save();
        expect(snackBar.open).toHaveBeenCalledTimes(1);
        expect(snackBar.open).toHaveBeenCalledWith('Success', 'Your profile has been updated', { duration: 3000 });
      });

      it('navigates to the profile view', () => {
        const location = fixture.debugElement.injector.get(Location);
        spyOn(location, 'back');
        component.save();
        expect(location.back).toHaveBeenCalledTimes(1);
      });
    });

    describe('on failure', () => {
      it('sets an error message', () => {
        const user = fixture.debugElement.injector.get(UserService);
        spyOn(user, 'save').and.returnValue(Observable.throw({
          json: function() { return { reason: 'I am an error' }; }
        }));
        component.save();
        expect(component.errorMessage).toEqual('I am an error');
      });
    });
  });
});

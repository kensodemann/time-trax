import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdSnackBarModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import {
  ActivatedRoute,
  ActivatedRouteStub
} from '../../../../testing/router-stubs';

import { ProfileComponent } from './profile.component';
import { ErrorDialogService } from '../../shared/services/error-dialog/error-dialog.service';
import { ErrorMessageService } from '../../shared/services/error-message/error-message.service';
import { IdentityService } from '../../core/identity/identity.service';
import { SharedModule } from '../../shared/shared.module';
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
  let route;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],
      imports: [
        FormsModule,
        MdButtonModule,
        MdInputModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        ErrorMessageService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ErrorDialogService, useClass: ErrorDialogStub },
        { provide: IdentityService, useClass: IdentityStub },
        { provide: Location, useClass: LocationStub },
        { provide: MdSnackBar, useClass: MdSnackBarStub },
        { provide: UserService, useClass: UserStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    route = fixture.debugElement.injector.get(ActivatedRoute);
    route.testParams = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    describe('without and ID in the route', () => {
      it('sets the title to Your Profile', () => {
        component.ngOnInit();
        expect(component.title).toEqual('Your Profile');
      });

      it('sets the button text to Save Changes', () => {
        component.ngOnInit();
        expect(component.buttonLabel).toEqual('Save Changes');
      });

      it('does not allow password entry', () => {
        component.ngOnInit();
        expect(component.allowPasswordEntry).toEqual(false);
      });

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

    describe('with an ID in the route', () => {
      beforeEach(() => {
        route.testParams = { id: '73423141591138420' };
      });

      it('sets the title to Edit User Profile', () => {
        component.ngOnInit();
        expect(component.title).toEqual('Edit User Profile');
      });

       it('sets the button text to Save Changes', () => {
        component.ngOnInit();
        expect(component.buttonLabel).toEqual('Save Changes');
       });

      it('does not allow password entry', () => {
        component.ngOnInit();
        expect(component.allowPasswordEntry).toEqual(false);
      });

      it('gets the user information for that ID', () => {
        const identity = fixture.debugElement.injector.get(IdentityService);
        spyOn(identity, 'get').and.callThrough();
        const users = fixture.debugElement.injector.get(UserService);
        spyOn(users, 'get').and.returnValue(Observable.of({
          _id: '73423141591138420',
          firstName: 'Jimmy',
          lastName: 'Crackorn',
          username: 'idc@mgaway.com'
        }));
        component.ngOnInit();
        expect(identity.get).not.toHaveBeenCalled();
        expect(users.get).toHaveBeenCalledTimes(1);
        expect(users.get).toHaveBeenCalledWith('73423141591138420');
      });

      it('populates the fields', () => {
        const identity = fixture.debugElement.injector.get(IdentityService);
        const users = fixture.debugElement.injector.get(UserService);
        spyOn(users, 'get').and.returnValue(Observable.of({
          _id: '73423141591138420',
          firstName: 'Jimmy',
          lastName: 'Crackorn',
          username: 'idc@mgaway.com'
        }));
        component.ngOnInit();
        expect(component.firstName).toEqual('Jimmy');
        expect(component.lastName).toEqual('Crackorn');
        expect(component.username).toEqual('idc@mgaway.com');
      });
    });

    describe('for a new user', () => {
      beforeEach(() => {
        route.testParams = { id: 'new' };
      });

      it('sets the title to Create User', () => {
        component.ngOnInit();
        expect(component.title).toEqual('Create User');
      });

       it('sets the button text to Create User', () => {
        component.ngOnInit();
        expect(component.buttonLabel).toEqual('Create User');
       });

      it('does not allow password entry', () => {
        component.ngOnInit();
        expect(component.allowPasswordEntry).toEqual(true);
      });

      it('does not attempt to get a user', () => {
        const identity = fixture.debugElement.injector.get(IdentityService);
        spyOn(identity, 'get').and.callThrough();
        const users = fixture.debugElement.injector.get(UserService);
        spyOn(users, 'get').and.callThrough();
        component.ngOnInit();
        expect(identity.get).not.toHaveBeenCalled();
        expect(users.get).not.toHaveBeenCalled();
      });

      it('leaves the field blank', () => {
        const identity = fixture.debugElement.injector.get(IdentityService);
        spyOn(identity, 'get').and.callThrough();
        const users = fixture.debugElement.injector.get(UserService);
        spyOn(users, 'get').and.callThrough();
        component.ngOnInit();
        expect(component.firstName).toBeUndefined();
        expect(component.lastName).toBeUndefined();
        expect(component.username).toBeUndefined();
      });
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
    describe('current user', () => {
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

        it('displays a snack bar message', () => {
          const snackBar = fixture.debugElement.injector.get(MdSnackBar);
          spyOn(snackBar, 'open');
          component.save();
          expect(snackBar.open).toHaveBeenCalledTimes(1);
          expect(snackBar.open).toHaveBeenCalledWith('Success', 'Your profile has been updated', { duration: 3000 });
        });

        it('navigates to the previous view', () => {
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

    describe('existing other user', () => {
      beforeEach(() => {
        route.testParams = { id: '73423141591138420' };
        const users = fixture.debugElement.injector.get(UserService);
        spyOn(users, 'get').and.returnValue(Observable.of(new User({
          _id: '73423141591138420',
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
          _id: '73423141591138420',
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

        it('displays a snack bar message', () => {
          const snackBar = fixture.debugElement.injector.get(MdSnackBar);
          spyOn(snackBar, 'open');
          component.save();
          expect(snackBar.open).toHaveBeenCalledTimes(1);
          expect(snackBar.open).toHaveBeenCalledWith('Success', 'User profile has been updated', { duration: 3000 });
        });

        it('navigates to the previous view', () => {
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

    describe('new user', () => {
      beforeEach(() => {
        route.testParams = { id: 'new' };
        component.ngOnInit();
      });

      it('saves the value', () => {
        const expectedUser = new User();
        expectedUser.firstName = 'William';
        expectedUser.lastName = 'Harrison';
        expectedUser.username = 'wh@willy.com';
        const user = fixture.debugElement.injector.get(UserService);
        spyOn(user, 'save').and.returnValue(Observable.of({}));
        component.firstName = 'William';
        component.lastName = 'Harrison';
        component.username = 'wh@willy.com';
        component.save();
        expect(user.save).toHaveBeenCalledTimes(1);
        expect(user.save).toHaveBeenCalledWith(expectedUser);
      });

      describe('on success', () => {
        beforeEach(() => {
          const user = fixture.debugElement.injector.get(UserService);
          spyOn(user, 'save').and.returnValue(Observable.of({}));
        });

        it('displays a snack bar message', () => {
          const snackBar = fixture.debugElement.injector.get(MdSnackBar);
          spyOn(snackBar, 'open');
          component.save();
          expect(snackBar.open).toHaveBeenCalledTimes(1);
          expect(snackBar.open).toHaveBeenCalledWith('Success', 'New user has been created', { duration: 3000 });
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
});

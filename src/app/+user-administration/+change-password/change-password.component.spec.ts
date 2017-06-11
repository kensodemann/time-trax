import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Response } from '@angular/http';
import { MdButtonModule, MdInputModule, MdSnackBar, MdSnackBarConfig, MdSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { ChangePasswordComponent } from './change-password.component';
import { ErrorMessageService } from '../../shared/services/error-message/error-message.service';
import { UserService } from '../../data/services/user/user.service';
import { SharedModule } from '../../shared/shared.module';

class MdSnackBarStub {
  open(message: string, actionLabel: string, config: MdSnackBarConfig) { }
}

class RouterStub {
  navigate() { }
}

class UserServiceStub {
  changePassword(prevpasswd: string, newpasswd: string): Observable<any> {
    return Observable.empty();
  }
}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MdButtonModule,
        MdInputModule,
        NoopAnimationsModule,
        RouterModule,
        SharedModule
      ],
      declarations: [ChangePasswordComponent],
      providers: [
        ErrorMessageService,
        { provide: MdSnackBar, useClass: MdSnackBarStub },
        { provide: Router, useClass: RouterStub },
        { provide: UserService, useClass: UserServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel', () => {
    it('navigates to the profile page', () => {
      const router = fixture.debugElement.injector.get(Router);
      spyOn(router, 'navigate');
      component.cancel();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['user-administration', 'profile']);
    });
  });

  describe('change password', () => {
    it('calls the service', () => {
      const user = fixture.debugElement.injector.get(UserService);
      spyOn(user, 'changePassword').and.callThrough();
      component.changePassword();
      expect(user.changePassword).toHaveBeenCalledTimes(1);
    });

    it('passes the current and new password', () => {
      const user = fixture.debugElement.injector.get(UserService);
      spyOn(user, 'changePassword').and.callThrough();
      component.password = 'MyOldPassword';
      component.newPassword = 'MyNewPassword';
      component.changePassword();
      expect(user.changePassword).toHaveBeenCalledWith(component.password, component.newPassword);
    });

    describe('on success', () => {
      beforeEach(() => {
        const user = fixture.debugElement.injector.get(UserService);
        spyOn(user, 'changePassword').and.returnValue(Observable.of({}));
      });

      it('displays a snack bar', () => {
        const snackBar = fixture.debugElement.injector.get(MdSnackBar);
        spyOn(snackBar, 'open');
        component.changePassword();
        expect(snackBar.open).toHaveBeenCalledTimes(1);
        expect(snackBar.open).toHaveBeenCalledWith('Success', 'Your password has been changed successfully', { duration: 3000 });
      });

      it('navigates to the profile view', () => {
        const router = fixture.debugElement.injector.get(Router);
        spyOn(router, 'navigate');
        component.changePassword();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['user-administration', 'profile']);
      });
    });

    describe('on failure', () => {
      it('sets an error message', () => {
        const user = fixture.debugElement.injector.get(UserService);
        spyOn(user, 'changePassword').and.returnValue(Observable.throw({
          json: function() { return { reason: 'I am an error' }; }
        }));
        component.changePassword();
        expect(component.errorMessage).toEqual('I am an error');
      });
    });
  });
});

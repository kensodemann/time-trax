import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../shared/authentication.service';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';

import { Observable } from 'rxjs/Observable';

describe('Component: Login', () => {
  beforeEach(() => {
    class AuthenticationServiceStub {
      login(emailAddress: string, password: string) { }
    };

    class RouterStub {
      navigate() { }
    };
    
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        RouterModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(LoginComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('method: login', () => {
    it('calls the authentication service, passing the email address and password', () => { 
      let fixture = TestBed.createComponent(LoginComponent);
      let app = fixture.debugElement.componentInstance;
      let authenticationServiceStub = fixture.debugElement.injector.get(AuthenticationService);

      spyOn(authenticationServiceStub, 'login').and.returnValue(Observable.of(false));
      
      app.emailAddress = 'jimmy.poo@njdb.org';
      app.password = 'iAmaSecret';
      app.login();

      expect(authenticationServiceStub.login).toHaveBeenCalledTimes(1);
      expect(authenticationServiceStub.login).toHaveBeenCalledWith('jimmy.poo@njdb.org', 'iAmaSecret');
    });

    it('navigates to the current timesheet view if the login succeeds', () => {
      let fixture = TestBed.createComponent(LoginComponent);
      let app = fixture.debugElement.componentInstance;
      let authenticationServiceStub = fixture.debugElement.injector.get(AuthenticationService);
      let router = fixture.debugElement.injector.get(Router);

      spyOn(authenticationServiceStub, 'login').and.returnValue(Observable.of(true));
      spyOn(router, 'navigate');
      app.emailAddress = 'jimmy.poo@njdb.org';
      app.password = 'iAmaSecret';
      app.login();

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['timesheet', 'current']);
     });

    it('clears the password and displays an error message if the login fails', () => {
      let fixture = TestBed.createComponent(LoginComponent);
      let app = fixture.debugElement.componentInstance;
      let authenticationServiceStub = fixture.debugElement.injector.get(AuthenticationService);
      let router = fixture.debugElement.injector.get(Router);

      spyOn(authenticationServiceStub, 'login').and.returnValue(Observable.of(false));
      spyOn(router, 'navigate');
      app.emailAddress = 'jimmy.poo@njdb.org';
      app.password = 'iAmaSecret';
      app.login();

      expect(router.navigate).not.toHaveBeenCalled();
      expect(app.password).toEqual('');
      expect(app.invalidPassword).toEqual(true);
    });
  });
});
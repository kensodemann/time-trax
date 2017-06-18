import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MdCardModule, MdInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserListComponent } from './user-list.component';
import { UserService } from '../../data/services/user/user.service';
import { User } from '../../data/models/user';

class UserServiceMock {
  getAll(): Observable<Array<User>> {
    return Observable.of([]);
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        FormsModule,
        MdCardModule,
        MdInputModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useClass: UserServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('on initialization', () => {
    it('gets all of the users', () => {
      const users = fixture.debugElement.injector.get(UserService);
      spyOn(users, 'getAll').and.callThrough();
      component.ngOnInit();
      expect(users.getAll).toHaveBeenCalledTimes(1);
    });

    it('assigns the returned users', () => {
      const userData = [new User({
        _id: '11387651',
        firstName: 'Baron',
        lastName: 'von Stinky-Head',
        username: 'bvonsh@aol.com'
      }), new User({
        _id: '73',
        firstName: 'Sheldon',
        lastName: 'Cooper',
        username: 'sciasp@bb.com'
      }), new User({
        _id: '42',
        firstName: 'Deep',
        lastName: 'Thought',
        username: 'zaphod@dadams.com'
      }), new User({
        _id: '420',
        firstName: 'Stan',
        lastName: 'Vandeweed',
        username: 'dude@aol.com'
      })];
      const users = fixture.debugElement.injector.get(UserService);
      spyOn(users, 'getAll').and.returnValue(Observable.of(userData));
      component.ngOnInit();
      expect(component.filteredUsers()).toEqual(userData);
    });
  });

  describe('filtered users', () => {
    beforeEach(() => {
      const users = fixture.debugElement.injector.get(UserService);
      spyOn(users, 'getAll').and.returnValue(Observable.of([new User({
        _id: '11387651',
        firstName: 'Baron',
        lastName: 'von Stinky-Head',
        username: 'bvonsh@aol.com'
      }), new User({
        _id: '73',
        firstName: 'Sheldon',
        lastName: 'Cooper',
        username: 'sciasp@bb.com'
      }), new User({
        _id: '42',
        firstName: 'Deep',
        lastName: 'Thought',
        username: 'zaphod@dadams.com'
      }), new User({
        _id: '420',
        firstName: 'Stan',
        lastName: 'Vandeweed',
        username: 'dude@aol.com'
      })]));
      component.ngOnInit();
    });

    it('returns all users if there is no filter text', () => {
      expect(component.filteredUsers()).toEqual([new User({
        _id: '11387651',
        firstName: 'Baron',
        lastName: 'von Stinky-Head',
        username: 'bvonsh@aol.com'
      }), new User({
        _id: '73',
        firstName: 'Sheldon',
        lastName: 'Cooper',
        username: 'sciasp@bb.com'
      }), new User({
        _id: '42',
        firstName: 'Deep',
        lastName: 'Thought',
        username: 'zaphod@dadams.com'
      }), new User({
        _id: '420',
        firstName: 'Stan',
        lastName: 'Vandeweed',
        username: 'dude@aol.com'
      })]);
    });

    it('matches on first name', () => {
      component.filterText = 'aRo';
      expect(component.filteredUsers()).toEqual([new User({
        _id: '11387651',
        firstName: 'Baron',
        lastName: 'von Stinky-Head',
        username: 'bvonsh@aol.com'
      })]);
    });

    it('matches on last name', () => {
      component.filterText = 'Oug';
      expect(component.filteredUsers()).toEqual([new User({
        _id: '42',
        firstName: 'Deep',
        lastName: 'Thought',
        username: 'zaphod@dadams.com'
      })]);
    });

    it('matches on the username', () => {
      component.filterText = 'AOL';
      expect(component.filteredUsers()).toEqual([new User({
        _id: '11387651',
        firstName: 'Baron',
        lastName: 'von Stinky-Head',
        username: 'bvonsh@aol.com'
      }), new User({
        _id: '420',
        firstName: 'Stan',
        lastName: 'Vandeweed',
        username: 'dude@aol.com'
      })]);
    });
  });
});

import { TestBed, async } from '@angular/core/testing';
import { Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ProjectService } from '../data/services/project/project.service';
import { ProjectsComponent } from './projects.component';

import 'rxjs/add/observable/empty';

describe('Component: Projects', () => {
  beforeEach(() => {
    class DataService {
      getAll(): Observable<Response> {
        return Observable.empty();
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent
      ],
      imports: [
        FormsModule,
        MaterialModule
      ],
      providers: [
        { provide: ProjectService, useClass: DataService }
      ]
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(ProjectsComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('initialization', () => {
    it('gets all of the projects', () => {
      let fixture = TestBed.createComponent(ProjectsComponent);
      let app = fixture.debugElement.componentInstance;
      let dataService = fixture.debugElement.injector.get(ProjectService);

      spyOn(dataService, 'getAll').and.returnValue(Observable.empty());
      app.ngOnInit();
      expect(dataService.getAll).toHaveBeenCalledTimes(1);
    });

    it('assigns the fetched projects', () => {
      let fixture = TestBed.createComponent(ProjectsComponent);
      let app = fixture.debugElement.componentInstance;
      let dataService = fixture.debugElement.injector.get(ProjectService);

      spyOn(dataService, 'getAll').and.returnValue(Observable.of([{
        _id: '42',
        name: 'Deep Thought',
        status: 'active'
      }, {
        _id: '1138',
        name: 'Big Brother by Another Mother',
        status: 'active'
      }]));

      app.ngOnInit();
      expect(app.projects).toEqual([{
        _id: '42',
        name: 'Deep Thought',
        status: 'active'
      }, {
        _id: '1138',
        name: 'Big Brother by Another Mother',
        status: 'active'
      }]);
    });
  });

  describe('filtering projects', () => {
    let app;
    beforeEach(() => {
      let fixture = TestBed.createComponent(ProjectsComponent);
      app = fixture.debugElement.componentInstance;
      let dataService = fixture.debugElement.injector.get(ProjectService);

      spyOn(dataService, 'getAll').and.returnValue(Observable.of([{
        _id: '42',
        name: 'Deep Thought',
        jiraTaskId: 'DA-101',
        sbvbTaskId: 'RFP14295',
        status: 'inactive'
      }, {
        _id: '1138',
        name: 'Big Brother by Another Mother',
        jiraTaskId: 'THX-101',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '314159',
        name: 'Big Fat Pie Eater',
        jiraTaskId: 'THX-121',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '73',
        name: 'Geeks are for Us',
        jiraTaskId: 'BB-1152',
        sbvbTaskId: 'PL0259935',
        status: 'active'
      }, {
        _id: '4273',
        name: 'Ultimate Answer for Geeks and Nerds',
        jiraTaskId: 'BB-8943',
        sbvbTaskId: 'WO0035003',
        status: 'inactive'
      }, {
        _id: '89953',
        name: 'Just some random task',
        sbvbTaskId: 'PL002959035',
        status: 'inactive'
      }, {
        _id: '1152',
        name: 'Some other Random task',
        sbvbTaskId: 'RFP14295',
        status: 'active'
      }]));
      app.ngOnInit();
    });

    it('returns all active projects by default', () => {
      expect(app.filteredProjects()).toEqual([{
        _id: '1138',
        name: 'Big Brother by Another Mother',
        jiraTaskId: 'THX-101',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '314159',
        name: 'Big Fat Pie Eater',
        jiraTaskId: 'THX-121',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '73',
        name: 'Geeks are for Us',
        jiraTaskId: 'BB-1152',
        sbvbTaskId: 'PL0259935',
        status: 'active'
      }, {
        _id: '1152',
        name: 'Some other Random task',
        sbvbTaskId: 'RFP14295',
        status: 'active'
      }])
    });

    it('includes inactive projects when the flag is set', () => {
      app.showClosedProjects = true;
      expect(app.filteredProjects()).toEqual([{
        _id: '42',
        name: 'Deep Thought',
        jiraTaskId: 'DA-101',
        sbvbTaskId: 'RFP14295',
        status: 'inactive'
      }, {
        _id: '1138',
        name: 'Big Brother by Another Mother',
        jiraTaskId: 'THX-101',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '314159',
        name: 'Big Fat Pie Eater',
        jiraTaskId: 'THX-121',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '73',
        name: 'Geeks are for Us',
        jiraTaskId: 'BB-1152',
        sbvbTaskId: 'PL0259935',
        status: 'active'
      }, {
        _id: '4273',
        name: 'Ultimate Answer for Geeks and Nerds',
        jiraTaskId: 'BB-8943',
        sbvbTaskId: 'WO0035003',
        status: 'inactive'
      }, {
        _id: '89953',
        name: 'Just some random task',
        sbvbTaskId: 'PL002959035',
        status: 'inactive'
      }, {
        _id: '1152',
        name: 'Some other Random task',
        sbvbTaskId: 'RFP14295',
        status: 'active'
      }]);
    });

    it('filters based on name', () => {
      app.projectFilter = 'Bi';
      expect(app.filteredProjects()).toEqual([{
        _id: '1138',
        name: 'Big Brother by Another Mother',
        jiraTaskId: 'THX-101',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '314159',
        name: 'Big Fat Pie Eater',
        jiraTaskId: 'THX-121',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }]);
    });

    it('filters based on JIRA Task ID', () => {
      app.projectFilter = '1152';
      expect(app.filteredProjects()).toEqual([{
        _id: '73',
        name: 'Geeks are for Us',
        jiraTaskId: 'BB-1152',
        sbvbTaskId: 'PL0259935',
        status: 'active'
      }]);
    });

    it('filters based on SBVB Task ID', () => {
      app.projectFilter = '35';
      expect(app.filteredProjects()).toEqual([{
        _id: '1138',
        name: 'Big Brother by Another Mother',
        jiraTaskId: 'THX-101',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '314159',
        name: 'Big Fat Pie Eater',
        jiraTaskId: 'THX-121',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '73',
        name: 'Geeks are for Us',
        jiraTaskId: 'BB-1152',
        sbvbTaskId: 'PL0259935',
        status: 'active'
      }]);
    });

    it('limits by the filter text without regard to case', () => {
      app.projectFilter = 'bIg';
      expect(app.filteredProjects()).toEqual([{
        _id: '1138',
        name: 'Big Brother by Another Mother',
        jiraTaskId: 'THX-101',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }, {
        _id: '314159',
        name: 'Big Fat Pie Eater',
        jiraTaskId: 'THX-121',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }]);
    });

    it('does not require the filter words to be together in the name', () => {
      app.projectFilter = 'Bi other';
      expect(app.filteredProjects()).toEqual([{
        _id: '1138',
        name: 'Big Brother by Another Mother',
        jiraTaskId: 'THX-101',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }]);
    });

    it('does not require the filter words to be in the same property', () => {
      app.projectFilter = '121 bIg';
      expect(app.filteredProjects()).toEqual([{
        _id: '314159',
        name: 'Big Fat Pie Eater',
        jiraTaskId: 'THX-121',
        sbvbTaskId: 'IFP0005935',
        status: 'active'
      }]);
    });

  });
});

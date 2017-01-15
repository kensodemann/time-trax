import { TestBed, async } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorMessageService } from '../shared/error-message/error-message.service';
import { Project } from '../data/models/project';
import { ProjectService } from '../data/services/project/project.service';
import { ProjectEditorService } from '../editor/project-editor/project-editor.service';
import { ProjectsComponent } from './projects.component';

import 'rxjs/add/observable/empty';

class DataServiceStub {
  getAll(): Observable<Response> {
    return Observable.empty();
  }
}

class ErrorMessageStub {
  show(res: Response, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

class ProjectEditorStub {
  open(project: Project, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

describe('Component: Projects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent
      ],
      imports: [
        FormsModule,
        MaterialModule
      ],
      providers: [
        { provide: ErrorMessageService, useClass: ErrorMessageStub },
        { provide: ProjectService, useClass: DataServiceStub },
        { provide: ProjectEditorService, useClass: ProjectEditorStub }
      ]
    });
  });

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('initialization', () => {
    it('gets all of the projects', () => {
      const fixture = TestBed.createComponent(ProjectsComponent);
      const app = fixture.debugElement.componentInstance;
      const dataService = fixture.debugElement.injector.get(ProjectService);

      spyOn(dataService, 'getAll').and.returnValue(Observable.empty());
      app.ngOnInit();
      expect(dataService.getAll).toHaveBeenCalledTimes(1);
    });

    it('assigns the fetched projects', () => {
      const fixture = TestBed.createComponent(ProjectsComponent);
      const app = fixture.debugElement.componentInstance;
      const dataService = fixture.debugElement.injector.get(ProjectService);

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

    it('shows the error if there is one', () => {
      const fixture = TestBed.createComponent(ProjectsComponent);
      const app = fixture.debugElement.componentInstance;
      const dataService = fixture.debugElement.injector.get(ProjectService);
      const errorMessage = fixture.debugElement.injector.get(ErrorMessageService);

      const opt = new ResponseOptions({
        status: 400,
        statusText: 'Not OK',
        body: {}
      });
      const res = new Response(opt);

      spyOn(dataService, 'getAll').and.returnValue(Observable.throw(res));
      spyOn(errorMessage, 'show');

      app.ngOnInit();
      expect(errorMessage.show).toHaveBeenCalledTimes(1);
    });
  });

  describe('filtering projects', () => {
    let app;
    beforeEach(() => {
      const fixture = TestBed.createComponent(ProjectsComponent);
      app = fixture.debugElement.componentInstance;
      const dataService = fixture.debugElement.injector.get(ProjectService);

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
      }]);
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

  describe('adding a new project', () => {
    let app;
    let projectEditor;
    beforeEach(() => {
      const fixture = TestBed.createComponent(ProjectsComponent);
      app = fixture.debugElement.componentInstance;
      projectEditor = fixture.debugElement.injector.get(ProjectEditorService);
      const dataService = fixture.debugElement.injector.get(ProjectService);

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
    });

    it('opens the editor', () => {
      spyOn(projectEditor, 'open').and.returnValue(Observable.empty());
      app.newProject();
      expect(projectEditor.open).toHaveBeenCalledTimes(1);
      expect(projectEditor.open.calls.argsFor(0)[0]).toEqual(new Project());
    });

    it('adds thenew project to the list if one was created', () => {
      spyOn(projectEditor, 'open').and.returnValue(Observable.of({
        _id: '314159',
        name: 'Cherry Pi',
        status: 'active'
      }));
      app.newProject();
      expect(app.projects.length).toEqual(3);
      expect(app.projects[2]).toEqual({
        _id: '314159',
        name: 'Cherry Pi',
        status: 'active'
      });
    });

    it('does not add to the list if the editor was canceled', () => {
      spyOn(projectEditor, 'open').and.returnValue(Observable.of());
      app.newProject();
      expect(app.projects.length).toEqual(2);
    });
  });

  describe('adding a new project', () => {
    let app;
    let projectEditor;
    beforeEach(() => {
      const fixture = TestBed.createComponent(ProjectsComponent);
      app = fixture.debugElement.componentInstance;
      projectEditor = fixture.debugElement.injector.get(ProjectEditorService);
      const dataService = fixture.debugElement.injector.get(ProjectService);

      spyOn(dataService, 'getAll').and.returnValue(Observable.of([{
        _id: '42',
        name: 'Deep Thought',
        status: 'active',
        sbvbTaskId: 'IFP0024242'
      }, {
        _id: '1138',
        name: 'Big Brother by Another Mother',
        status: 'active',
        sbvbTaskId: 'COMP101'
      }]));
      app.ngOnInit();
    });

    it('opens the editor', () => {
      spyOn(projectEditor, 'open').and.returnValue(Observable.empty());
      app.editProject({
        _id: '1138',
        name: 'Big Brother by Another Mother',
        status: 'active',
        sbvbTaskId: 'COMP101'
      });
      expect(projectEditor.open).toHaveBeenCalledTimes(1);
      expect(projectEditor.open.calls.argsFor(0)[0]).toEqual({
        _id: '1138',
        name: 'Big Brother by Another Mother',
        status: 'active',
        sbvbTaskId: 'COMP101'
      });
    });

    it('does not add the returned object to the list (it should already have been there)', () => {
      spyOn(projectEditor, 'open').and.returnValue(Observable.of({
        _id: '1138',
        name: 'I have been re-educated by big brother',
        status: 'active',
        sbvbTaskId: 'COMP101'
      }));
      app.editProject({
        _id: '1138',
        name: 'Big Brother by Another Mother',
        status: 'active',
        sbvbTaskId: 'COMP101'
      });
      expect(app.projects.length).toEqual(2);
    });
  });
});

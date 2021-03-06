/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdCheckboxModule, MdDialogModule, MdDialogRef, MdInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../data/models/project';
import { DataService } from '../../data/services/data-service.interface';
import { ProjectService } from '../../data/services/project/project.service';
import { ProjectEditorComponent } from './project-editor.component';

class DialogRefStub {
  close(value: any) { }
}

class ProjectServiceStub implements DataService<Project> {
  getAll(): Observable<Array<Project>> { return Observable.empty(); }
  save(project: Project): Observable<Project> { return Observable.empty(); }
}

describe('ProjectEditorComponent', () => {
  let component: ProjectEditorComponent;
  let fixture: ComponentFixture<ProjectEditorComponent>;
  let dataService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectEditorComponent],
      imports: [
        FormsModule,
        MdCheckboxModule,
        MdDialogModule,
        MdInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MdDialogRef, useClass: DialogRefStub },
        { provide: ProjectService, useClass: ProjectServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    let prj: Project;
    beforeEach(() => {
      prj = new Project();
    });

    it('sets the title and button label properly if the project is new', () => {
      component.initialize(prj);
      expect(component.title).toEqual('New Project');
      expect(component.buttonLabel).toEqual('Create');
    });

    it('sets the title and button label properly if editing an existing project', () => {
      prj._id = '1993405994035';
      component.initialize(prj);
      expect(component.title).toEqual('Modify Project');
      expect(component.buttonLabel).toEqual('Done');
    });

    it('copies the basic project data to the controller for editing', () => {
      prj._id = '1993405994035';
      prj.name = 'time-trax';
      prj.jiraTaskId = 'TT-101';
      prj.sbvbTaskId = 'RFP11499504';
      component.initialize(prj);
      expect(component.name).toEqual('time-trax');
      expect(component.jiraTaskId).toEqual('TT-101');
      expect(component.sbvbTaskId).toEqual('RFP11499504');
      expect(component.isActive).toEqual(true);
    });

    it('sets isActive true if the status is active', () => {
      prj.status = 'active';
      component.initialize(prj);
      expect(component.isActive).toEqual(true);
    });

    it('sets isActive false if the status is inactive', () => {
      prj.status = 'inactive';
      component.initialize(prj);
      expect(component.isActive).toEqual(false);
    });
  });

  describe('cancel', () => {
    beforeEach(() => {
      component.initialize(new Project());
    });

    it('closes the dialog, returning nothing', () => {
      const dialog = fixture.debugElement.injector.get(MdDialogRef);
      spyOn(dialog, 'close');
      component.cancel();
      expect(dialog.close).toHaveBeenCalledTimes(1);
      expect(dialog.close).toHaveBeenCalledWith();
    });
  });

  describe('save', () => {
    let prj: Project;
    beforeEach(() => {
      prj = new Project();
      component.initialize(prj);
      component.name = 'time-trax';
      component.jiraTaskId = 'TT-101';
      component.sbvbTaskId = 'RFP11499504';
      component.isActive = false;
    });

    it('copies the data back to the project', () => {
      component.save();
      expect(prj.name).toEqual('time-trax');
      expect(prj.jiraTaskId).toEqual('TT-101');
      expect(prj.sbvbTaskId).toEqual('RFP11499504');
      expect(prj.status).toEqual('inactive');
    });

    it('saves the project', () => {
      spyOn(dataService, 'save').and.returnValue(Observable.empty());
      component.save();
      expect(dataService.save).toHaveBeenCalledTimes(1);
      expect(dataService.save).toHaveBeenCalledWith(prj);
    });

    it('closes the dialog once the save completes, returning the result of the save', () => {
      const dialog = fixture.debugElement.injector.get(MdDialogRef);
      const newPrj = new Project();
      newPrj.status = 'I was just saved';
      spyOn(dataService, 'save').and.returnValue(Observable.of(newPrj));
      spyOn(dialog, 'close');
      component.save();
      expect(dialog.close).toHaveBeenCalledTimes(1);
      expect(dialog.close).toHaveBeenCalledWith(newPrj);
    });
  });

  describe('canSave', () => {
    beforeEach(() => {
      component.initialize(new Project());
    });

    it('is true if the name and sbvbTaskId have values', () => {
      component.name = 'test-project';
      component.sbvbTaskId = 'PL0200593';
      expect(component.canSave()).toBeTruthy();
    });

    it('is false if the name is blank', () => {
      component.sbvbTaskId = 'PL0200593';
      expect(component.canSave()).toBeFalsy();
    });

    it('is false if the sbvbTaskId is blank', () => {
      component.name = 'test-project';
      expect(component.canSave()).toBeFalsy();
    });
  });
});

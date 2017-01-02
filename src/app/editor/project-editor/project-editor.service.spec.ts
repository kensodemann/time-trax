/* tslint:disable:no-unused-variable */

import { MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../data/models/project';
import { ProjectEditorComponent } from './project-editor.component';
import { ProjectEditorService } from './project-editor.service';

class DataServiceStub {
  save(project: Project): Observable<Project> {
    return Observable.empty();
  }
};

class DialogStub {
  Component: any;
  componentInstance: ProjectEditorComponent;
  config: MdDialogConfig;
  ref: MdDialogRef<ProjectEditorComponent>;

  constructor() {
    this.ref = new MdDialogRef<ProjectEditorComponent>(null);
  }

  open(Component: any, config: MdDialogConfig): MdDialogRef<ProjectEditorComponent> {
    this.Component = Component;
    this.config = config;

    this.componentInstance = new Component();
    this.ref.componentInstance = this.componentInstance;
    return this.ref;
  }
};

describe('ProjectEditorService', () => {
  let dialog;
  let dataService;
  let service: ProjectEditorService;
  beforeEach(() => {
    dialog = new DialogStub();
    dataService = new DataServiceStub();
    service = new ProjectEditorService(dialog, dataService);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('open', () => {
    let prj: Project;
    beforeEach(() => {
      prj = new Project();
      prj.name = 'I am a test project';
    });

    it('opens the dialog', () => {
      let vcr = {
        name: 'I am a view component ref',
        element: null,
        injector: null,
        parentInjector: null,
        clear: null,
        get: null,
        length: null,
        createEmbeddedView: null,
        createComponent: null,
        insert: null,
        move: null,
        indexOf: null,
        remove: null,
        detach: null
      };
      service.open(prj, vcr);
      expect(dialog.Component).toEqual(ProjectEditorComponent);
      expect(dialog.config.viewContainerRef).toEqual(vcr);
    });

    it('sets the title and button label for a new project', () => {
      prj._id = undefined;
      service.open(prj, null);
      expect(dialog.componentInstance.title).toEqual('New Project');
      expect(dialog.componentInstance.buttonLabel).toEqual('Create');
    });

    it('sets the title and button label for editing an existing project', () => {
      prj._id = '11384273314159';
      service.open(prj, null);
      expect(dialog.componentInstance.title).toEqual('Modify Project');
      expect(dialog.componentInstance.buttonLabel).toEqual('Done');
    });

    it('returns the after closed observable', () => {
      spyOn(dialog.ref, 'afterClosed').and.returnValue(Observable.of('toast'));
      let result: string;
      service.open(prj, null).subscribe(res => result = res);
      expect(result).toEqual('toast');
    });
  });
});

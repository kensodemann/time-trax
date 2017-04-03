/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../data/models/project';
import { Stage } from '../../data/models/stage';
import { TaskTimer } from '../../data/models/task-timer';
import { DataService } from '../../data/services/data-service.interface';
import { ProjectService } from '../../data/services/project/project.service';
import { StageService } from '../../data/services/stage/stage.service';
import { TaskTimerService } from '../../data/services/task-timer/task-timer.service';
import { HoursMinutesPipe } from '../../shared/pipes/hours-minutes.pipe';
import { MillisecondsPipe } from '../../shared/pipes/milliseconds.pipe';
import { TaskTimerEditorComponent } from './task-timer-editor.component';

class DialogRefStub {
  close(value: any) { }
}

class TaskTimerServiceStub implements DataService<TaskTimer> {
  getAll(): Observable<Array<TaskTimer>> { return Observable.empty(); }
  save(taskTimer: TaskTimer): Observable<TaskTimer> { return Observable.empty(); }
}

class ProjectServiceStub implements DataService<Project> {
  getAll(): Observable<Array<Project>> { return Observable.empty(); }
}

class StageServiceStub implements DataService<Stage> {
  getAll(): Observable<Array<Stage>> { return Observable.empty(); }
}

describe('TaskTimerEditorComponent', () => {
  let component: TaskTimerEditorComponent;
  let fixture: ComponentFixture<TaskTimerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [TaskTimerEditorComponent],
      providers: [
        HoursMinutesPipe,
        MillisecondsPipe,
        { provide: MdDialogRef, useClass: DialogRefStub },
        { provide: ProjectService, useClass: ProjectServiceStub },
        { provide: StageService, useClass: StageServiceStub },
        { provide: TaskTimerService, useClass: TaskTimerServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TaskTimerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('exists', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('sets the title and button label properly if the task is new', () => {
      const tt = new TaskTimer({
        timesheetRid: '1138314594273',
        workDate: '2017-02-11'
      });
      component.initialize(tt);
      expect(component.title).toEqual('New Task');
      expect(component.buttonLabel).toEqual('Create');
    });

    it('sets the title and button label properly if editing an existing task', () => {
      const tt = new TaskTimer({
        _id: '1993405994035',
        timesheetRid: '1138314594273',
        workDate: '2017-02-11'
      });
      component.initialize(tt);
      expect(component.title).toEqual('Modify Task');
      expect(component.buttonLabel).toEqual('Done');
    });

    it('copies the basic project data to the controller for editing', () => {
      const tt = new TaskTimer({
        _id: '1993405994035',
        timesheetRid: '1138314594273',
        workDate: '2017-02-11',
        project: {
          _id: '86',
          status: 'active',
          name: 'Peter',
          jiraTaskId: 'MIT-123',
          sbvbTaskId: 'COMP000293'
        },
        stage: { _id: '5', stageNumber: 6, name: 'Documentation' },
        milliseconds: 5580000,
        isActive: true
      });
      component.initialize(tt);
      component.ngOnInit();
      expect(component.editorForm.controls['project'].value).toEqual(new Project({
        _id: '86',
        status: 'active',
        name: 'Peter',
        jiraTaskId: 'MIT-123',
        sbvbTaskId: 'COMP000293'
      }));
      expect(component.editorForm.controls['stage'].value).toEqual(new Stage({ _id: '5', stageNumber: 6, name: 'Documentation' }));
      expect(component.editorForm.controls['hours'].value).toEqual('1:33');
    });
  });

  describe('ngOnInit', () => {
    let projectDataService: ProjectService;
    let stageDataService: StageService;
    beforeEach(() => {
      projectDataService = fixture.debugElement.injector.get(ProjectService);
      stageDataService = fixture.debugElement.injector.get(StageService);
      component.initialize(new TaskTimer());
    });

    it('gets all projects', () => {
      spyOn(projectDataService, 'getAll').and.returnValue(Observable.empty());
      component.ngOnInit();
      expect(projectDataService.getAll).toHaveBeenCalledTimes(1);
    });

    it('gets all stages', () => {
      spyOn(stageDataService, 'getAll').and.returnValue(Observable.empty());
      component.ngOnInit();
      expect(stageDataService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('changing the project value', () => {
    let input;
    beforeEach(() => {
      const projectDataService = fixture.debugElement.injector.get(ProjectService);
      spyOn(projectDataService, 'getAll').and.returnValue(Observable.of([{
        _id: '42',
        status: 'active',
        name: 'Lisa',
        jiraTaskId: 'HT-349',
        sbvbTaskId: 'RFP0100495'
      }, {
        _id: '73',
        status: 'active',
        name: 'Sally',
        jiraTaskId: 'HT-350',
        sbvbTaskId: 'RFP0100495'
      }, {
        _id: '1138',
        status: 'active',
        name: 'Teri',
        jiraTaskId: 'HT-351',
        sbvbTaskId: 'IFP0003025'
      }, {
        _id: '89',
        status: 'inactive',
        name: 'Sassy',
        jiraTaskId: 'HT-987',
        sbvbTaskId: 'PL0020059403'
      }, {
        _id: '86',
        status: 'active',
        name: 'Peter',
        jiraTaskId: 'MIT-123',
        sbvbTaskId: 'COMP000293'
      }, {
        _id: '12',
        status: 'active',
        name: 'Frank',
        jiraTaskId: 'STX-783',
        sbvbTaskId: 'COMP00029594'
      }]));
      component.ngOnInit();
      input = fixture.debugElement.query(By.css('#project')).nativeElement;
    });

    it('filters to all projects before any change', () => {
      let projects;
      component.filteredProjects.subscribe(res => projects = res);
      expect(projects).toEqual([{
        _id: '42',
        status: 'active',
        name: 'Lisa',
        jiraTaskId: 'HT-349',
        sbvbTaskId: 'RFP0100495'
      }, {
        _id: '73',
        status: 'active',
        name: 'Sally',
        jiraTaskId: 'HT-350',
        sbvbTaskId: 'RFP0100495'
      }, {
        _id: '1138',
        status: 'active',
        name: 'Teri',
        jiraTaskId: 'HT-351',
        sbvbTaskId: 'IFP0003025'
      }, {
        _id: '86',
        status: 'active',
        name: 'Peter',
        jiraTaskId: 'MIT-123',
        sbvbTaskId: 'COMP000293'
      }, {
        _id: '12',
        status: 'active',
        name: 'Frank',
        jiraTaskId: 'STX-783',
        sbvbTaskId: 'COMP00029594'
      }]);
    });

    it('returns projects matching on name', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      let projects;
      component.filteredProjects.subscribe((res) => {
        projects = res;
      });
      input.value = 'sa';
      dispatchEvent(input, 'input');
      expect(component.editorForm.controls['project'].value).toEqual('sa');
      expect(projects).toEqual([{
        _id: '42',
        status: 'active',
        name: 'Lisa',
        jiraTaskId: 'HT-349',
        sbvbTaskId: 'RFP0100495'
      }, {
        _id: '73',
        status: 'active',
        name: 'Sally',
        jiraTaskId: 'HT-350',
        sbvbTaskId: 'RFP0100495'
      }]);
    }));

    it('sets the project to the first matching project on blur', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      input.value = 'te';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.editorForm.controls['project'].value).toEqual({
        _id: '1138',
        status: 'active',
        name: 'Teri',
        jiraTaskId: 'HT-351',
        sbvbTaskId: 'IFP0003025'
      });
    }));

    it('sets the project to empty on blur if the entered data is a string and no stages match', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      input.value = 'spike';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.editorForm.controls['project'].value).toEqual('');
    }));

    it('sets and clears the project required validation message as appropriate', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(component.errors['project']).toEqual('');
      input.value = 'te';
      dispatchEvent(input, 'input');
      expect(component.errors['project']).toEqual('');
      dispatchEvent(input, 'blur');
      expect(component.errors['project']).toEqual('');
      input.value = '';
      dispatchEvent(input, 'input');
      expect(component.errors['project']).toEqual('Project is required.');
      input.value = 'spike';
      dispatchEvent(input, 'input');
      expect(component.errors['project']).toEqual('');
      dispatchEvent(input, 'blur');
      expect(component.errors['project']).toEqual('Project is required.');
    }));
  });

  describe('changing the stage value', () => {
    let input;
    beforeEach(() => {
      const stageDataService = fixture.debugElement.injector.get(StageService);
      spyOn(stageDataService, 'getAll').and.returnValue(Observable.of([
        { _id: '1', stageNumber: 10, name: 'Project Management' },
        { _id: '2', stageNumber: 14, name: 'Quote Rounding/Adjustment' },
        { _id: '3', stageNumber: 15, name: 'Code Review' },
        { _id: '4', stageNumber: 1, name: 'Requirements Definition' },
        { _id: '5', stageNumber: 6, name: 'Documentation' },
        { _id: '6', stageNumber: 11, name: 'Release Integration' },
        { _id: '7', stageNumber: 2, name: 'Functional Specification' }
      ]));
      component.ngOnInit();
      input = fixture.debugElement.query(By.css('#stage')).nativeElement;
    });

    it('filters stages to all stages before any change', () => {
      let stages;
      component.filteredStages.subscribe(res => stages = res);
      expect(stages).toEqual([
        { _id: '1', stageNumber: 10, name: 'Project Management' },
        { _id: '2', stageNumber: 14, name: 'Quote Rounding/Adjustment' },
        { _id: '3', stageNumber: 15, name: 'Code Review' },
        { _id: '4', stageNumber: 1, name: 'Requirements Definition' },
        { _id: '5', stageNumber: 6, name: 'Documentation' },
        { _id: '6', stageNumber: 11, name: 'Release Integration' },
        { _id: '7', stageNumber: 2, name: 'Functional Specification' }
      ]);
    });

    it('filters stages based on name and entered data', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      let stages;
      component.filteredStages.subscribe((res) => {
        stages = res;
      });
      input.value = 're';
      dispatchEvent(input, 'input');
      expect(component.editorForm.controls['stage'].value).toEqual('re');
      expect(stages).toEqual([
        { _id: '3', stageNumber: 15, name: 'Code Review' },
        { _id: '4', stageNumber: 1, name: 'Requirements Definition' },
        { _id: '6', stageNumber: 11, name: 'Release Integration' }
      ]);
    }));

    it('sets the stage to the first matching stage on blur', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      input.value = 're';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.editorForm.controls['stage'].value).toEqual({ _id: '3', stageNumber: 15, name: 'Code Review' });
    }));

    it('sets the stage to empty on blur if the entered data is a string and no stages match', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      input.value = 'spike';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.editorForm.controls['stage'].value).toEqual('');
    }));

    it('sets and clears the stage required validation message as appropriate', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(component.errors['stage']).toEqual('');
      input.value = 're';
      dispatchEvent(input, 'input');
      expect(component.errors['stage']).toEqual('');
      dispatchEvent(input, 'blur');
      expect(component.errors['stage']).toEqual('');
      input.value = '';
      dispatchEvent(input, 'input');
      expect(component.errors['stage']).toEqual('Stage is required.');
      input.value = 'spike';
      dispatchEvent(input, 'input');
      expect(component.errors['stage']).toEqual('');
      dispatchEvent(input, 'blur');
      expect(component.errors['stage']).toEqual('Stage is required.');
    }));
  });
  describe('changing the hours value', () => {
    let input;
    beforeEach(() => {
      component.ngOnInit();
      input = fixture.debugElement.query(By.css('#hours')).nativeElement;
    });

    it('sets and clears the hours format validation message as appropriate', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(component.errors['hours']).toEqual('');
      input.value = '1';
      dispatchEvent(input, 'input');
      expect(component.errors['hours']).toEqual('');
      input.value = '1:';
      dispatchEvent(input, 'input');
      expect(component.errors['hours']).toEqual('Valid formats are h.xx and h:mm.');
      input.value = '1:4';
      dispatchEvent(input, 'input');
      expect(component.errors['hours']).toEqual('Valid formats are h.xx and h:mm.');
      input.value = '1:45';
      dispatchEvent(input, 'input');
      expect(component.errors['hours']).toEqual('');
      input.value = '1.75';
      dispatchEvent(input, 'input');
      expect(component.errors['hours']).toEqual('');
      input.value = 'bogus';
      dispatchEvent(input, 'input');
      expect(component.errors['hours']).toEqual('Valid formats are h.xx and h:mm.');
    }));
  });

  describe('cancel', () => {
    beforeEach(() => {
      const tt = new TaskTimer();
      component.initialize(tt);
    });

    it('closes the dialog, returning nothing', () => {
      const dialog = fixture.debugElement.injector.get(MdDialogRef);
      spyOn(dialog, 'close');
      component.cancel();
      expect(dialog.close).toHaveBeenCalledTimes(1);
      expect(dialog.close).toHaveBeenCalledWith();
    });
  });

  describe('canSave', () => {
    beforeEach(() => {
      const projectDataService = fixture.debugElement.injector.get(ProjectService);
      spyOn(projectDataService, 'getAll').and.returnValue(Observable.of([{
        _id: '42',
        status: 'active',
        name: 'Lisa',
        jiraTaskId: 'HT-349',
        sbvbTaskId: 'RFP0100495'
      }, {
        _id: '73',
        status: 'active',
        name: 'Sally',
        jiraTaskId: 'HT-350',
        sbvbTaskId: 'RFP0100495'
      }, {
        _id: '1138',
        status: 'active',
        name: 'Teri',
        jiraTaskId: 'HT-351',
        sbvbTaskId: 'IFP0003025'
      }, {
        _id: '89',
        status: 'inactive',
        name: 'Sassy',
        jiraTaskId: 'HT-987',
        sbvbTaskId: 'PL0020059403'
      }, {
        _id: '86',
        status: 'active',
        name: 'Peter',
        jiraTaskId: 'MIT-123',
        sbvbTaskId: 'COMP000293'
      }, {
        _id: '12',
        status: 'active',
        name: 'Frank',
        jiraTaskId: 'STX-783',
        sbvbTaskId: 'COMP00029594'
      }]));
      const stageDataService = fixture.debugElement.injector.get(StageService);
      spyOn(stageDataService, 'getAll').and.returnValue(Observable.of([
        { _id: '1', stageNumber: 10, name: 'Project Management' },
        { _id: '2', stageNumber: 14, name: 'Quote Rounding/Adjustment' },
        { _id: '3', stageNumber: 15, name: 'Code Review' },
        { _id: '4', stageNumber: 1, name: 'Requirements Definition' },
        { _id: '5', stageNumber: 6, name: 'Documentation' },
        { _id: '6', stageNumber: 11, name: 'Release Integration' },
        { _id: '7', stageNumber: 2, name: 'Functional Specification' }
      ]));
      const tt = new TaskTimer({
        _id: '31415973420',
        timesheetRid: '1138314594273',
        workDate: '2017-02-11',
        project: {
          _id: '86',
          status: 'active',
          name: 'Peter',
          jiraTaskId: 'MIT-123',
          sbvbTaskId: 'COMP000293'
        },
        stage: { _id: '6', stageNumber: 11, name: 'Release Integration' },
        milliseconds: 12994854
      });
      component.initialize(tt);
      component.ngOnInit();
    });

    it('returns false when first editing a new task timer', () => {
      const tt = new TaskTimer();
      component.initialize(tt);
      component.ngOnInit();
      expect(component.canSave()).toBeFalsy();
    });

    it('returns true when first editing a fully formed task timer', () => {
      expect(component.canSave()).toBeTruthy();
    });

    it('is false if there is no project entered', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('#project')).nativeElement;
      fixture.detectChanges();
      tick();
      input.value = 'spike';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.canSave()).toBeFalsy();
      input.value = 'te';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.canSave()).toBeTruthy();
    }));

    it('is false if there is no stage entred', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('#stage')).nativeElement;
      fixture.detectChanges();
      tick();
      input.value = 'spike';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.canSave()).toBeFalsy();
      input.value = 're';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.canSave()).toBeTruthy();
    }));

    it('is false if the entered time is invalid', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('#hours')).nativeElement;
      fixture.detectChanges();
      tick();
      input.value = '1:75';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.canSave()).toBeFalsy();
      input.value = '1:15';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      expect(component.canSave()).toBeTruthy();
    }));
  });

  describe('save', () => {
    beforeEach(() => {
      const projectDataService = fixture.debugElement.injector.get(ProjectService);
      spyOn(projectDataService, 'getAll').and.returnValue(Observable.of([new Project({
        _id: '42',
        status: 'active',
        name: 'Lisa',
        jiraTaskId: 'HT-349',
        sbvbTaskId: 'RFP0100495'
      })]));
      const stageDataService = fixture.debugElement.injector.get(StageService);
      spyOn(stageDataService, 'getAll').and.returnValue(Observable.of([
        new Stage({ _id: '1', stageNumber: 10, name: 'Project Management' })
      ]));
      const tt = new TaskTimer({ timesheetRid: '1138314594273', workDate: '2017-02-11' });
      component.initialize(tt);
      component.ngOnInit();
    });

    it('saves the entered data', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      let input = fixture.debugElement.query(By.css('#project')).nativeElement;
      input.value = 'lisa';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      input = fixture.debugElement.query(By.css('#stage')).nativeElement;
      input.value = 'proj';
      dispatchEvent(input, 'input');
      dispatchEvent(input, 'blur');
      input = fixture.debugElement.query(By.css('#hours')).nativeElement;
      input.value = '2:30';
      dispatchEvent(input, 'input');

      const expected = new TaskTimer({
        timesheetRid: '1138314594273',
        workDate: '2017-02-11',
        project: {
          _id: '42',
          status: 'active',
          name: 'Lisa',
          jiraTaskId: 'HT-349',
          sbvbTaskId: 'RFP0100495'
        },
        stage: { _id: '1', stageNumber: 10, name: 'Project Management' },
        milliseconds: 9000000
      });

      const dataService = fixture.debugElement.injector.get(TaskTimerService);
      spyOn(dataService, 'save').and.returnValue(Observable.empty());
      component.save();
      expect(dataService.save).toHaveBeenCalledTimes(1);
      expect(dataService.save).toHaveBeenCalledWith(expected);
    }));

    it('closes the dialog once the save completes, returning the result of the save', () => {
      const dialog = fixture.debugElement.injector.get(MdDialogRef);
      const newTaskTimer = new TaskTimer({ timesheetRid: '1129835', workDate: '2015-01-15' });
      const dataService = fixture.debugElement.injector.get(TaskTimerService);
      spyOn(dataService, 'save').and.returnValue(Observable.of(newTaskTimer));
      spyOn(dialog, 'close');
      component.save();
      expect(dialog.close).toHaveBeenCalledTimes(1);
      expect(dialog.close).toHaveBeenCalledWith(newTaskTimer);
    });
  });
});

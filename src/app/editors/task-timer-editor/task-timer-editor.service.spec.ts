import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdDialog, MdDialogModule, MdDialogConfig, MdDialogRef, MdInputModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../data/models/project';
import { TaskTimerEditorComponent } from './task-timer-editor.component';
import { TaskTimerEditorService } from './task-timer-editor.service';


describe('TaskTimerEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MdDialogModule,
        MdInputModule,
        NoopAnimationsModule,
        DialogTestModule],
      providers: [TaskTimerEditorService],
    });
  });

  let service;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ChildViewContainerComponent>;

  beforeEach(inject([TaskTimerEditorService], (s: TaskTimerEditorService) => { service = s; }));

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ChildViewContainerComponent);

    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });

  it('exists', () => { expect(service).toBeTruthy(); });

  describe('open', () => {
    let dialog;
    let dialogRef;
    let prj: Project;
    beforeEach(() => {
      dialog = viewContainerFixture.debugElement.injector.get(MdDialog);
      dialogRef = {
        componentInstance: {
          initialize: (p: Project) => { }
        },
        afterClosed: () => Observable.empty()
      };
      spyOn(dialog, 'open').and.returnValue(dialogRef);

      prj = new Project();
      prj.name = 'I am a test project';
    });

    it('opens the dialog', () => {
      service.open(prj, testViewContainerRef);
      expect(dialog.open).toHaveBeenCalledTimes(1);
    });

    it('initializes the component instance', () => {
      spyOn(dialogRef.componentInstance, 'initialize');
      service.open(prj, testViewContainerRef);
      expect(dialogRef.componentInstance.initialize).toHaveBeenCalledTimes(1);
      expect(dialogRef.componentInstance.initialize).toHaveBeenCalledWith(prj);
    });

    it('returns the after closed observable', () => {
      dialogRef.afterClosed = () => Observable.of('toast');
      let result: string;
      service.open(prj, null).subscribe(res => result = res);
      expect(result).toEqual('toast');
    });
  });
});

@Component({
  selector: 'trx-view-container',
  template: '<div></div>'
})
class ViewContainerComponent {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'trx-arbitrary-component',
  template: `<trx-view-container></trx-view-container>`,
})
class ChildViewContainerComponent {
  @ViewChild(ViewContainerComponent) childWithViewContainer: ViewContainerComponent;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
const TEST_DIRECTIVES = [
  TaskTimerEditorComponent,
  ChildViewContainerComponent,
  ViewContainerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdInputModule,
    NoopAnimationsModule
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: TEST_DIRECTIVES
})
class DialogTestModule { }

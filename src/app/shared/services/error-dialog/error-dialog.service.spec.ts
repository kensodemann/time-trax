import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MdDialog, MdDialogModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorDialogComponent } from './error-dialog.component';
import { ErrorDialogService } from './error-dialog.service';

describe('ErrorDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdDialogModule.forRoot(), DialogTestModule],
      providers: [ErrorDialogService],
    });
  });

  let service;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ChildViewContainerComponent>;

  beforeEach(inject([ErrorDialogService], (s: ErrorDialogService) => { service = s; }));

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ChildViewContainerComponent);

    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });

  it('exists', () => { expect(service).toBeTruthy(); });

  describe('open', () => {
    let dialog;
    let dialogRef;
    beforeEach(() => {
      dialog = viewContainerFixture.debugElement.injector.get(MdDialog);
      dialogRef = {
        componentInstance: {
          title: '',
          message: ''
        },
        afterClosed: () => Observable.empty()
      };
      spyOn(dialog, 'open').and.returnValue(dialogRef);
    });

    it('opens the dialog', () => {
      service.open('title', 'message', testViewContainerRef);
      expect(dialog.open).toHaveBeenCalledTimes(1);
    });

    it('sets the title', () => {
      service.open('title', 'message', testViewContainerRef);
      expect(dialogRef.componentInstance.title).toEqual('title');
    });

    it('sets the message', () => {
      service.open('title', 'message', testViewContainerRef);
      expect(dialogRef.componentInstance.message).toEqual('message');
    });

    it('returns the after closed observable', () => {
      dialogRef.afterClosed = () => Observable.of('toast');
      let result: string;
      service.open('title', 'message', null).subscribe(res => result = res);
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
  ErrorDialogComponent,
  ChildViewContainerComponent,
  ViewContainerComponent
];

@NgModule({
  imports: [MdDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: TEST_DIRECTIVES
})
class DialogTestModule { }

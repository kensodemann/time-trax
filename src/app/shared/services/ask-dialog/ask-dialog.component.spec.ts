import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdDialogModule, MdDialogRef, MdIconModule } from '@angular/material';

import { AskDialogComponent } from './ask-dialog.component';

class DialogRefStub { };

describe('AskDialogComponent', () => {
  let component: AskDialogComponent;
  let fixture: ComponentFixture<AskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AskDialogComponent],
      imports: [
        MdDialogModule,
        MdIconModule
      ],
      providers: [
        { provide: MdDialogRef, useClass: DialogRefStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

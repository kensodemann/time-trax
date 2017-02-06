import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';

import { Project } from '../../data/models/project';
import { Stage } from '../../data/models/stage';
import { TaskTimer } from '../../data/models/task-timer';
import { ProjectService } from '../../data/services/project/project.service';
import { StageService } from '../../data/services/stage/stage.service';
import { TaskTimerService } from '../../data/services/task-timer/task-timer.service';
import { HoursMinutesPipe } from '../../shared/pipes/hours-minutes.pipe';
import { MillisecondsPipe } from '../../shared/pipes/milliseconds.pipe';
import { timeFormatValidator } from '../../shared/validators/valid-time.directive';

@Component({
  selector: 'trx-task-timer-editor',
  templateUrl: './task-timer-editor.component.html',
  styleUrls: ['./task-timer-editor.component.scss']
})
export class TaskTimerEditorComponent implements OnInit {
  buttonLabel: string;
  title: string;

  editorForm: FormGroup;
  filteredProjects: Observable<Array<Project>>;
  filteredStages: Observable<Array<Stage>>;

  errors = {
    'project': '',
    'stage': '',
    'hours': ''
  };

  private projects: Array<Project> = [];
  private stages: Array<Stage> = [];
  private taskTimer: TaskTimer;

  private errorMessages = {
    'project': {
      'required': 'Project is required.'
    },
    'stage': {
      'required': 'Stage is required.'
    },
    'hours': {
      'trxValidTime': 'Valid formats are h.xx and h:mm.'
    }
  };

  constructor(private dialog: MdDialogRef<TaskTimerEditorComponent>,
    private formBuilder: FormBuilder,
    private projectData: ProjectService,
    private stageData: StageService,
    private taskTimerData: TaskTimerService,
    private hoursMinutes: HoursMinutesPipe,
    private milliseconds: MillisecondsPipe) { }

  ngOnInit() {
    this.buildForm();

    this.projectData.getAll().subscribe(res => this.projects = res);
    this.stageData.getAll().subscribe(res => this.stages = res);

    this.filteredProjects = this.editorForm.controls['project'].valueChanges
      .startWith(null)
      .map(val => this.filterProjects(val));

    this.filteredStages = this.editorForm.controls['stage'].valueChanges
      .startWith(null)
      .map(val => this.filterStages(val));
  }

  initialize(taskTimer: TaskTimer) {
    this.taskTimer = taskTimer;
    this.setTitles(taskTimer);
  }

  cancel() {
    this.dialog.close();
  }

  canSave(): boolean {
    let valid = true;
    for (const field in this.errors) {
      if (this.errors.hasOwnProperty(field)) {
        const control = this.editorForm.get(field);
        valid = valid && (!control || control.valid);
      }
    }
    return valid;
  }

  displayName(obj: any): string {
    return (obj && typeof obj === 'object' ? obj.name : obj);
  }

  lookupProject() {
    if (typeof this.editorForm.controls['project'].value === 'string') {
      const projects = this.filterProjects(this.editorForm.controls['project'].value);
      this.editorForm.controls['project'].setValue(projects[0] || '');
    }
  }

  lookupStage() {
    if (typeof this.editorForm.controls['stage'].value === 'string') {
      const stages = this.filterStages(this.editorForm.controls['stage'].value);
      this.editorForm.controls['stage'].setValue(stages[0] || '');
    }
  }

  save() {
    this.taskTimer.project = this.editorForm.controls['project'].value;
    this.taskTimer.stage = this.editorForm.controls['stage'].value;
    this.taskTimer.milliseconds = this.milliseconds.transform(this.editorForm.controls['hours'].value);
    this.taskTimerData.save(this.taskTimer).subscribe(res => this.dialog.close(res));
  }

  private buildForm() {
    this.editorForm = this.formBuilder.group({
      'project': [this.taskTimer && this.taskTimer.project, Validators.required],
      'stage': [this.taskTimer && this.taskTimer.stage, Validators.required],
      'hours': [this.taskTimer && this.hoursMinutes.transform(this.taskTimer.milliseconds), timeFormatValidator()]
    });

    this.editorForm.valueChanges
      .subscribe(data => this.validate(data));

    this.validate();
  }

  private filterProjects(val: string): Array<Project> {
    return this.projects.filter(prj => prj.status === 'active' &&
      (!val || new RegExp(val, 'gi').test(prj.name)));
  }

  private filterStages(val: string) {
    return this.stages.filter(stage => !val || new RegExp(val, 'gi').test(stage.name));
  }

  private setTitles(taskTimer: TaskTimer) {
    if (taskTimer._id) {
      this.title = 'Modify Task';
      this.buttonLabel = 'Done';
    } else {
      this.title = 'New Task';
      this.buttonLabel = 'Create';
    }
  }

  private validate(data?: any) {
    for (const field in this.errors) {
      if (this.errors.hasOwnProperty(field)) {
        const control = this.editorForm.get(field);
        this.errors[field] = '';
        if (control && control.dirty && !control.valid) {
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.errors[field] = this.errorMessages[field][key];
            }
          }
        }
      }
    }
  }
}

import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Project } from '../../data/models/project';
import { DataService } from '../../data/services/data-service.interface';
import { ProjectService } from '../../data/services/project/project.service';

@Component({
  selector: 'trx-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent {
  title: string;
  buttonLabel: string;

  name: string;
  jiraTaskId: string;
  sbvbTaskId: string;
  isActive: boolean;

  private project: Project;

  constructor(private dialog: MdDialogRef<ProjectEditorComponent>, private dataService: ProjectService) { }

  initialize(project: Project) {
    this.copyProject(project);
    this.setTitles(project);
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    this.updateProject();
    this.dataService.save(this.project).subscribe(res => this.dialog.close(res));
  }

  canSave() {
    return this.name && this.sbvbTaskId;
  }

  private copyProject(project: Project) {
    this.project = project;
    this.name = project.name;
    this.jiraTaskId = project.jiraTaskId;
    this.sbvbTaskId = project.sbvbTaskId;
    this.isActive = (project.status === 'active');
  }

  private setTitles(project: Project) {
    if (project._id) {
      this.title = 'Modify Project';
      this.buttonLabel = 'Done';
    } else {
      this.title = 'New Project';
      this.buttonLabel = 'Create';
    }
  }

  private updateProject() {
    this.project.name = this.name;
    this.project.jiraTaskId = this.jiraTaskId;
    this.project.sbvbTaskId = this.sbvbTaskId;
    this.project.status = (this.isActive ? 'active' : 'inactive');
  }

}

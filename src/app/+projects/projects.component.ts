import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Project } from '../data/models/project';
import { ProjectService } from '../data/services/project/project.service';
import { ProjectEditorService } from '../editors/project-editor/project-editor.service';
import { ErrorMessageService } from '../shared/services/error-message/error-message.service';

import * as _ from 'lodash';

@Component({
  selector: 'trx-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project>;
  projectFilter: string;
  showClosedProjects: boolean;

  constructor(private data: ProjectService, private errorMessage: ErrorMessageService,
    private projectEditor: ProjectEditorService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.data.getAll()
      .catch(res => {
        this.errorMessage.show(res, this.viewContainerRef);
        return Observable.of(res);
      })
      .subscribe(res => this.projects = res);
  }

  filteredProjects() {
    return _.filter(this.projects, (p) => {
      return ((this.showClosedProjects || p.status === 'active') && this.containsFilterText(p));
    });
  }

  editProject(project: Project) {
    this.projectEditor.open(project, this.viewContainerRef);
  }

  newProject() {
    this.projectEditor.open(new Project(), this.viewContainerRef).subscribe((res) => {
      if (res) {
        this.projects.push(res);
      }
    });
  }

  private containsFilterText(p: Project): boolean {
    let matchesTokens = true;
    const tokens = this.projectFilter ? this.projectFilter.split(' ') : [];

    tokens.forEach(token => matchesTokens = matchesTokens && p.contains(token));

    return matchesTokens;
  }
}

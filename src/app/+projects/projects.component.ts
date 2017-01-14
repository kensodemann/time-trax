import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Project } from '../data/models/project';
import { ProjectService } from '../data/services/project/project.service';
import { ProjectEditorService } from '../editor/project-editor/project-editor.service';
import { ErrorMessageService } from '../shared/error-message/error-message.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-projects',
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

    tokens.forEach(token => matchesTokens = matchesTokens && this.containsToken(p, token));

    return matchesTokens;
  }

  private containsToken(p: Project, token: string): boolean {
    const str = `${this.prepareForSearch(p.name)} ${this.prepareForSearch(p.jiraTaskId)} ${this.prepareForSearch(p.sbvbTaskId)}`;
    const t = this.prepareForSearch(token);

    return str.includes(t);
  }

  private prepareForSearch(str: string): string {
    return str ? str.toLowerCase() : '';
  }

}

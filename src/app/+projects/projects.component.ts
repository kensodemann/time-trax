import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Project } from '../data/models/project';
import { ProjectService } from '../data/services/project/project.service';
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

  constructor(private data: ProjectService, private errorMessage: ErrorMessageService, private viewContainerRef: ViewContainerRef) { }

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

  private containsFilterText(p: Project): boolean {
    let matchesTokens = true;
    let tokens = this.projectFilter ? this.projectFilter.split(' ') : [];

    tokens.forEach(token => matchesTokens = matchesTokens && this.containsToken(p, token));

    return matchesTokens;
  }

  private containsToken(p: Project, token: string): boolean {
    let str = `${this.prepareForSearch(p.name)} ${this.prepareForSearch(p.jiraTaskId)} ${this.prepareForSearch(p.sbvbTaskId)}`;
    let t = this.prepareForSearch(token);

    return str.includes(t);
  }

  private prepareForSearch(str: string): string {
    return str ? str.toLowerCase() : '';
  }

}

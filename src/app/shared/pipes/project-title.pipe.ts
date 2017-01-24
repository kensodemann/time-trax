import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../../data/models/project';

@Pipe({
  name: 'projectTitle'
})
export class ProjectTitlePipe implements PipeTransform {

  transform(project: Project): string {
    if (!project) {
      return '';
    }

    return `${project.sbvbTaskId}` + (project.jiraTaskId ? ` [${project.jiraTaskId}]` : '');
  }

}

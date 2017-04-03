/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Project } from '../../data/models/project';
import { ProjectTitlePipe } from './project-title.pipe';

describe('ProjectTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectTitlePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms to an empty string if the project is undefined', () => {
    const pipe = new ProjectTitlePipe();
    expect(pipe.transform(undefined)).toEqual('');
  });

  it('transforms to an empty string if the project is null', () => {
    const pipe = new ProjectTitlePipe();
    expect(pipe.transform(undefined)).toEqual('');
  });

  it('transforms a project with an SBVB and JIRA task', () => {
    const pipe = new ProjectTitlePipe();
    expect(pipe.transform(new Project({
      _id: '42',
      sbvbTaskId: 'COMP004954',
      jiraTaskId: 'WPM-2994',
      name: 'test project'
    }))).toEqual('COMP004954 [WPM-2994]');
  });

  it('transforms a project with just an SBVB task', () => {
    const pipe = new ProjectTitlePipe();
    expect(pipe.transform(new Project({
      _id: '42',
      sbvbTaskId: 'COMP004954',
      jiraTaskId: undefined,
      name: 'test project'
    }))).toEqual('COMP004954');
  });
});

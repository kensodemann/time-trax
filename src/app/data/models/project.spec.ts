/* tslint:disable:no-unused-variable */

import { Project } from './project';

describe('Project', () => {
  it('can be constructed', () => {
    const project = new Project();
    expect(project).toBeTruthy();
  });

  it('defaults to active', () => {
    const project = new Project();
    expect(project._id).toBeUndefined();
    expect(project.name).toBeUndefined();
    expect(project.jiraTaskId).toBeUndefined();
    expect(project.sbvbTaskId).toBeUndefined();
    expect(project.status).toEqual('active');
  });

  describe('contains', () => {
    let project;
    beforeEach(() => {
      project = new Project();
      project._id = '3999530495';
      project.name = 'Fred Flintstone';
      project.jiraTaskId = 'BR-11395';
      project.sbvbTaskId = 'PRE99859';
      project.status = 'active';
    });

    it('returns false if there is no search token', () => {
      expect(project.contains(null)).toEqual(false, 'null');
      expect(project.contains()).toEqual(false, 'undefined');
      expect(project.contains('')).toEqual(false, 'empty');
    });

    it('returns true if the name contains the token', () => {
      expect(project.contains('Fred')).toEqual(true);
    });

    it('returns true if the jiraTaskId contains the token', () => {
      expect(project.contains('113')).toEqual(true);
    });

    it('returns true if the sbvbTaskId contains the token', () => {
      expect(project.contains('998')).toEqual(true);
    });

    it('returns false if the project contains the token only in the _id or status', () => {
      expect(project.contains('39995')).toEqual(false);
      expect(project.contains('active')).toEqual(false);
    });

    it('performs the search in a case-insensative manner', () => {
      expect(project.contains('freD')).toEqual(true, 'expected name match');
      expect(project.contains('pRe')).toEqual(true, 'expected SBVB match');
      expect(project.contains('br')).toEqual(true, 'expected JIRA match');
    });
  });
});

export class Project {
  _id: string;
  name: string;
  jiraTaskId: string;
  sbvbTaskId?: string;
  status?: string;

  constructor() {
    this._id = undefined;
    this.name = '';
    this.jiraTaskId = '';
    this.sbvbTaskId = '';
    this.status = 'active';
  }
}

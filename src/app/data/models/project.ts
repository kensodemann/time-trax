export class Project {
  _id: string;
  name: string;
  jiraTaskId?: string;
  sbvbTaskId: string;
  status?: string;

  constructor(project?: any) {
    if (project) {
      this._id = project._id;
      this.name = project.name;
      this.jiraTaskId = project.jiraTaskId;
      this.sbvbTaskId = project.sbvbTaskId;
      this.status = project.status;
    } else {
      this.status = 'active';
    }
  }

  contains(token: string): boolean {
    const str = `${this.prepareForSearch(this.name)} ${this.prepareForSearch(this.jiraTaskId)} ${this.prepareForSearch(this.sbvbTaskId)}`;
    return !!(token && str.includes(this.prepareForSearch(token)));
  }

  private prepareForSearch(str: string): string {
    return str ? str.toLocaleLowerCase() : '';
  }
}

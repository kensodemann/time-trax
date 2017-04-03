export class Project {
  _id: string;
  name: string;
  jiraTaskId?: string;
  sbvbTaskId: string;
  status?: string;

  constructor(obj?: any) {
    if (obj) {
      this._id = obj._id;
      this.name = obj.name;
      this.jiraTaskId = obj.jiraTaskId;
      this.sbvbTaskId = obj.sbvbTaskId;
      this.status = obj.status;
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

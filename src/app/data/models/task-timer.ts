import * as moment from 'moment';
import { Project } from './project';
import { Stage } from './stage';

export class TaskTimer {
  _id: string;
  timesheetRid: string;
  workDate: string;
  stage: Stage;
  project: Project;
  milliseconds?: number;
  isActive?: boolean;
  startTime?: number;

  constructor(obj?: any) {
    if (obj) {
      this._id = obj._id;
      this.timesheetRid = obj.timesheetRid;
      this.milliseconds = obj.milliseconds;
      this.isActive = obj.isActive;
      this.startTime = obj.startTime;

      if (obj.workDate) {
        this.workDate = moment(obj.workDate).format('YYYY-MM-DD');
      }

      if (obj.stage) {
        this.stage = new Stage(obj.stage);
      }

      if (obj.project) {
        this.project = new Project(obj.project);
      }
    }
  }
}
